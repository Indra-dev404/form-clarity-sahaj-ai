'use server';

/**
 * @fileOverview An AI agent to explain government forms in simple language.
 *
 * - explainGovernmentForm - A function that handles the explanation process.
 * - ExplainGovernmentFormInput - The input type for the explainGovernmentForm function.
 * - ExplainGovernmentFormOutput - The return type for the explainGovernmentForm function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainGovernmentFormInputSchema = z.object({
  documentDataUri: z
    .string()
    .describe(
      'The government form document as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' + 
      ' It can be a PDF, JPG, or PNG.'
    ),
  language: z.enum(['English', 'Hindi', 'Bengali', 'Marathi', 'Gujrati', 'Tamil']).default('English').describe('The language to explain the form in.'),
});
export type ExplainGovernmentFormInput = z.infer<typeof ExplainGovernmentFormInputSchema>;

const ExplainGovernmentFormOutputSchema = z.object({
  explanation: z.string().describe('A simplified explanation of the government form.'),
});
export type ExplainGovernmentFormOutput = z.infer<typeof ExplainGovernmentFormOutputSchema>;

export async function explainGovernmentForm(input: ExplainGovernmentFormInput): Promise<ExplainGovernmentFormOutput> {
  return explainGovernmentFormFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainGovernmentFormPrompt',
  input: {schema: ExplainGovernmentFormInputSchema},
  output: {schema: ExplainGovernmentFormOutputSchema},
  prompt: `You are an expert in simplifying complex government forms into plain language. You will extract key information and provide clear explanations of the form's purpose and requirements in the specified language.

Language: {{{language}}}

Form: {{media url=documentDataUri}}`,
});

const explainGovernmentFormFlow = ai.defineFlow(
  {
    name: 'explainGovernmentFormFlow',
    inputSchema: ExplainGovernmentFormInputSchema,
    outputSchema: ExplainGovernmentFormOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
