import { Injectable, Inject } from '@nestjs/common';
import OpenAI, { toFile } from 'openai';

export const OPENAI_CLIENT = Symbol('OPENAI_CLIENT');

@Injectable()
export class OpenaiService {
  constructor(@Inject(OPENAI_CLIENT) private readonly openai: OpenAI) {}

  async transcribe(
    model: string,
    fileBuffer: Buffer,
    originalFileName: string,
    additionalInfo?: string,
    language?: string,
  ): Promise<string> {
    const file = await toFile(fileBuffer, originalFileName);

    const transcription = await this.openai.audio.transcriptions.create({
      file,
      model,
      prompt: additionalInfo || '',
      language: language || 'pt',
    });

    return transcription.text;
  }
}
