import { IAIProvider } from '../../../core/ai/IAIProvider';

export class FlowMindsService {
    constructor(private aiProvider: IAIProvider) { }

    async generateDiagram(prompt: string): Promise<string> {
        const rawOutput = await this.aiProvider.generateMermaid(prompt);
        return this.cleanMermaidOutput(rawOutput);
    }

    private cleanMermaidOutput(output: string): string {
        console.log('Raw Mermaid Output:', output);
        // Try to extract content inside code blocks first
        const match = output.match(/```(?:mermaid)?\s*([\s\S]*?)\s*```/);
        if (match && match[1]) {
            return match[1].trim();
        }

        // Fallback: If no code blocks, try to identify where the diagram starts
        // We look for the first occurrence of a known diagram type keyword at the start of a line OR after whitespace
        const diagramTypes = ['graph', 'flowchart', 'sequenceDiagram', 'classDiagram', 'stateDiagram', 'erDiagram', 'journey', 'gbu', 'gitGraph', 'pie', 'mindmap', 'timeline', 'zenuml', 'sankey', 'xychart', 'block', 'packet', 'kanban', 'architecture'];

        // Find line index that starts with a diagram type
        const lines = output.split('\n');
        const startLineIndex = lines.findIndex(line => {
            const trimmed = line.trim();
            // Check if strict start or maybe after some conversational text if we are desperate (though we preferstrict)
            // Let's stick to "Starts with type" but be case insensitive maybe? Mermaid is usually lowercase for types but let's be safe.
            return diagramTypes.some(type => trimmed.toLowerCase().startsWith(type.toLowerCase()));
        });

        if (startLineIndex !== -1) {
            return lines.slice(startLineIndex).join('\n').trim();
        }

        return output.trim();
    }
}
