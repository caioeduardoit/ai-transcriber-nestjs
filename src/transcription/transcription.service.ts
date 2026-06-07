import { Injectable, Inject } from '@nestjs/common';
import { OpenaiService, GROQ_SERVICE } from './providers/openai/openai.service';

export interface TranscriptionResult {
  provider: string;
  model: string;
  additionalInfo: string;
  transcription: string;
}

type ProviderKey = 'openai' | 'groq';

interface ProviderConfig {
  service: () => OpenaiService;
  defaultModel: string;
}

@Injectable()
export class TranscriptionService {
  private readonly providerConfig: Record<ProviderKey, ProviderConfig>;

  constructor(
    private readonly openaiService: OpenaiService,
    @Inject(GROQ_SERVICE) private readonly groqService: OpenaiService,
  ) {
    this.providerConfig = {
      openai: {
        service: () => this.openaiService,
        defaultModel: 'gpt-4o-transcribe',
      },
      groq: {
        service: () => this.groqService,
        defaultModel: 'whisper-large-v3',
      },
    };
  }

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

    const key = provider.toLowerCase() as ProviderKey;
    const config = this.providerConfig[key];

    if (!config) {
      throw new Error(`Provider ${provider} not supported.`);
    }

    const resolvedModel = model || config.defaultModel;
    const resolvedInfo = additionalInfo ?? '';
    const resolvedLanguage = language ?? '';

    const transcription = await config
      .service()
      .transcribe(
        resolvedModel,
        file.buffer,
        file.originalname,
        resolvedInfo,
        resolvedLanguage,
      );

    return {
      provider: key,
      model: resolvedModel,
      additionalInfo: resolvedInfo || 'No additional info provided',
      transcription,
    };
  }
}
