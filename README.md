# Laurits Kromann Larsen — CV website

Personal CV / portfolio site. Static, no build step. Plain HTML + CSS + a small `main.js`.

- Danish (primary): `/index.html`
- English: `/en/index.html`
- Styles: `assets/css/styles.css`
- Script: `assets/js/main.js`

## Run locally

Just open `index.html` in your browser. (For the language toggle and `/en/` link to
work cleanly, prefer serving via a small local server.)

```bash
# from the project root
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Adding the media files

The site references the photos and the PID/telescope video that you attached in chat.
Place them in `assets/img/` and `assets/video/` with these exact filenames:

| File | What it is |
| --- | --- |
| `assets/img/profile.jpg` | Headshot for the hero (square ~600×600 recommended). |
| `assets/img/telescope.jpg` | Robot-telescope photo. |
| `assets/img/uf-stage.jpg` | Photo from the Unge Forskere prize ceremony. |
| `assets/img/forskerspirer.jpg` | Photo receiving the Forskerspirer prize. |
| `assets/img/uf-booth.jpg` | Photo at the Unge Forskere stand/booth. |
| `assets/img/talk-pulpit.jpg` | Photo of you giving a talk. |
| `assets/img/talk-slides.jpg` | Photo of the slides during the loss-landscape talk. |
| `assets/video/pid-telescope.mp4` | Video of the PID ball-on-plate / telescope. |

If a file is missing, the site will automatically fall back to a neutral placeholder,
so it always renders.

## Deploy on GitHub Pages

1. Create a repository on GitHub (e.g. `cv-hjemmeside`).
2. Commit and push everything in this folder to the `main` branch.
3. In the repo on GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `/ (root)`**.
4. Wait ~1 minute. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

The `.nojekyll` file in the root prevents GitHub from running Jekyll, which keeps
folders like `/en/` and `/assets/` working as-is.

### Custom domain (later)

When you buy a domain:

1. Create a file called `CNAME` in the root of the repo containing only your domain
   (e.g. `lauritskromann.dk`).
2. At your domain registrar, add a CNAME record for `www` pointing to
   `<your-username>.github.io`, and `A` records for the apex domain pointing to
   GitHub's IPs (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153).
3. In **Settings → Pages**, set the custom domain and enable "Enforce HTTPS".

## Editing tips

- All copy lives directly in the two HTML files.
- Colours, fonts and spacing are CSS variables at the top of `assets/css/styles.css`.
- Add a new highlight by copying one of the `<article class="highlight-card">` blocks.
- Add a new project by copying one of the `<article class="project-card">` blocks.
- Keep the Danish and English files in sync when you add content.
