# Kopy: Your Second Brain

Welcome to Kopy, a modern, minimalist, and AI-powered markdown note-taking application. Built with Next.js and Firebase, Kopy is designed to be your personal knowledge base, helping you capture, organize, and retrieve your thoughts with ease.

## ✨ Key Features

*   **Minimalist Markdown Editor**: A clean, distraction-free interface for writing in Markdown.
*   **Split View & Live Preview**: Write in Markdown on one side and see the rendered HTML preview in real-time on the other.
*   **Notebooks & Tags**: Organize your notes with notebooks for broad categories and tags for fine-grained filtering.
*   **AI-Powered Features (with Genkit)**: Leverage the power of generative AI for tasks like summarizing notes, generating ideas, and more.
*   **Dashboard Homepage**: A central hub to access your notes and integrate widgets like calendars or task boards.
*   **Light & Dark Mode**: Switch between themes for your viewing comfort.
*   **Responsive Design**: Works beautifully on desktop and mobile devices.

## 🛠️ Tech Stack

Kopy is built with a modern, robust tech stack:

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **UI**: [React](https://reactjs.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
*   **AI Integration**: [Genkit (by Firebase)](https://firebase.google.com/docs/genkit)
*   **Deployment**: [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)

## 📂 Project Structure

A brief overview of the key directories in this project:

```
.
├── src
│   ├── ai/                # Genkit flows and AI-related logic
│   ├── app/               # Next.js App Router pages and layouts
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

### 1. Installation

First, clone the repository and navigate to the project's root directory. Then, install the necessary packages:

```bash
npm install
```

### 2. Set Up Environment Variables

This project uses Genkit, which requires a Google AI API key to function.

1.  Create a copy of the example environment file. In your terminal, run:
    ```bash
    cp .env.example .env
    ```
2.  Open the newly created `.env` file in your code editor.
3.  Obtain your API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
4.  In the `.env` file, replace `YOUR_API_KEY_HERE` with your actual Google AI API key.

### 3. Running the Application

You can now start the Next.js development server.

```bash
npm run dev
```

The server will start, typically on `http://localhost:3000`. Open your browser and navigate to this URL to see the application running.

### 4. (Optional) Running the Genkit Developer UI

To inspect your Genkit flows, traces, and prompts, you can run the Genkit Developer UI in a separate terminal:

```bash
npm run genkit:dev
```

This will start the Genkit UI, usually at `http://localhost:4000`.

## 📜 Available Scripts

In the `package.json` file, you will find several scripts for running and managing the application:

*   `npm run dev`: Starts the Next.js development server.
*   `npm run build`: Builds the application for production.
*   `npm run start`: Starts a production server.
*   `npm run lint`: Lints the project files using ESLint.
*   `npm run genkit:dev`: Starts the Genkit developer UI for inspecting AI flows.

## 🤝 Contributing

This project was created in Firebase Studio. We encourage you to experiment, add features, and make it your own! If you have ideas for improvements, feel free to contribute.
