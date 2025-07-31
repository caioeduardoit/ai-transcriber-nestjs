import { Module } from '@nestjs/common';
import { TranscriptionController } from './transcription.controller';
import { TranscriptionService } from './transcription.service';
import { OpenaiService } from './providers/openai/openai.service';

@Module({
  controllers: [TranscriptionController],
  providers: [TranscriptionService, OpenaiService]
})
export class TranscriptionModule {}
