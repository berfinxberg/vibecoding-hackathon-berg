# vibecoding-hackathon-berg

Personal UX portfolio site built on Academic Pages (Jekyll) with a custom theme switcher (Light/Dark/Party), a hero landing page, CV page (text + PDF preview/download) and an interactive project page for UNNIEQUE.

## Quick start (local)

### Get the code
If you are running it on a new machine, clone the repository first:

```bash
git clone https://github.com/berfinxberg/vibecoding-hackathon-berg.git
cd vibecoding-hackathon-berg
```

### Option A: Ruby + Bundler
1) Install Ruby and Bundler.
2) Install dependencies:

```bash
bundle install
```

3) Run the site:

```bash
bundle exec jekyll serve
```

4) Open in your browser:

```
http://localhost:4000
```

### Option B: Docker
1) Build and start:

```bash
docker compose up --build
```

2) Open in your browser:

```
http://localhost:4000
```

## Structure
- `_pages/` Site pages (home, about, CV, interactive)
- `_portfolio/` Project entries
- `images/` Images (teasers, profile, project visuals)
- `files/` PDFs (CV, project summary)
- `_sass/` Styles (themes, layout, interactive page)

## Notable pages
- `/` Home (hero + quick access)
- `/about/` Infos about me
- `/projects/` Projects
- `/interactive/` Interactive UNNIEQUE project page
- `/cv/` CV (text + PDF preview/download)

## Theme switching
Use the header toggle to switch between Light, Dark, and Party themes. The selection is saved in localStorage.
