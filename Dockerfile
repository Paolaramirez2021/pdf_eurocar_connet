# Usamos una imagen de Node que ya viene preparada para Puppeteer
FROM ghcr.io/puppeteer/puppeteer:22.6.0

# Cambiamos al directorio de la app
WORKDIR /app

# Copiamos los archivos de dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto que usa Railway
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["node", "server.js"]
