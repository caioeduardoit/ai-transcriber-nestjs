# 🚀 **AI Audio Transcriber**

Uma API RESTful para **transcrição de áudios** usando IA, construída com **NestJS**. O projeto suporta transcrição com o modelo **OpenAI Whisper** e está preparado para expansão futura com outros provedores (Azure, Gemini, dentre outros).

### 📋 **Descrição**
Essa API permite a conversão de áudios em texto, ideal para integrar sistemas de **atendimento automatizado**, **análise de voz** e **transcrição de conteúdos de áudio**.

Atualmente, oferece suporte à transcrição de áudio via **OpenAI Whisper**, mas a estrutura está pronta para incluir outros provedores de IA.

---

### 🛠️ **Tecnologias Utilizadas**
- **NestJS**: Framework Node.js para desenvolvimento de APIs.
- **TypeScript**: Linguagem usada para o desenvolvimento robusto.
- **OpenAI Whisper**: Modelo de transcrição de áudio.
- **Git**: Controle de versão.
- **Docker** (opcional para containerização).
- **Jest** (em breve): Testes automatizados.

---

### 🎯 **Objetivo**
Fornecer uma solução flexível e escalável para transcrição de áudios utilizando IA, com a possibilidade de integração com múltiplos provedores. Perfeito para **startups**, **empresas de tecnologia** e **desenvolvedores** que desejam agregar funcionalidades de transcrição em seus sistemas.

---

### 📂 **Estrutura do Projeto**
```plaintext
├── src/
│   ├── transcription/         # Lógica da transcrição de áudios
│   ├── providers/             # Provedores de IA (OpenAI, etc)
├── .gitignore                 # Arquivos a serem ignorados pelo git
├── Dockerfile                 # Configuração para containerização (opcional)
├── package.json               # Dependências do projeto
└── README.md                  # Documentação do projeto

### 🚀 **Como Rodar o Projeto**

#### 1. **Instalação Local (sem Docker)**

##### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/)
- [OpenAI API Key](https://beta.openai.com/account/api-keys)

##### Passos

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/caioeduardoit/ai-transcriber-nestjs.git
   cd ai-transcriber-nestjs

2. **Instale as dependências**:
  ```bash
  npm install

3. **Configure a variável de ambiente `OPENAI_API_KEY` com sua chave da OpenAI. Crie um arquivo `.env` na raiz do projeto:
  ```env
  OPENAI_API_KEY=your-api-key-here

4. **Inicie a aplicação**:
  ```bash
  npm run start


#### 2. **Instalação com Docker (recomendado)**

##### Pré-requisitos

- [Docker](https://www.docker.com/)

##### Passos

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/caioeduardoit/ai-transcriber-nestjs.git
   cd ai-transcriber-nestjs

2. **Crie a imagem Docker**:
  ```bash
  docker build -t ai-transcriber-nestjs

3. **Inicie o container**:
  ```bash
  docker run -p 3000:3000 --env OPENAI_API_KEY=your-api-key-here ai-transcriber-nestjs

A aplicação estará disponível em `http://localhost:3000`.


### 🧑‍💻 **Endpoints da API**

#### 1. **Transcrever Áudio**

- **Método**: `POST`
- **Rota**: `/transcription/upload`
- **Requisição**: FormData (arquivo de áudio, modelo de transcrição, informações adicionais)
- **Respostas**:
  - `200 OK`: Sucesso na transcrição.
  - `400 Bad Request`: Dados de entrada inválidos.

##### Exemplo de uso (Insomnia/Postman):
1. **URL**: `http://localhost:3000/transcription/upload`
2. **Método**: `POST`
3. **Body**:
   - Tipo: `Form-data`
   - Campos:
     - `file`: [Escolha o arquivo de áudio]
     - `provider`: `openai`
     - `model`: `whisper-1` (ou outro modelo disponível)
     - `additionalInfo`: `Opcional, texto adicional para o modelo`


### ⚙️ **Configuração e Ambiente**

Você pode configurar outras variáveis de ambiente ou opções adicionais no arquivo `.env`. O arquivo `.env` pode conter:

```env
# Chave da API do OpenAI
OPENAI_API_KEY=your-openai-api-key

# Porta que o servidor irá rodar
PORT=3000

# Outras variáveis podem ser adicionadas conforme necessário


### 🧪 **Testes Automatizados**

Testes automatizados serão implementados em breve utilizando o framework **Jest**. Fique atento para atualizações!

---

Você pode executar os testes com o comando:

```bash
npm run test


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
