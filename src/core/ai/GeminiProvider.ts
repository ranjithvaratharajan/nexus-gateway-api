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
    Your ONLY output must be a valid mermaid code block. 
    Do not include any explanation or markdown formatting outside the code block if possible, 
    but if you must, ensure the code is wrapped in \`\`\`mermaid ... \`\`\`.`;

        return this.generateText(prompt, systemInstruction);
    }
}
