'use server';

import { explainGovernmentForm, type ExplainGovernmentFormInput, type ExplainGovernmentFormOutput } from '@/ai/flows/explain-government-form';
import { translateFormExplanation, type TranslateFormExplanationInput, type TranslateFormExplanationOutput } from '@/ai/flows/translate-form-explanation';
import { textToSpeech, type TextToSpeechInput, type TextToSpeechOutput } from '@/ai/flows/text-to-speech';
import { getServiceCenterInfo, type GetServiceCenterInfoInput, type GetServiceCenterInfoOutput } from '@/ai/flows/get-service-center-info';

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

export async function getServiceCenterInfoAction(input: GetServiceCenterInfoInput): Promise<GetServiceCenterInfoOutput> {
    try {
        const result = await getServiceCenterInfo(input);
        return result;
    } catch (error) {
        console.error("Error in getServiceCenterInfoAction:", error);
        throw new Error("Failed to get service center info from AI service.");
    }
}
