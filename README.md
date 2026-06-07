# 🚀 **AI Audio Transcriber**

Uma API RESTful para **transcrição de áudios** usando IA, construída com **NestJS**. O projeto suporta múltiplos provedores de transcrição: **OpenAI** e **Groq**.

### 📋 **Descrição**
Essa API permite a conversão de áudios em texto, ideal para integrar sistemas de **atendimento automatizado**, **análise de voz** e **transcrição de conteúdos de áudio**.

---

### 🛠️ **Tecnologias Utilizadas**
- **NestJS**: Framework Node.js para desenvolvimento de APIs.
- **TypeScript**: Linguagem usada para o desenvolvimento robusto.
- **OpenAI SDK**: Utilizado para integração com OpenAI e Groq (API compatível).
- **Jest**: Testes automatizados unitários.
- **Docker** (opcional para containerização).

---

### 🎯 **Objetivo**
Fornecer uma solução flexível e escalável para transcrição de áudios utilizando IA, com suporte a múltiplos provedores. Perfeito para **startups**, **empresas de tecnologia** e **desenvolvedores** que desejam agregar funcionalidades de transcrição em seus sistemas.

---

### 📂 **Estrutura do Projeto**
```plaintext
├── src/
│   ├── transcription/
│   │   ├── providers/
│   │   │   └── openai/        # OpenaiService (reutilizado para OpenAI e Groq)
│   │   ├── dto/               # Data Transfer Objects
│   │   ├── transcription.controller.ts
│   │   ├── transcription.service.ts
│   │   └── transcription.module.ts
├── .gitignore
├── Dockerfile
├── package.json
└── README.md
```

### 🚀 **Como Rodar o Projeto**

#### 1. **Instalação Local (sem Docker)**

##### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/)
- [OpenAI API Key](https://platform.openai.com/account/api-keys)
- [Groq API Key](https://console.groq.com) (necessária para usar o provider Groq)

##### Passos

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/caioeduardoit/ai-transcriber-nestjs.git
   cd ai-transcriber-nestjs
   ```

2. **Instale as dependências**:
  ```bash
  npm install
  ```

3. **Crie o arquivo `.env` na raiz do projeto com suas chaves de API**:
  ```env
  OPENAI_API_KEY=your-openai-api-key
  GROQ_API_KEY=your-groq-api-key
  PORT=3000
  ```

4. **Inicie a aplicação**:
  ```bash
  npm run start
  ```


#### 2. **Instalação com Docker (recomendado)**

##### Pré-requisitos

- [Docker](https://www.docker.com/)

##### Passos

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/caioeduardoit/ai-transcriber-nestjs.git
   cd ai-transcriber-nestjs
   ```

2. **Crie a imagem Docker**:
  ```bash
  docker build -t ai-transcriber-nestjs .
  ```

3. **Inicie o container**:
  ```bash
  docker run -p 3000:3000 \
    --env OPENAI_API_KEY=your-openai-api-key \
    --env GROQ_API_KEY=your-groq-api-key \
    ai-transcriber-nestjs
  ```

A aplicação estará disponível em `http://localhost:3000`.


### 🧑‍💻 **Endpoints da API**

#### 1. **Transcrever Áudio**

- **Método**: `POST`
- **Rota**: `/transcription/upload`
- **Requisição**: `multipart/form-data`
- **Respostas**:
  - `200 OK`: Sucesso na transcrição.
  - `400 Bad Request`: Dados de entrada inválidos.

##### Campos do FormData

| Campo            | Tipo    | Obrigatório | Descrição                                                                               |
| ---------------- | ------- | ----------- | --------------------------------------------------------------------------------------- |
| `file`           | arquivo | ✅          | Arquivo de áudio a ser transcrito                                                       |
| `provider`       | string  | ✅          | Provider de IA: `openai` ou `groq`                                                      |
| `model`          | string  | ❌          | Modelo a usar. Default: `gpt-4o-transcribe` (openai) ou `whisper-large-v3` (groq)       |
| `additionalInfo` | string  | ❌          | Contexto adicional para melhorar a transcrição                                          |
| `language`       | string  | ❌          | Código do idioma (`pt`, `en`, `es`). Use `auto` para detecção automática. Default: `pt` |

##### Exemplo de uso (Insomnia/Postman):

**Com OpenAI:**
- **URL**: `http://localhost:3000/transcription/upload`
- **Método**: `POST`
- **Body** (Form-data):
  - `file`: [arquivo de áudio]
  - `provider`: `openai`
  - `model`: `gpt-4o-transcribe`
  - `language`: `pt`

**Com Groq:**
- **URL**: `http://localhost:3000/transcription/upload`
- **Método**: `POST`
- **Body** (Form-data):
  - `file`: [arquivo de áudio]
  - `provider`: `groq`
  - `model`: `whisper-large-v3`
  - `language`: `auto`

##### Exemplo de resposta:
```json
{
  "provider": "groq",
  "model": "whisper-large-v3",
  "additionalInfo": "No additional info provided",
  "transcription": "Olá, este é o texto transcrito do áudio."
}
```

### ⚙️ **Variáveis de Ambiente**

```env
# Chave da API da OpenAI
OPENAI_API_KEY=your-openai-api-key

# Chave da API da Groq (obrigatória — a aplicação não inicia sem ela)
GROQ_API_KEY=your-groq-api-key

# Porta do servidor (padrão: 3000)
PORT=3000
```

> **Nota:** A Groq oferece um plano gratuito com acesso ao modelo `whisper-large-v3`. Para obter sua chave, acesse [console.groq.com](https://console.groq.com).

### 🧪 **Testes Automatizados**

O projeto possui testes unitários cobrindo os principais componentes da API.

```bash
# Rodar todos os testes
npm run test

# Rodar com relatório de cobertura
npm run test:cov
```

---

### 📢 **Contribuições**

Este projeto é **open-source** e você é bem-vindo(a) para contribuir. Caso queira fazer uma melhoria ou correção, por favor, envie um **pull request**.

#### Como Contribuir:

1. **Fork** o repositório.
2. Crie uma **branch** para sua feature (`git checkout -b feature/nova-feature`).
3. Faça suas mudanças e **commit** as alterações (`git commit -m 'Adiciona nova feature'`).
4. **Push** para a branch (`git push origin feature/nova-feature`).
5. Abra um **pull request** para o repositório original.

Estou sempre aberto a melhorias e sugestões, então se você tiver alguma ideia ou quiser contribuir, fique à vontade para fazer parte desse projeto!

---

Fique à vontade para abrir **issues** caso encontre algum bug ou tenha sugestões para novas funcionalidades.

---

## 📬 Contato

Se quiser trocar uma ideia, falar sobre o projeto ou só dar um alô, é só me chamar:

- **LinkedIn:** [https://www.linkedin.com/in/caio-eduardo-cardoso-340250121](https://www.linkedin.com/in/caio-eduardo-cardoso-340250121)  
- **GitHub:** [github.com/caioeduardoit](https://github.com/caioeduardoit)  

Fique à vontade para abrir issues, mandar sugestões ou me chamar nas redes!
