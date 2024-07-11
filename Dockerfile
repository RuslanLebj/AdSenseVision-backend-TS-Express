FROM node:18-alpine

# Указываем директория
WORKDIR /app

# Копируем в образ package.json и package-lock.json
COPY package*.json ./

# Загружаем зависимости
RUN npm install

# Копируем в образ текущую папку (Папка с Dockerfile) в папку в которой мы находимся (WORKDIR)
COPY . .

RUN npm run build

CMD ["npm", "run", "start"]