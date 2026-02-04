import { IAIProvider } from '../../../core/ai/IAIProvider';

export class FlowMindsService {
    constructor(private aiProvider: IAIProvider) { }

    async generateDiagram(prompt: string): Promise<string> {
        // FlowMinds specific logic could go here (e.g., history, prompt enhancement)
        return this.aiProvider.generateMermaid(prompt);
    }
}
