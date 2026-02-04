import { Request, Response } from 'express';
import { FlowMindsService } from '../services/flowminds.service';
import { generateSchema } from '../schemas/prompt.schema';

export class FlowMindsController {
    constructor(private service: FlowMindsService) { }

    generate = async (req: Request, res: Response) => {
        try {
            const { prompt } = generateSchema.parse(req.body);

            const mermaidCode = await this.service.generateDiagram(prompt);

            res.json({
                success: true,
                data: { mermaid: mermaidCode }
            });
        } catch (error: any) {
            if (error.name === 'ZodError') {
                res.status(400).json({ success: false, error: error.errors });
            } else {
                console.error('FlowMinds generation error:', error);
                res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
            }
        }
    };
}
