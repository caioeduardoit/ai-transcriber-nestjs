# Use a versão oficial do Node.js 20 LTS
FROM node:20-buster

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos do projeto
COPY . .

# Instalar dependências
RUN npm install

# Expor a porta em que o app vai rodar
EXPOSE 3000

# Comando para iniciar o app
CMD ["npm", "run", "start:prod"]
