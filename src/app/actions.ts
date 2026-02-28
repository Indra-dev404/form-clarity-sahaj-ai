'use server';

import { explainGovernmentForm, type ExplainGovernmentFormInput, type ExplainGovernmentFormOutput } from '@/ai/flows/explain-government-form';
import { translateFormExplanation, type TranslateFormExplanationInput, type TranslateFormExplanationOutput } from '@/ai/flows/translate-form-explanation';
import { textToSpeech, type TextToSpeechInput, type TextToSpeechOutput } from '@/ai/flows/text-to-speech';

/**
 * Mock login action for JWT-based auth.
 * In a real app, this would verify credentials against a database.
 */
export async function loginAction(password: string) {
    if (password === 'admin123') {
        // Generate a mock JWT-like token (Base64 encoded parts)
        const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
        const payload = Buffer.from(JSON.stringify({ sub: 'user_123', role: 'admin', iat: Math.floor(Date.now() / 1000) })).toString('base64');
        const signature = 'mock_signature';
        return { token: `${header}.${payload}.${signature}` };
    }
    throw new Error('Invalid credentials. Use admin123');
}

export async function getExplanationAction(input: ExplainGovernmentFormInput): Promise<ExplainGovernmentFormOutput> {
    try {
        const result = await explainGovernmentForm(input);
        return result;
    } catch (error) {
        console.error("Error in getExplanationAction:", error);
        throw new Error("Failed to get explanation from AI service.");
    }
}

export async function translateExplanationAction(input: TranslateFormExplanationInput): Promise<TranslateFormExplanationOutput> {
    try {
        const result = await translateFormExplanation(input);
        return result;
    } catch (error) {
        console.error("Error in translateExplanationAction:", error);
        throw new Error("Failed to translate explanation from AI service.");
    }
}

export async function textToSpeechAction(input: TextToSpeechInput): Promise<TextToSpeechOutput> {
    try {
        const result = await textToSpeech(input);
        return result;
    } catch (error) {
        console.error("Error in textToSpeechAction:", error);
        throw new Error("Failed to generate audio from AI service.");
    }
}
