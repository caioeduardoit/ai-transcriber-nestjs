import { Module } from '@nestjs/common';
import OpenAI from 'openai';
import { TranscriptionController } from './transcription.controller';
import { TranscriptionService } from './transcription.service';
import {
  OpenaiService,
  OPENAI_CLIENT,
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
  ],
})
export class TranscriptionModule {}
