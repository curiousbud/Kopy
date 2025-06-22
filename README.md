
# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Running Locally

To run this project on your local machine, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### 1. Install Dependencies

Navigate to your project's root directory in your terminal and run the following command to install all the necessary packages:

```bash
npm install
```

### 2. Set Up Environment Variables

This project uses Genkit, which requires a Google AI API key to function.

1.  Create a copy of the example environment file. In your terminal, run:
    ```bash
    cp .env.example .env
    ```
2.  Open the newly created `.env` file.
3.  Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
4.  Replace `YOUR_API_KEY_HERE` with your actual key.

### 3. Run the Development Server

You can now start the Next.js development server:

```bash
npm run dev
```

The application should now be running at [http://localhost:3000](http://localhost:3000).

### 4. (Optional) Run the Genkit Developer UI

To inspect your Genkit flows, traces, and prompts, you can run the Genkit Developer UI in a separate terminal:

```bash
npm run genkit:dev
```

This will start the Genkit UI, usually at [http://localhost:4000](http://localhost:4000).
