# sandriyishen.github.io

Personal portfolio and resume site for Svyatoslav Andriyishen, served by GitHub Pages
at <https://sandriyishen.github.io>.

## How it works

This is a plain static site — no Jekyll, no build step (`.nojekyll` disables GitHub's
Jekyll processing). All content lives in two markdown files at the repo root, which
[js/site.js](js/site.js) fetches and renders into the page on load:

| File | Drives |
| --- | --- |
| [resume.md](resume.md) | Hero (name, tagline, links, summary) and the whole Resume section |
| [projects.md](projects.md) | The Projects card grid |

**To update the site, just edit those two files and push.** New sections, entries,
bullets, and project cards appear automatically — no HTML to touch.

## Content conventions

### resume.md

- `# Name` — your name (used in the hero, nav, and page title)
- The first plain line after the name — tagline (e.g. `Role · City, State`)
- A line containing only `[links](urls)` — rendered as buttons in the hero and footer
- Remaining intro paragraphs — hero summary
- Intro bullets — highlight chips under the hero summary (one chip per bullet)
- `## Section` — a resume section card (Experience, Education, anything)
- `### Title — Organization` — an entry inside a section (em dash or `|` separates title from org)
- The first plain line after a `###` — dates/location meta line
- `- bullets` — highlight lists
- In sections **without** `###` entries, bullets like `**Label:** a, b, c` render as
  labeled tag chips; plain bullets render as a list

### projects.md

Each `## Heading` becomes a card. Optional metadata bullets directly under the heading:

```markdown
## My Project
- image: images/thumb.png
- link: https://example.com/
- date: 2024
- tags: Python, Visualization

A short description (markdown links and **bold** work).
```

## Previewing locally

Browsers block `fetch()` from `file://` pages, so serve the folder over HTTP:

```sh
python -m http.server 8000
# then open http://localhost:8000
```

## Design

Hand-rolled CSS in [css/style.css](css/style.css): dark greens and dark blues on a
beige-to-khaki background, Fraunces for headings, Inter for body text. Printing the
page yields an ink-friendly resume-only layout.
