# Kopy: Your Second Brain

Welcome to Kopy, a modern, minimalist markdown note-taking application. Built with Next.js and Next-Auth, Kopy is designed to be your personal knowledge base, helping you capture, organize, and retrieve your thoughts with ease.

## ✨ Key Features

*   **Minimalist Markdown Editor**: A clean, distraction-free interface for writing in Markdown.
*   **Split View & Live Preview**: Write in Markdown on one side and see the rendered HTML preview in real-time on the other.
*   **Notebooks & Tags**: Organize your notes with notebooks for broad categories and tags for fine-grained filtering.
*   **Secure Authentication**: User sign-in with Google, powered by Next-Auth.
*   **Dashboard Homepage**: A central hub to access your notes and integrate widgets like calendars or task boards.
*   **Light & Dark Mode**: Switch between themes for your viewing comfort.
*   **Responsive Design**: Works beautifully on desktop and mobile devices.

## 🛠️ Tech Stack

Kopy is built with a modern, robust, and free-to-use tech stack:

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Authentication**: [Next-Auth](https://next-auth.js.org/) (now Auth.js)
*   **UI**: [React](https://reactjs.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
*   **Deployment**: Can be deployed to any provider that supports Next.js (e.g., Vercel, Netlify, or self-hosted).

## 📂 Project Structure

A brief overview of the key directories in this project:

```
.
├── src
│   ├── app/               # Next.js App Router pages and layouts
│   │   └── api/auth/      # Next-Auth API route for authentication
│   ├── components/        # Reusable React components (including ShadCN UI)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions and shared libraries
│   └── ...
├── .env.example           # Template for environment variables
├── next.config.ts         # Next.js configuration
├── package.json           # Project dependencies and scripts
└── tailwind.config.ts     # Tailwind CSS configuration
```

## 🚀 Getting Started: Running Locally

To run this project on your local machine, follow these steps.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v20 or later recommended)
*   [npm](https://www.npmjs.com/) (usually comes with Node.js)
*   A Google Cloud project for authentication credentials.

### 1. Installation

First, clone the repository and navigate to the project's root directory. Then, install the necessary packages:

```bash
npm install
```

### 2. Set Up Environment Variables

This project uses Next-Auth for authentication, which requires configuration via environment variables.

1.  Create a copy of the example environment file. In your terminal, run:
    ```bash
    cp .env.example .env
    ```
2.  Open the newly created `.env` file in your code editor.

3.  **Get Your Google OAuth Credentials:**
    *   Go to the [Google Cloud Console](https://console.cloud.google.com/).
    *   Create a new project or select an existing one.
    *   Navigate to **APIs & Services > Credentials**.
    *   Click **Create Credentials > OAuth client ID**.
    *   Select **Web application** as the application type.
    *   Add an "Authorized JavaScript origin": `http://localhost:3000`.
    *   Add an "Authorized redirect URI": `http://localhost:3000/api/auth/callback/google`.
    *   Click **Create**. Copy the "Client ID" and "Client Secret".
    *   Paste these values into the `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` variables in your `.env` file.

4.  **Configure Next-Auth Secret:**
    *   You need a secret string to secure your sessions. You can generate one by running the following command in your terminal:
        ```bash
        openssl rand -base64 32
        ```
    *   Copy the output and paste it as the value for `NEXTAUTH_SECRET` in your `.env` file.

5.  Your `.env` file should now look something like this:
    ```
    GOOGLE_CLIENT_ID=...
    GOOGLE_CLIENT_SECRET=...
    NEXTAUTH_SECRET=...
    NEXTAUTH_URL=http://localhost:3000
    ```

### 3. Running the Application

You can now start the Next.js development server.

```bash
npm run dev
```

The server will start, typically on `http://localhost:3000`. Open your browser and navigate to this URL to see the application running. You should now be able to sign in with your Google account.

## 📜 Available Scripts

In the `package.json` file, you will find several scripts for running and managing the application:

*   `npm run dev`: Starts the Next.js development server.
*   `npm run build`: Builds the application for production.
*   `npm run start`: Starts a production server.
*   `npm run lint`: Lints the project files using ESLint.

## 🤝 Contributing

This project was created in Firebase Studio. We encourage you to experiment, add features, and make it your own!
