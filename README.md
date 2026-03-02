# WhyNot Sports | Legal Sports Dashboard

A high-performance, real-time sports scoreboard built with Next.js 14. 100% Rights-Compliant.

## Deploy to Render.com

Deploy this project as a **Web Service** on Render.com for a seamless experience.

1.  **Create a New Web Service** on Render and connect your GitHub repository.
2.  **Build Settings:**
    *   **Runtime:** `Node`
    *   **Build Command:** `npm ci && npm run build` (This ensures a clean, reproducible install)
    *   **Start Command:** `node .next/standalone/server.js` (This command is specific to the `output: 'standalone'` configuration for optimized deployment.)
3.  **Environment Variables:** In the Render dashboard, under "Environment Variables", add:
    *   `CRICKET_API_KEY`: Your personal API key from cricketdata.org.
    *   `THE_SPORTSDB_KEY`: Set this to `1`.
4.  **Deploy:** Click "Create Web Service". Render will automatically build and deploy your application.

**Notes for Render Deployment:**
*   **Cold Starts:** The Free tier may "sleep" after inactivity, leading to ~10-30 second cold starts on first visit.
*   **Auto-Deploys:** Render automatically redeploys on pushes to your connected branch.
*   **Build Errors:** If build fails, check Render's build logs for specific issues, especially related to Node.js versions or missing dependencies. The `images.unoptimized: true` setting in `next.config.mjs` helps avoid native build dependencies.
