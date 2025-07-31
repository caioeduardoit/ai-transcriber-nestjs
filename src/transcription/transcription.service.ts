import { Injectable } from '@nestjs/common';
import { OpenaiService } from './providers/openai/openai.service';

@Injectable()
export class TranscriptionService {
    constructor(private readonly openaiService: OpenaiService) { }

    async transcribe(
        provider: string,
        model: string,
        file: Express.Multer.File,
        additionalInfo?: string
    ): Promise<any> {
        if (!file || !file.buffer) {
            throw new Error('Arquivo inválido ou ausente.');
        }

        const fileBuffer = file.buffer;

        switch (provider.toLowerCase()) {
            case 'openai':
                const transcription = await this.openaiService.transcribe(
                    model,
                    fileBuffer,
                    file.originalname,
                    additionalInfo
                );

                return {
                    provider: 'openai',
                    model: model || 'default-model',
                    additionalInfo: additionalInfo || 'No additional info provided',
                    transcription: transcription,
                };

            default:
                throw new Error(`Provider ${provider} not supported.`);
        }
    }
}
