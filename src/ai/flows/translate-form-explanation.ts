'use server';

/**
 * @fileOverview This file defines a Genkit flow for translating form explanations into different languages.
 *
 * It includes:
 * - translateFormExplanation: A function to translate the explanation of a government form.
 * - TranslateFormExplanationInput: The input type for the translateFormExplanation function.
 * - TranslateFormExplanationOutput: The output type for the translateFormExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateFormExplanationInputSchema = z.object({
  explanation: z.string().describe('The explanation of the government form to be translated.'),
  language: z.enum(['English', 'Hindi', 'Bengali', 'Marathi', 'Gujarati', 'Tamil']).describe('The target language for the translation.'),
});
export type TranslateFormExplanationInput = z.infer<typeof TranslateFormExplanationInputSchema>;

const TranslateFormExplanationOutputSchema = z.object({
  translatedExplanation: z.string().describe('The translated explanation of the government form.'),
});
export type TranslateFormExplanationOutput = z.infer<typeof TranslateFormExplanationOutputSchema>;

export async function translateFormExplanation(input: TranslateFormExplanationInput): Promise<TranslateFormExplanationOutput> {
  return translateFormExplanationFlow(input);
}

const translateFormExplanationPrompt = ai.definePrompt({
  name: 'translateFormExplanationPrompt',
  input: {schema: TranslateFormExplanationInputSchema},
  output: {schema: TranslateFormExplanationOutputSchema},
  prompt: `Translate the following explanation of a government form into {{{language}}}:\n\n{{{explanation}}}`,
});

const translateFormExplanationFlow = ai.defineFlow(
  {
    name: 'translateFormExplanationFlow',
    inputSchema: TranslateFormExplanationInputSchema,
    outputSchema: TranslateFormExplanationOutputSchema,
  },
  async input => {
    const {output} = await translateFormExplanationPrompt(input);
    return output!;
  }
);
