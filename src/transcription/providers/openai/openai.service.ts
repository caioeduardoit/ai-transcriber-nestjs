import { Injectable } from '@nestjs/common';
import { createReadStream, createWriteStream, unlinkSync } from 'fs';
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

        // Escreve o conteúdo do arquivo no caminho temporário
        await new Promise<void>((resolve, reject) => {
            const writeStream = createWriteStream(tempFilePath);
            writeStream.write(fileBuffer);
            writeStream.end();

            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });

        try {
            const fileBlob = new Blob([fileBuffer]);

            const transcription = await this.openai.audio.transcriptions.create({
                file: createReadStream(tempFilePath),
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
