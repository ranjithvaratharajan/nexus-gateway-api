export interface IAIProvider {
    /**
     * Generates text based on a prompt and optional system instructions.
     * @param prompt User prompt
     * @param systemInstruction System instruction to guide the AI behavior (e.g., "You are a Mermaid generator")
     */
    generateText(prompt: string, systemInstruction?: string): Promise<string>;

    /**
     * Generates a mermaid diagram code block specifically.
     * @param prompt Description of the diagram
     */
    generateMermaid(prompt: string): Promise<string>;
}
