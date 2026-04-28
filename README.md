## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

This project is a Vite + React app. GitHub Pages hosts it under `/<repo-name>/`, so the Vite `base` is auto-detected during CI using `GITHUB_REPOSITORY`.

1. Create a GitHub repo (for example: `devshell.kt-portfolio`) and push this project to the `main` branch.
2. In GitHub, go to **Settings → Pages**:
   - **Source**: `GitHub Actions`
3. Wait for the workflow **Deploy to GitHub Pages** to finish.
4. Your site will be available at:
   - For a normal repo: `https://<username>.github.io/<repo-name>/`
   - For a user/org Pages repo named `<username>.github.io`: `https://<username>.github.io/`
