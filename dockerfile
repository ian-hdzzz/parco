FROM node:16-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --production=false
COPY . .
RUN npm run build

# Instala un servidor para servir la aplicación
RUN npm install -g serve

# Comando para iniciar la aplicación
CMD ["serve", "-s", "build", "-l", "$PORT"]