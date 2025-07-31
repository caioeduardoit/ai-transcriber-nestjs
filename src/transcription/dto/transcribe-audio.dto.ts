import { IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class TranscribeAudioDto {
    @IsString()
    @IsNotEmpty()
    provider: string;

    @IsOptional()
    @IsString()
    model?: string;

    @IsOptional()
    @IsString()
    additionalInfo?: string;
}
