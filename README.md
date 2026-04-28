<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/07e65b93-8e29-4bc9-8cb0-9e60bb86296e

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
   - `https://<username>.github.io/<repo-name>/`
