# Zeli Ma's personal site (English + Chinese)

- **This repo:** `ZeliMa776/website` → https://zelima776.github.io/website/ (GitHub Pages project site, no custom domain)
- **Chinese version:** lives in this repo. The homepage switches between English and Chinese in the browser (see "Homepage" below).
- `ZeliMa776/website-cn` is **no longer the source of the Chinese version**. Do not port changes to it.

For theme-level conventions (Docker dev server, prettier, file-type-specific rules) see `AGENTS.md` — referenced at the bottom of this file. This CLAUDE.md focuses on repo-specific setup, auth, and deploy.

---

## Auth (git + GitHub)

**Do NOT embed tokens in remote URLs.** Use `gh` CLI as the git credential helper:

- Install: `apt install gh` (Debian/Ubuntu) or see https://cli.github.com
- Login: `gh auth login` — pick GitHub.com / HTTPS / login with browser (device flow). Interactive; needs a browser on any device to visit https://github.com/login/device
- Wire up: `gh auth setup-git` — writes `credential.https://github.com.helper=!/usr/bin/gh auth git-credential` into global git config
- Remote URL should be clean: `https://github.com/ZeliMa776/website.git` (no `user:token@` prefix)

If `git push` fails with "Invalid username or token":

1. `gh auth status` — check whether the gh session expired
2. If expired, re-run `gh auth login`
3. **Never** paste a PAT back into the remote URL as a shortcut

Historical note (2026-07-31): the original remote had a `ghp_...` PAT embedded in the URL that had been revoked. Switched to gh helper on that date.

---

## Deploy pipeline

Deploys via GitHub Actions → GitHub Pages. Workflow: `.github/workflows/deploy.yml`.

**Trigger:** `push` to `main` OR `master` — but **only if** changed paths match the workflow's `paths:` filter (roughly: `assets/**`, `_sass/**`, `_scripts/**`, `**.bib`, `**.html`, `**.js`, `**.liquid`, `**/*.md`, `**.yml`, `Gemfile*`; excludes several docs like `README.md`, `CONTRIBUTING.md`, and some other workflow files). If a push doesn't trigger a deploy, check whether the touched paths are actually in that filter.

**Pipeline:**

1. Checkout
2. Ruby 3.3.5 + `bundler-cache`
3. Python 3.13 (for nbconvert)
4. Rewrite `giscus.repo` in `_config.yml` to `github.repository`
5. `apt install imagemagick`, `pip install --upgrade nbconvert`
6. `JEKYLL_ENV=production bundle exec jekyll build` → outputs to `_site/`
7. `purgecss -c purgecss.config.js` (drops unused CSS)
8. `JamesIves/github-pages-deploy-action@v4` **force-pushes** `_site/` to the `gh-pages` branch (this is why every fetch shows `+ ...gh-pages (forced update)` — normal, not a problem)
9. GitHub Pages serves `gh-pages` at https://zelima776.github.io/website/ (no custom domain, no `CNAME` file)

**Manual re-deploy:** trigger via `workflow_dispatch` from the Actions tab, or push a trivial change to a file matching the paths filter.

### Known-failing workflows (not blockers)

- **Render a CV** (`.github/workflows/render-cv.yml`): has been failing since 2026-04-26. The `rendercv` tool requires a stricter YAML schema than al-folio's `_data/cv.yml` (needs `phone` in specific format, plus `label`, `image`, `summary`, structured `Honors` entries). The user maintains a hand-written CV PDF in `assets/` and does not use RenderCV output, so this workflow is effectively dead code. Options: delete the workflow file, or leave it red.
- **Deploy site** is green — the actual site build is fine.

---

## Local dev

```bash
docker compose pull && docker compose up   # first run
# → http://localhost:8080/website/  (note the baseurl)
docker compose up --build                  # after dependency/Dockerfile changes
docker compose down                        # stop
```

Before committing:

```bash
npx prettier . --write
```

---

## Working in this repo

- Default branch is `main`. Default remote is `origin`.
- **`_config.yml`:** `url: https://zelima776.github.io` + `baseurl: /website`. This is a project site, so `baseurl` must stay `/website`. Always build internal links with `relative_url` (e.g. `{{ '/assets/pdf/Zeli_Ma_CV.pdf' | relative_url }}`) so the `/website` prefix is added.
- **`_data/cv.yml`** feeds the al-folio CV page. The homepage does not use it.
- **CV PDF:** the homepage "View CV" button and the footer "CV / PDF" link point to `assets/pdf/Zeli_Ma_CV.pdf`.
- Note: `Research: - company:` etc. is a display quirk — the `company` field is the top-line label for a research/experience entry, not literally an employer, so it's OK for it to hold a project name.
- Do **not** commit anything under `_site/` (gitignored build output) or `.jekyll-cache/`.
- Binary CV PDFs live in `assets/` and are committed intentionally.

## Homepage

- The homepage (`_pages/about.md` → layout `_layouts/home.liquid`) is custom. All of its content is in `_includes/homepage.liquid`, styled by `assets/css/home.css` and driven by `assets/js/home.js`. It does not use al-folio's about/news/selected-papers includes.
- **Bilingual:** every translatable element carries `data-en="…"` and `data-zh="…"`, and its inner text repeats the English copy (shown without JS). The "中 / EN" buttons in `home.js` replace each element's `textContent` with `data-en` or `data-zh`. The choice is saved in `localStorage`. `aria-label`s use `data-aria-en` / `data-aria-zh`.
- When you edit homepage copy, update the inner text, `data-en`, **and** `data-zh` together. `textContent` replacement drops child markup, so put `data-*` on leaf elements (e.g. one `<span>` per line around a `<br>`), not on a parent that contains tags.
- Dark mode follows the OS (`prefers-color-scheme` in `home.css`). al-folio's theme toggle script is not loaded on the homepage.

## Commit style

Short imperative summary, one line, no period. Body optional. Example:

```
Add WearWise live site link
Update CV research entry and pin prettier versions
```

No conventional-commits prefix. No emoji.

---

@AGENTS.md
