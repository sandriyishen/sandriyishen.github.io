<!--
  This file drives the hero and Resume sections of the site. Edit it freely —
  the site re-renders it automatically. Conventions:

  - `# Name`            -> your name (hero + nav + page title)
  - First plain line    -> tagline (role · location)
  - A line of [links]   -> rendered as buttons (GitHub, LinkedIn, etc.)
  - Remaining intro paragraphs -> hero summary
  - Intro bullets       -> highlight chips under the summary (one chip per bullet)
  - `## Section`        -> a resume section card (Experience, Education, ...)
  - `### Title — Org`   -> an entry; the part after the em dash is the organization
  - First plain line after a ### -> dates/location meta line
  - `- bullets`         -> highlights
  - In sections without ### entries, bullets like `**Label:** a, b, c`
    render as labeled tag chips (commas inside parentheses don't split).
  Add, remove, or reorder sections at will — everything is rendered automatically.
-->

# Svyatoslav Andriyishen

Lead Data Scientist · New York, NY

[GitHub](https://github.com/sandriyishen) · [LinkedIn](https://www.linkedin.com/in/andriyishen/) · [Email](mailto:s.andriyishen@gmail.com) · [Blog](https://sandriyishen.wixsite.com/blindspot)

Hands-on data scientist and statistical software engineer with 9+ years of experience building experimentation systems, causal-inference methods, production data infrastructure, and machine-learning solutions. I specialize in turning difficult measurement problems into reusable Python software and scalable analytical workflows, from statistical methodology through APIs, data integration, testing, and production readiness.

I enjoy tackling technically demanding problems, building the solution myself, and making it reliable enough for others to use. Open to senior technical individual-contributor opportunities in experimentation, applied statistics, and data infrastructure.

- Experimentation & causal inference
- Python APIs & statistical software
- BigQuery, Spark, GCP & AWS
- Organization-wide technical standards

## Experience

### Lead Data Scientist — Aetna, a CVS Health Company
April 2023 – Present · Remote, New York City Metropolitan Area

- Led enterprise experimentation standardization across approximately **24 teams in 4 business verticals** and nearly **200 data scientists**, migrating approximately **86% of legacy campaigns** to a SaaS measurement platform supporting nearly **500 experiments**, **500+ metrics**, and **100+ experiment properties**
- Architected, built, and owned a Python/FastAPI application extending an enterprise SaaS experimentation platform to **automate scalable cross-experiment measurement and portfolio reporting**; integrated BigQuery, platform APIs, and campaign metadata, with reusable member-level lift calculations and mixed-effects modeling to address topic-related bias
- Owned and developed an organization-wide Python campaign-evaluation package to provide **flexible, scalable statistical analysis** across campaigns with heterogeneous inputs, methodologies, and experimental designs; supported randomized controlled trials (RCTs), ratio mismatch testing (RMM), propensity score matching (PSM), synthetic controls, inverse probability weighting (IPW), difference-in-differences (DiD), and bias and outlier adjustments
- Modernized backend APIs and supporting UI with authentication, security controls, static typing, error handling, and automated testing; built containerized CI/CD workflows with GitHub Actions, GKE, uv, and pytest, and integrated SonarQube code-quality checks
- Partnered with experimentation-platform data science and engineering teams on 60+ enhancements spanning CUPED, sequential testing, cross-experiment reporting, bias controls, outlier handling, incremental-effect calculations, and UI improvements
- Developed reusable measurement infrastructure and automated reporting workflows targeting a reduction in per-campaign effort from an estimated 50 to 5 hours; projected time savings remain subject to adoption and validation
- Established organization-wide experimentation methodology and metric-governance standards through a technical Center of Excellence; restored automated metric certification using GitHub Actions, API validation, and controls for approved definitions
- Maintained reusable Python evaluation packages and enterprise analytical views, including data-quality checks and automated statistical-method selection; contributed to shared developer workflows and PromptPad guidance, modernizing Python dependency management from Pipfile to uv and integrating internal artifact repositories
- Developed an enterprise measurement architecture roadmap and quantitative capacity model covering statistical development, backend and UI engineering, infrastructure dependencies, maintenance, and support to evaluate technical investment and delivery trade-offs

### Senior Data Scientist — Aetna, a CVS Health Company
September 2021 – April 2023 · New York City Metropolitan Area

- Developed a ranking-based orchestration framework for the outreach campaign launch and management platform using Spark data pipelines and XGBoost modeling
- Refactored Hive/Pandas data pipelines and evaluation frameworks to Spark on GCP, leveraging multiprocessing and best-practice data transformations for large gains in speed and flexibility (up to 60x for one key pipeline)

### Co-founder & Data Scientist — Symphony IoT
February 2020 – May 2021 · Shenzhen, China

Hong Kong–based IoT startup building predictive-maintenance industrial sensor technology.

- Built analytical and predictive models turning vibration sensor data into machine-part fault predictions with 90–97% accuracy
- Set up low-latency, scalable serverless AWS infrastructure (Lambda, Step Functions, queue services, DynamoDB) delivering predictions in near real time
- Project-managed a team of six plus contractors, vendors, and manufacturers to deliver a prototype, advanced prototype, and marketable product within eight months
- Won Hack Asia 2020 within 36 hours by delivering maintenance-optimization analysis to Hong Kong Airport, leading to a long-term project and pilot customer
- Won the Wuzhen Roadshow (May 2020), pitching in Mandarin to a judge panel of Chinese government officials and industry leaders — one of 3 teams of 60 to win and be invited to a government-backed investment fund
- Drove hardware design, client relations, marketing, legal and financial planning, fundraising, and investor pitches, yielding three pilot customers and over $450K in funding

### Data Scientist — iPinYou
April 2018 – October 2020 · Beijing, China

Data science in the DSP and DMP departments of a programmatic advertising company, working with user behavior data for major Chinese and international brands.

- Created marketing mix models for a consumer technology brand to distribute ad spend across channels and media, yielding potential efficiency gains of up to 40%
- Segmented users for hotel, travel, automotive, and luxury clients — clustering, user journeys, and look-alike modeling — yielding 10–150% KPI improvements
- Predicted disease outbreaks for a pharmaceutical company's supply chain using ARIMA, dynamic forecasting, dynamic harmonic forecasting (Fourier terms), and neural-network time series
- Aggregated search and social data into new social-interaction KPIs to measure and forecast branding campaign effectiveness
- Delivered progress reports, results presentations, and trainings directly to clients

### Graduate Researcher — Columbia University
October 2016 – May 2017 · New York, NY

- Master's thesis, *Role of Endogamy in Relationship Satisfaction and Longevity*: original research using least-squares and logistic regression in R
- *Fake News: Trust in Media across Time & Space*: unified code from four authors into a single R notebook; visualization with ggplot2, plot.ly, and Leaflet (see Projects below)
- *Spatial Effects of Immigration on Student Performance in NYC*: spatial regression analysis of NYC Department of Education data

### Legal Assistant, Investor Protection Bureau — New York State Office of the Attorney General
August 2013 – September 2016 · New York, NY

- Leveraged statistical research and analysis to derive evidence for policy-impacting resolutions of large-scale financial-fraud cases related to the 2008 financial crisis
- Cleaned and structured raw, real-world documentation from opposing parties and clients to identify key questions, facts, and discovery requests
- Earned the Superior Service Award (2015) for an integral role in team efforts and dedication to excellence

## Skills & Interests

- **Experimentation & Statistics:** Experimental design, Causal inference, Mixed-effects models, Synthetic controls, Bias adjustment, Outlier handling, Cross-experiment analysis, Evaluation methodology, Hypothesis testing, Bayesian statistics, Regression analysis
- **Machine Learning:** XGBoost, Time-series forecasting, ARIMA & harmonic models, Neural-network forecasting, Clustering & segmentation, Look-alike modeling, Market basket analysis, Marketing mix modeling, Predictive maintenance
- **Software & Data Engineering:** Python packages, Backend APIs, API integration, FastAPI, CI/CD, GitHub Actions, GKE, Docker/containerized deployment, pytest, uv, SonarQube, Automated testing, Static type checking, Authentication, Application security, BigQuery, Spark, Hadoop, Hive, SQL, Data pipelines, Multiprocessing
- **Cloud Platforms:** GCP, AWS Lambda, AWS Step Functions, DynamoDB, Serverless architecture
- **Languages & Tools:** Python, R, Pandas, Stan, Git, Jupyter, RStudio, VS Code, Shell scripting, Excel, Web scraping
- **Visualization & GIS:** Tableau, ggplot2, Plotly, Leaflet, QGIS, GeoDa, SaTScan
- **Leadership & Delivery:** Technical architecture, Technical roadmapping, Capacity modeling, Metric governance, Model Context Protocol (MCP) planning, Team building, Project management, Stakeholder communication, Client presentations, Trainings, Fundraising & pitching
- **Spoken Languages:** English (native), Russian (professional), Mandarin Chinese (professional)
- **Interests:** Social studies, Data pipelining, Scripting

## Education

### Data Science & Advanced Machine Learning — Springboard
2021

- 600+ hours of hands-on curriculum with 1:1 industry-expert mentorship and two in-depth capstone projects

### M.A., Quantitative Methods in the Social Sciences (Applied Statistics) — Columbia University
2017 · New York, NY · GPA 3.78/4.00

- Coursework: Bayesian statistics, applied data science, data analysis, data visualization, data mining, GIS

### B.A., History, minor in Organismic and Evolutionary Biology — Harvard University
2010 · Cambridge, MA

- Citation in Chinese Language
- Japan Society, Harvard Summit for Young Leaders in China, Harvard Program for International Education

### High School Diploma — Sheepshead Bay High School
2006

- Valedictorian
- Head editor of the Bay Times school newspaper; Math Team captain

## Awards

- **Hack Asia 2020** — winner; 36-hour analysis for Hong Kong Airport that became a long-term pilot engagement
- **Wuzhen Roadshow 2020** — one of 3 winning teams of 60, pitched in Mandarin to Chinese government and industry judges
- **Superior Service Award 2015** — New York State Office of the Attorney General
- **Valedictorian** — Sheepshead Bay High School, 2006

## Certifications

- Learning Hadoop — LinkedIn Learning, Oct 2021
- Creating Interactive Tableau Dashboards — LinkedIn Learning, Feb 2021
- The Essential Elements of Predictive Analytics and Data Mining — LinkedIn Learning, Nov 2017
- Statistics Foundations: 1 — LinkedIn Learning, Oct 2017
- Statistics Foundations: 2 — LinkedIn Learning, Oct 2017
- Statistics Foundations: 3 — LinkedIn Learning, Oct 2017
- SQL Essential Training — LinkedIn Learning, Sep 2017
- Machine Learning: Decision Trees — LinkedIn Learning, Jul 2017
