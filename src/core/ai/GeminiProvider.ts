import { GoogleGenerativeAI } from '@google/generative-ai';
import { IAIProvider } from './IAIProvider';

export class GeminiProvider implements IAIProvider {
    private genAI: GoogleGenerativeAI;

    constructor(apiKey: string) {
        this.genAI = new GoogleGenerativeAI(apiKey || 'DUMMY_KEY');
    }

    async generateText(prompt: string, systemInstruction?: string): Promise<string> {
        try {
            const model = this.genAI.getGenerativeModel({
                model: 'gemini-2.0-flash',
                systemInstruction: systemInstruction
            });

            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error: any) {
            console.error('Gemini generateText error:', error);
            throw new Error(error.message || 'Failed to generate text from Gemini.');
        }
    }

    async generateMermaid(prompt: string): Promise<string> {
        const systemInstruction = `You are a specialized Mermaid.js diagram generator.
    RULES:
    1. Output ONLY a valid mermaid code block wrapped in \`\`\`mermaid ... \`\`\`.
    2. NO text/explanation outside the code block.
    3. SYNTAX SAFETY:
       - Quote ALL node labels to handle special characters. Example: id["Label Text"]
       - Ensure all arrows/edges are complete. (e.g., A --> B, not A - B)
       - Do not leave trailing or incomplete connections.
    4. LAYOUT:
       - PREFER 'TD' (Top-Down) orientation for Flowcharts unless the user asks for 'LR'.
         Example: flowchart TD
       - This makes diagrams readable on vertical screens.
    5. Verify the diagram is syntactically correct before outputting.`;

        return this.generateText(prompt, systemInstruction);
    }
}
