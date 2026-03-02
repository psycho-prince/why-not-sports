## Deploy to Render.com

Deploy this project as a **Web Service** on Render.com for a seamless experience.

1.  **Create Web Service:**
    *   Go to your Render dashboard and click "+ New" → "Web Service".
    *   Connect your GitHub repository containing this project.
    *   Select your desired branch (e.g., `main`).
2.  **Build and Deploy Settings:**
    *   **Runtime:** `Node`
    *   **Build Command:** `npm ci && npm run build` (Using `npm ci` for a clean, reproducible install)
    *   **Start Command:** `node .next/standalone/server.js` (This command is specific to the `output: 'standalone'` configuration for optimized deployment.)
    *   **Instance Type:** Start with the Free tier for testing, upgrade to Starter or higher for production.
3.  **Environment Variables:** In the Render dashboard, under "Environment Variables", add:
    *   `CRICKET_API_KEY`: Your personal API key from cricketdata.org.
    *   `THE_SPORTSDB_KEY`: Set this to `1`.
4.  **Deploy:** Click "Create Web Service". Render will automatically build and deploy your application.

**Notes for Render Deployment:**
*   **Cold Starts:** The Free tier may "sleep" after inactivity, leading to ~10-30 second cold starts on first visit.
*   **Auto-Deploys:** Render automatically redeploys on pushes to your connected branch.
*   **Build Errors:** If build fails, check Render's build logs for specific issues, especially related to Node.js versions or missing dependencies. The `images.unoptimized: true` setting in `next.config.mjs` helps avoid native build dependencies.
