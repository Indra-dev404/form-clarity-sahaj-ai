'use server';

/**
 * @fileOverview An AI agent to determine a Google Maps search query for relevant government service centers.
 *
 * - getServiceCenterInfo - A function that handles the query generation process.
 * - GetServiceCenterInfoInput - The input type for the getServiceCenterInfo function.
 * - GetServiceCenterInfoOutput - The return type for the getServiceCenterInfo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetServiceCenterInfoInputSchema = z.object({
  explanation: z.string().describe('The explanation of the government form.'),
});
export type GetServiceCenterInfoInput = z.infer<typeof GetServiceCenterInfoInputSchema>;

const GetServiceCenterInfoOutputSchema = z.object({
  searchQuery: z.string().describe('A concise Google Maps search query for finding nearby relevant service centers. e.g., "Aadhar Kendra", "Passport Seva Kendra", "RTO Office".'),
});
export type GetServiceCenterInfoOutput = z.infer<typeof GetServiceCenterInfoOutputSchema>;

export async function getServiceCenterInfo(input: GetServiceCenterInfoInput): Promise<GetServiceCenterInfoOutput> {
  return getServiceCenterInfoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getServiceCenterInfoPrompt',
  input: {schema: GetServiceCenterInfoInputSchema},
  output: {schema: GetServiceCenterInfoOutputSchema},
  prompt: `Based on the following explanation of a government form, determine the most relevant type of service center and create a concise search query for Google Maps to find nearby locations.

For example:
- If the form is about an Aadhar card, the query should be "Aadhar Kendra".
- If it's about a passport, the query should be "Passport Seva Kendra".
- If it's about a driver's license, the query should be "RTO Office".

Return only the search query.

Explanation:
{{{explanation}}}`,
});

const getServiceCenterInfoFlow = ai.defineFlow(
  {
    name: 'getServiceCenterInfoFlow',
    inputSchema: GetServiceCenterInfoInputSchema,
    outputSchema: GetServiceCenterInfoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
