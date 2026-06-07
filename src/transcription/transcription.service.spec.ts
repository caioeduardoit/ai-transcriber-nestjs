import { Test, TestingModule } from '@nestjs/testing';
import { TranscriptionService } from './transcription.service';
import { OpenaiService, GROQ_SERVICE } from './providers/openai/openai.service';

describe('TranscriptionService', () => {
  let service: TranscriptionService;
  let openaiService: jest.Mocked<OpenaiService>;
  let groqService: jest.Mocked<OpenaiService>;

  const mockFile = (
    overrides: Partial<Express.Multer.File> = {},
  ): Express.Multer.File =>
    ({
      buffer: Buffer.from('audio'),
      originalname: 'audio.mp3',
      ...overrides,
    }) as Express.Multer.File;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TranscriptionService,
        { provide: OpenaiService, useValue: { transcribe: jest.fn() } },
        { provide: GROQ_SERVICE, useValue: { transcribe: jest.fn() } },
      ],
    }).compile();

    service = module.get<TranscriptionService>(TranscriptionService);
    openaiService = module.get(OpenaiService);
    groqService = module.get<OpenaiService>(GROQ_SERVICE);
  });

  it('lança erro quando o arquivo não tem buffer', async () => {
    await expect(
      service.transcribe(
        'openai',
        'whisper-1',
        mockFile({ buffer: undefined }),
      ),
    ).rejects.toThrow('Arquivo inválido ou ausente.');
  });

  it('lança erro para provider não suportado', async () => {
    await expect(
      service.transcribe('azure', 'model', mockFile()),
    ).rejects.toThrow('Provider azure not supported.');
  });

  it('delega para OpenaiService com os parâmetros corretos', async () => {
    openaiService.transcribe.mockResolvedValue('texto transcrito');

    await service.transcribe('openai', 'whisper-1', mockFile(), 'info', 'en');

    expect(openaiService.transcribe).toHaveBeenCalledWith(
      'whisper-1',
      mockFile().buffer,
      'audio.mp3',
      'info',
      'en',
    );
  });

  it('retorna o resultado com o formato correto para openai', async () => {
    openaiService.transcribe.mockResolvedValue('texto transcrito');

    const result = await service.transcribe(
      'openai',
      'gpt-4o-transcribe',
      mockFile(),
      'info',
      'pt',
    );

    expect(result).toEqual({
      provider: 'openai',
      model: 'gpt-4o-transcribe',
      additionalInfo: 'info',
      transcription: 'texto transcrito',
    });
  });

  it('usa gpt-4o-transcribe como default para openai quando model não informado', async () => {
    openaiService.transcribe.mockResolvedValue('texto');

    const result = await service.transcribe('openai', '', mockFile());

    expect(openaiService.transcribe).toHaveBeenCalledWith(
      'gpt-4o-transcribe',
      expect.anything(),
      expect.anything(),
      expect.anything(),
      expect.anything(),
    );
    expect(result.model).toBe('gpt-4o-transcribe');
  });

  it('delega para groqService quando provider é groq', async () => {
    groqService.transcribe.mockResolvedValue('texto groq');

    await service.transcribe(
      'groq',
      'whisper-large-v3',
      mockFile(),
      'info',
      'pt',
    );

    expect(groqService.transcribe).toHaveBeenCalledWith(
      'whisper-large-v3',
      mockFile().buffer,
      'audio.mp3',
      'info',
      'pt',
    );
  });

  it('usa whisper-large-v3 como default para groq quando model não informado', async () => {
    groqService.transcribe.mockResolvedValue('texto');

    const result = await service.transcribe('groq', '', mockFile());

    expect(groqService.transcribe).toHaveBeenCalledWith(
      'whisper-large-v3',
      expect.anything(),
      expect.anything(),
      expect.anything(),
      expect.anything(),
    );
    expect(result.model).toBe('whisper-large-v3');
  });

  it('retorna resultado com provider groq no formato correto', async () => {
    groqService.transcribe.mockResolvedValue('texto groq');

    const result = await service.transcribe(
      'groq',
      'whisper-large-v3',
      mockFile(),
      'info',
      'pt',
    );

    expect(result).toEqual({
      provider: 'groq',
      model: 'whisper-large-v3',
      additionalInfo: 'info',
      transcription: 'texto groq',
    });
  });
});
