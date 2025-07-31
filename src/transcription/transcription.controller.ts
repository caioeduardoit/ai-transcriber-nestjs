import { Controller, Post, UploadedFile, UseInterceptors, Body, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TranscriptionService } from './transcription.service';
import { TranscribeAudioDto } from './dto/transcribe-audio.dto';

@Controller('transcription')
export class TranscriptionController {
    constructor(private readonly transcriptionService: TranscriptionService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async handleUpload(@UploadedFile() file: Express.Multer.File, @Body() body: TranscribeAudioDto) {
        if (!file) {
            throw new BadRequestException('Nenhum arquivo enviado.');
        }

        if (!body.provider) {
            throw new BadRequestException('O campo "provider" é obrigatório.');
        }

        return this.transcriptionService.transcribe(
            body.provider,
            body.model || 'whisper-1',
            file,
            body.additionalInfo || '',
        );
    }
}
