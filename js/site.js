/* Reads resume.md and projects.md from the repo root and renders them into
   the page. Edit those two files to update the site — no HTML changes needed. */
(function () {
  'use strict';

  /* ---------- markdown helpers ------------------------------------------ */

  function escapeHtml(s) {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Inline markdown: `code`, [links](url), **bold**, *italic*
  function inline(s) {
    var out = escapeHtml(s.trim());
    out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
    out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (m, text, url) {
      var external = /^(https?:)?\/\//.test(url);
      return '<a href="' + url + '"' +
        (external ? ' target="_blank" rel="noopener"' : '') + '>' + text + '</a>';
    });
    out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    return out;
  }

  function plainText(s) {
    return s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`]/g, '').trim();
  }

  // True if a line is nothing but [links](urls) and separators (· | / ,)
  function isLinkLine(line) {
    if (!/\[[^\]]+\]\([^)]+\)/.test(line)) return false;
    return line.replace(/\[[^\]]+\]\([^)]+\)/g, '').replace(/[·•|,\/\s]/g, '') === '';
  }

  // Split a comma-separated list into chips; commas inside parentheses don't split,
  // so "AWS (Lambda, Step Functions)" stays one chip.
  function splitChips(s) {
    var parts = [], depth = 0, cur = '';
    for (var i = 0; i < s.length; i++) {
      var ch = s[i];
      if (ch === '(') depth++;
      else if (ch === ')') depth = Math.max(0, depth - 1);
      if (ch === ',' && depth === 0) { parts.push(cur.trim()); cur = ''; }
      else cur += ch;
    }
    if (cur.trim()) parts.push(cur.trim());
    return parts.filter(Boolean);
  }

  /* ---------- tokenizer --------------------------------------------------
     Turns markdown into a flat token list:
     { t: 'h1' | 'h2' | 'h3' | 'li' | 'p', text }
     HTML comments are stripped; consecutive plain lines merge into one 'p'. */

  function tokenize(md) {
    var lines = md.replace(/<!--[\s\S]*?-->/g, '').split(/\r?\n/);
    var tokens = [];
    var para = [];

    function flush() {
      if (para.length) {
        tokens.push({ t: 'p', text: para.join(' ') });
        para = [];
      }
    }

    lines.forEach(function (raw) {
      var line = raw.trim();
      if (!line) { flush(); return; }
      var m;
      if ((m = line.match(/^###\s+(.*)/))) { flush(); tokens.push({ t: 'h3', text: m[1] }); }
      else if ((m = line.match(/^##\s+(.*)/))) { flush(); tokens.push({ t: 'h2', text: m[1] }); }
      else if ((m = line.match(/^#\s+(.*)/))) { flush(); tokens.push({ t: 'h1', text: m[1] }); }
      else if ((m = line.match(/^[-*]\s+(.*)/))) { flush(); tokens.push({ t: 'li', text: m[1] }); }
      else { para.push(line); }
    });
    flush();
    return tokens;
  }

  /* ---------- resume ----------------------------------------------------- */

  function renderResume(md) {
    var tokens = tokenize(md);

    // Intro: everything before the first '##' feeds the hero.
    var i = 0;
    var name = '', tagline = '', linkLines = [], summary = [], stats = [];
    for (; i < tokens.length && tokens[i].t !== 'h2'; i++) {
      var tk = tokens[i];
      if (tk.t === 'h1') name = tk.text;
      else if (tk.t === 'li') stats.push(tk.text);
      else if (tk.t === 'p') {
        if (isLinkLine(tk.text)) linkLines.push(tk.text);
        else if (!tagline) tagline = tk.text;
        else summary.push(tk.text);
      }
    }

    renderHero(name, tagline, linkLines, summary, stats);

    // Sections: streamed into nested HTML.
    var out = '';
    var inSection = false, inEntry = false, inList = false, awaitMeta = false;
    var looseListClass = '';

    function closeList() { if (inList) { out += '</ul>'; inList = false; } }
    function closeEntry() { closeList(); if (inEntry) { out += '</article>'; inEntry = false; } }
    function closeSection() { closeEntry(); closeList(); if (inSection) { out += '</section>'; inSection = false; } }

    for (; i < tokens.length; i++) {
      var t = tokens[i];

      if (t.t === 'h2') {
        closeSection();
        out += '<section class="resume-block reveal"><h3 class="resume-block-title">' +
          inline(t.text) + '</h3>';
        inSection = true;

      } else if (t.t === 'h3') {
        closeEntry();
        var parts = t.text.split(/\s+—\s+|\s+\|\s+/);
        var title = parts[0];
        var org = parts.slice(1).join(' — ');
        out += '<article class="entry"><h4>' + inline(title) +
          (org ? ' <span class="org">· ' + inline(org) + '</span>' : '') + '</h4>';
        inEntry = true;
        awaitMeta = true;

      } else if (t.t === 'li') {
        if (!inList) {
          if (inEntry) {
            out += '<ul>';
          } else {
            // Loose bullets: '**Label:** a, b, c' becomes a chip row.
            var row = chipRow(t.text);
            if (row) { out += row; continue; }
            out += '<ul class="loose-list">';
          }
          inList = true;
        } else if (!inEntry) {
          var row2 = chipRow(t.text);
          if (row2) { closeList(); out += row2; continue; }
        }
        out += '<li>' + inline(t.text) + '</li>';
        awaitMeta = false;

      } else if (t.t === 'p') {
        closeList();
        if (inEntry && awaitMeta) {
          out += '<p class="meta">' + inline(t.text) + '</p>';
          awaitMeta = false;
        } else {
          out += '<p>' + inline(t.text) + '</p>';
        }
      }
    }
    closeSection();

    var target = document.getElementById('resume-content');
    if (target) target.innerHTML = out || '<p class="empty">Nothing here yet — add sections to <code>resume.md</code>.</p>';
  }

  // '**Label:** a, b, c' -> labeled chip row; anything else -> null
  function chipRow(text) {
    var m = text.match(/^\*\*([^*]+?):?\*\*:?\s*(.+)$/);
    if (!m) return null;
    var chips = splitChips(m[2]).map(function (c) {
      return '<span class="chip">' + inline(c) + '</span>';
    }).join('');
    return '<div class="skill-row"><span class="skill-label">' + inline(m[1]) +
      '</span><span class="chips">' + chips + '</span></div>';
  }

  function renderHero(name, tagline, linkLines, summary, stats) {
    var hero = document.getElementById('hero-content');
    if (!hero) return;

    var h = '';
    if (name) h += '<h1>' + inline(name) + '</h1>';
    if (tagline) h += '<p class="tagline">' + inline(tagline) + '</p>';
    summary.forEach(function (p) { h += '<p class="summary">' + inline(p) + '</p>'; });

    // Intro bullets become highlight chips under the summary (one chip per bullet)
    if (stats && stats.length) {
      h += '<div class="hero-tags">';
      stats.forEach(function (s) {
        h += '<span class="chip">' + inline(s) + '</span>';
      });
      h += '</div>';
    }

    var links = [];
    linkLines.forEach(function (line) {
      line.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (m, text, url) {
        links.push({ text: text, url: url });
        return m;
      });
    });

    if (links.length) {
      h += '<div class="hero-links">';
      links.forEach(function (l) {
        var external = /^(https?:)?\/\//.test(l.url);
        h += '<a class="btn" href="' + escapeHtml(l.url) + '"' +
          (external ? ' target="_blank" rel="noopener"' : '') + '>' +
          escapeHtml(l.text) + '</a>';
      });
      h += '</div>';
    }
    hero.innerHTML = h;

    // Footer link row mirrors the hero links.
    var footerLinks = document.getElementById('footer-links');
    if (footerLinks && links.length) {
      footerLinks.innerHTML = links.map(function (l) {
        var external = /^(https?:)?\/\//.test(l.url);
        return '<a href="' + escapeHtml(l.url) + '"' +
          (external ? ' target="_blank" rel="noopener"' : '') + '>' +
          escapeHtml(l.text) + '</a>';
      }).join('');
    }

    if (name) {
      var cleanName = plainText(name);
      document.querySelectorAll('[data-site-name]').forEach(function (el) {
        el.textContent = cleanName;
      });
      var role = tagline ? plainText(tagline).split('·')[0].trim() : '';
      document.title = cleanName + (role ? ' · ' + role : '');
    }
  }

  /* ---------- projects ---------------------------------------------------- */

  var META_KEYS = /^(image|link|date|tags)\s*:\s*(.*)$/i;

  function renderProjects(md) {
    var tokens = tokenize(md);
    var projects = [];
    var cur = null;

    tokens.forEach(function (tk) {
      if (tk.t === 'h2') {
        cur = { title: tk.text, meta: {}, paras: [] };
        projects.push(cur);
      } else if (!cur) {
        return; // ignore the intro / h1
      } else if (tk.t === 'li') {
        var m = tk.text.match(META_KEYS);
        if (m) cur.meta[m[1].toLowerCase()] = m[2].trim();
        else cur.paras.push(tk.text);
      } else if (tk.t === 'p') {
        cur.paras.push(tk.text);
      }
    });

    var grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = projects.map(function (p, idx) {
      var inner = '';
      if (p.meta.image) {
        inner += '<div class="card-img" style="background-image:url(\'' +
          escapeHtml(p.meta.image) + '\')"></div>';
      } else {
        // No image: gradient monogram from the first two words of the title.
        var initials = plainText(p.title).split(/\s+/).slice(0, 2).map(function (w) {
          return (w[0] || '').toUpperCase();
        }).join('');
        inner += '<div class="card-img card-img-fallback' +
          (idx % 2 ? ' alt' : '') + '">' + escapeHtml(initials) + '</div>';
      }
      inner += '<div class="card-body">';
      if (p.meta.date) inner += '<p class="card-date">' + escapeHtml(p.meta.date) + '</p>';
      inner += '<h3>' + inline(p.title) + '</h3>';
      p.paras.forEach(function (t) { inner += '<p class="card-desc">' + inline(t) + '</p>'; });
      if (p.meta.tags) {
        inner += '<div class="card-tags">' + splitChips(p.meta.tags).map(function (t) {
          return '<span class="chip">' + escapeHtml(t) + '</span>';
        }).join('') + '</div>';
      }
      if (p.meta.link) inner += '<span class="card-cta">View project →</span>';
      inner += '</div>';

      return p.meta.link
        ? '<a class="card reveal" href="' + escapeHtml(p.meta.link) +
          '" target="_blank" rel="noopener">' + inner + '</a>'
        : '<div class="card reveal">' + inner + '</div>';
    }).join('') || '<p class="empty">No projects yet — add one to <code>projects.md</code>.</p>';

    var count = document.getElementById('project-count');
    if (count && projects.length) count.textContent = '(' + projects.length + ')';
  }

  /* ---------- loading ----------------------------------------------------- */

  function load(url) {
    return fetch(url, { cache: 'no-cache' }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.text();
    });
  }

  function showError(id, file, err) {
    var el = document.getElementById(id);
    if (!el) return;
    var hint = location.protocol === 'file:'
      ? ' Browsers block local file reads — serve the folder over HTTP, e.g. <code>python -m http.server</code>.'
      : '';
    el.innerHTML = '<p class="load-error">Could not load <code>' + file + '</code> (' +
      escapeHtml(String(err && err.message || err)) + ').' + hint + '</p>';
  }

  function initReveal() {
    var els = document.querySelectorAll('.reveal:not(.in)');
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!('IntersectionObserver' in window) || reduced) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());

    Promise.allSettled([
      load('resume.md').then(renderResume).catch(function (e) { showError('resume-content', 'resume.md', e); }),
      load('projects.md').then(renderProjects).catch(function (e) { showError('projects-grid', 'projects.md', e); })
    ]).then(initReveal);
  });
})();
