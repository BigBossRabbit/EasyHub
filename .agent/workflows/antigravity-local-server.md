# Antigravity Workflow: Deploy Local Server

This workflow allows you to quickly spin up a local development server for the EasyHub project to preview changes in real-time.

## Prerequisites
- Node.js and npm installed.
- Dependencies installed (`npm install`).

## Steps

1.  **Start the Server**
    Run the following command in your terminal:
    ```bash
    npm run dev
    ```

2.  **Access the Site**
    Once the server starts, you will see a URL in the terminal, typically:
    -   [http://localhost:5173](http://localhost:5173)

3.  **Stopping the Server**
    To stop the server, press `Ctrl + C` in the terminal where it is running.

## Notes
-   The server supports Hot Module Replacement (HMR), so changes to code will reflect instantly without a manual refresh.
-   If you need to view the site on a mobile device on the same network, use the `--host` flag: `npm run dev -- --host`.
