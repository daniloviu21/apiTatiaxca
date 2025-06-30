# Imagen base ligera de Node.js
FROM node:18-alpine

# Metadatos
LABEL version="1.0" description="Node.js API" maintainer="tu_email@dominio.com"

# Variables
ARG APP_VERSION=1.0
ENV NODE_ENV=production
ENV APP_VERSION=$APP_VERSION

# Directorio de trabajo
WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install --only=production

# Copiar el resto del código
COPY . .

# Exponer el puerto de la app
EXPOSE 3010

# Comando principal
CMD ["node", "index.js"]

# Verificación de salud
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3010/ || exit 1