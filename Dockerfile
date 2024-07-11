FROM node:18-alpine AS build

# Указываем директорию
WORKDIR /app

# Копируем в образ package.json и package-lock.json
COPY package*.json .

# Загружаем зависимости
RUN npm install

# Копируем в образ текущую папку (Папка с Dockerfile) в папку в которой мы находимся (WORKDIR)
COPY . .

# Собираем приложение
RUN npm run build

# Начинаем сборку продашк образа
FROM node:18-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Копируем в образ package.json и package-lock.json
COPY package*.json .

# Загружаем зависимости для прода (избегая dev deps)
RUN npm install --only=production

# Указываем директорию
WORKDIR /app

COPY --from=build /app/dist .dist

CMD ["npm", "run", "start"]