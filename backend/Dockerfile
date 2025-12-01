# Usar una imagen base de Node.js ligera (Alpine Linux) para reducir el tamaño final
FROM node:20

# Establecer el directorio de trabajo dentro del contenedor donde vivirá la app
WORKDIR /app

# Copiar los archivos de definición de dependencias primero (package.json y package-lock.json)
# Esto se hace antes de copiar el código para aprovechar la caché de Docker si las dependencias no cambian
COPY package*.json ./

# Instalar las dependencias del proyecto definidas en el package.json
RUN npm install

# Copiar el resto del código fuente de la aplicación al directorio de trabajo del contenedor
COPY . .

# Informar a Docker que el contenedor escuchará en el puerto 3005
EXPOSE 3005

# Definir el comando por defecto para iniciar la aplicación cuando arranque el contenedor
CMD ["npm", "start"]
