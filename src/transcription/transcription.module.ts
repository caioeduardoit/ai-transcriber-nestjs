import { Module } from '@nestjs/common';
import OpenAI from 'openai';
import { TranscriptionController } from './transcription.controller';
import { TranscriptionService } from './transcription.service';
import {
  OpenaiService,
  OPENAI_CLIENT,
  GROQ_CLIENT,
  GROQ_SERVICE,
} from './providers/openai/openai.service';

@Module({
  controllers: [TranscriptionController],
  providers: [
    TranscriptionService,
    OpenaiService,
    {
      provide: OPENAI_CLIENT,
      useFactory: () => new OpenAI({ apiKey: process.env.OPENAI_API_KEY }),
    },
    {
      provide: GROQ_CLIENT,
      useFactory: () => {
        if (!process.env.GROQ_API_KEY) {
          throw new Error('GROQ_API_KEY não configurada. Defina a variável de ambiente antes de iniciar.');
        }
        return new OpenAI({
          apiKey: process.env.GROQ_API_KEY,
          baseURL: 'https://api.groq.com/openai/v1',
        });
      },
    },
    {
      provide: GROQ_SERVICE,
      useFactory: (client: OpenAI) => new OpenaiService(client),
      inject: [GROQ_CLIENT],
    },
  ],
})
export class TranscriptionModule {}
