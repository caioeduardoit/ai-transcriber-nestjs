import { Injectable, Inject } from '@nestjs/common';
import { OpenaiService, GROQ_SERVICE } from './providers/openai/openai.service';

export interface TranscriptionResult {
  provider: string;
  model: string;
  additionalInfo: string;
  transcription: string;
}

@Injectable()
export class TranscriptionService {
  constructor(
    private readonly openaiService: OpenaiService,
    @Inject(GROQ_SERVICE) private readonly groqService: OpenaiService,
  ) {}

  async transcribe(
    provider: string,
    model: string,
    file: Express.Multer.File,
    additionalInfo?: string,
    language?: string,
  ): Promise<TranscriptionResult> {
    if (!file || !file.buffer) {
      throw new Error('Arquivo inválido ou ausente.');
    }

    const fileBuffer = file.buffer;

    switch (provider.toLowerCase()) {
      case 'openai': {
        const resolvedModel = model || 'gpt-4o-transcribe';
        const resolvedInfo = additionalInfo ?? '';
        const resolvedLanguage = language ?? '';
        const transcription = await this.openaiService.transcribe(
          resolvedModel,
          fileBuffer,
          file.originalname,
          resolvedInfo,
          resolvedLanguage,
        );
        return {
          provider: 'openai',
          model: resolvedModel,
          additionalInfo: additionalInfo || 'No additional info provided',
          transcription,
        };
      }

      case 'groq': {
        const resolvedModel = model || 'whisper-large-v3';
        const resolvedInfo = additionalInfo ?? '';
        const resolvedLanguage = language ?? '';
        const transcription = await this.groqService.transcribe(
          resolvedModel,
          fileBuffer,
          file.originalname,
          resolvedInfo,
          resolvedLanguage,
        );
        return {
          provider: 'groq',
          model: resolvedModel,
          additionalInfo: additionalInfo || 'No additional info provided',
          transcription,
        };
      }

      default:
        throw new Error(`Provider ${provider} not supported.`);
    }
  }
}
