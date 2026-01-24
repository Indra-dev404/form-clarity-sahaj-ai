# Sahaj AI

Sahaj AI is an intelligent application designed to demystify complex government forms. Users can upload a document (PDF, JPG, or PNG), and the application uses a powerful AI agent to provide a simplified explanation, a step-by-step submission checklist, and multi-language support.

## Features

*   **Document Analysis**: Upload government forms in PDF, JPG, or PNG format.
*   **Simplified Explanations**: Get clear, easy-to-understand explanations of the form's purpose and requirements.
*   **Actionable Checklists**: Receive a generated checklist to ensure you complete all necessary steps for submission.
*   **Multi-Language Support**: The app supports explanations and translations in multiple languages:
    *   English
    *   Hindi
    *   Bengali
    *   Marathi
    *   Gujarati
    *   Tamil
*   **Voice Narration**: Listen to the explanation in your selected language with high-quality, AI-powered text-to-speech.

## Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
*   **UI**: [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
*   **Generative AI**: [Firebase Genkit](https://firebase.google.com/docs/genkit) with Google Gemini models.
*   **Deployment**: [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (v18 or later recommended) and a package manager like [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) installed.

### Installation

1.  Clone the repository to your local machine.

2.  Navigate to the project directory and install the dependencies:
    ```bash
    npm install
    ```

### Environment Variables

The application uses AI services that require an API key. Create a `.env` file in the root of the project and add your Google AI API key:

```.env
GEMINI_API_KEY=your_google_ai_api_key_here
```

You can obtain a key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Running the Application

1.  To start the Genkit developer UI (optional, but recommended for debugging AI flows), run:
    ```bash
    npm run genkit:watch
    ```
    This will start a local server, typically on port 4000, where you can inspect and test your AI flows.

2.  In a separate terminal, start the Next.js development server:
    ```bash
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) in your browser to see the application.

## AI Flows

This project leverages Genkit to orchestrate several AI-powered flows located in `src/ai/flows/`:

*   **`explainGovernmentForm`**: Takes a document (as a data URI) and a language, then returns a simplified explanation and a submission checklist.
*   **`translateFormExplanation`**: Translates the generated explanation and checklist into a different target language.
*   **`textToSpeech`**: Converts the explanation text into natural-sounding audio in the selected language using a TTS model.
