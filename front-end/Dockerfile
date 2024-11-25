# Dockerfile para desenvolvimento
FROM node:18-alpine

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos necessários
COPY package.json package-lock.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Expor a porta 80
EXPOSE 80

# Rodar o Vite na porta 80
CMD ["npm", "run", "dev", "--", "--host", "--port", "80"]
