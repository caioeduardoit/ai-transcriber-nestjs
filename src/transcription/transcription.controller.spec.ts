import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { TranscriptionController } from './transcription.controller';
import {
  TranscriptionResult,
  TranscriptionService,
} from './transcription.service';
import { TranscribeAudioDto } from './dto/transcribe-audio.dto';

describe('TranscriptionController', () => {
  let controller: TranscriptionController;
  let transcriptionService: jest.Mocked<TranscriptionService>;

  const mockFile = (
    overrides: Partial<Express.Multer.File> = {},
  ): Express.Multer.File =>
    ({ buffer: Buffer.from('audio'), ...overrides }) as Express.Multer.File;

  const mockResult: TranscriptionResult = {
    provider: 'openai',
    model: 'whisper-1',
    additionalInfo: '',
    transcription: 'texto transcrito',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TranscriptionController],
      providers: [
        { provide: TranscriptionService, useValue: { transcribe: jest.fn() } },
      ],
    }).compile();

    controller = module.get<TranscriptionController>(TranscriptionController);
    transcriptionService = module.get(TranscriptionService);
  });

  it('lança BadRequestException quando nenhum arquivo é enviado', async () => {
    const body: TranscribeAudioDto = { provider: 'openai' };

    await expect(
      controller.handleUpload(undefined as any, body),
    ).rejects.toThrow(BadRequestException);
  });

  it('lança BadRequestException quando provider está ausente', async () => {
    const body = { provider: '' } as TranscribeAudioDto;

    await expect(controller.handleUpload(mockFile(), body)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('delega para TranscriptionService com os parâmetros corretos', async () => {
    transcriptionService.transcribe.mockResolvedValue(mockResult);
    const body: TranscribeAudioDto = {
      provider: 'openai',
      model: 'whisper-1',
      additionalInfo: 'info',
      language: 'pt',
    };
    const file = mockFile();

    await controller.handleUpload(file, body);

    expect(transcriptionService.transcribe).toHaveBeenCalledWith(
      'openai',
      'whisper-1',
      file,
      'info',
      'pt',
    );
  });

  it('passa model vazio para o service quando model não é informado', async () => {
    transcriptionService.transcribe.mockResolvedValue(mockResult);
    const body: TranscribeAudioDto = { provider: 'openai' };
    const file = mockFile();

    await controller.handleUpload(file, body);

    expect(transcriptionService.transcribe).toHaveBeenCalledWith(
      'openai',
      '',
      file,
      '',
      undefined,
    );
  });

  it('retorna o resultado do TranscriptionService', async () => {
    transcriptionService.transcribe.mockResolvedValue(mockResult);

    const result = await controller.handleUpload(mockFile(), {
      provider: 'openai',
    });

    expect(result).toEqual(mockResult);
  });
});
