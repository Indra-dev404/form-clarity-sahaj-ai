'use server';

import { explainGovernmentForm, type ExplainGovernmentFormInput, type ExplainGovernmentFormOutput } from '@/ai/flows/explain-government-form';
import { translateFormExplanation, type TranslateFormExplanationInput, type TranslateFormExplanationOutput } from '@/ai/flows/translate-form-explanation';

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
