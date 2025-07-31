import { Injectable } from '@nestjs/common';
import { createReadStream, writeFileSync, unlinkSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import OpenAI from 'openai';
import { randomUUID } from 'crypto';

@Injectable()
export class OpenaiService {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async transcribe(
        model: string,
        fileBuffer: Buffer,
        originalFileName: string,
        additionalInfo?: string,
    ): Promise<string> {
        // Gera um caminho temporário
        const tempFilePath = join(tmpdir(), `${randomUUID()}-${originalFileName}`);

        // Escreve o buffer em disco
        writeFileSync(tempFilePath, fileBuffer);

        try {
            const transcription = await this.openai.audio.transcriptions.create({
                file: createReadStream(tempFilePath), // ✅ compatível com a tipagem exigida
                model: model || 'whisper-1',
                prompt: additionalInfo || '',
                language: 'pt',
            });

            return transcription.text;
        } finally {
            // Apaga o arquivo temporário
            unlinkSync(tempFilePath);
        }
    }
}
