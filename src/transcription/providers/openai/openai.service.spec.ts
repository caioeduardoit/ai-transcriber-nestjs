import { Test, TestingModule } from '@nestjs/testing';
import { OpenaiService, OPENAI_CLIENT } from './openai.service';

describe('OpenaiService', () => {
  let service: OpenaiService;
  let mockCreate: jest.Mock;

  beforeEach(async () => {
    mockCreate = jest.fn().mockResolvedValue({ text: 'texto transcrito' });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpenaiService,
        {
          provide: OPENAI_CLIENT,
          useValue: { audio: { transcriptions: { create: mockCreate } } },
        },
      ],
    }).compile();

    service = module.get<OpenaiService>(OpenaiService);
  });

  it('chama a API OpenAI com os parâmetros corretos', async () => {
    await service.transcribe(
      'whisper-1',
      Buffer.from('audio'),
      'audio.mp3',
      'info adicional',
      'pt',
    );

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        model: 'whisper-1',
        prompt: 'info adicional',
        language: 'pt',
      }),
    );
  });

  it('passa o model fornecido para a API sem aplicar default', async () => {
    await service.transcribe('meu-modelo', Buffer.from('audio'), 'audio.mp3');

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({ model: 'meu-modelo' }),
    );
  });

  it('usa pt como idioma padrão quando language não é informado', async () => {
    await service.transcribe('whisper-1', Buffer.from('audio'), 'audio.mp3');

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({ language: 'pt' }),
    );
  });

  it('usa o idioma informado quando language é fornecido', async () => {
    await service.transcribe(
      'whisper-1',
      Buffer.from('audio'),
      'audio.mp3',
      '',
      'en',
    );

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({ language: 'en' }),
    );
  });

  it('omite o campo language quando "auto" é passado, permitindo detecção automática', async () => {
    await service.transcribe('whisper-1', Buffer.from('audio'), 'audio.mp3', '', 'auto');

    expect(mockCreate).toHaveBeenCalledWith(
      expect.not.objectContaining({ language: expect.anything() }),
    );
  });

  it('retorna o texto da transcrição', async () => {
    mockCreate.mockResolvedValue({ text: 'texto esperado' });

    const result = await service.transcribe(
      'whisper-1',
      Buffer.from('audio'),
      'audio.mp3',
    );

    expect(result).toBe('texto esperado');
  });
});
