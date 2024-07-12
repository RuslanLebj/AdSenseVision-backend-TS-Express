# Сборка образа для сборки приложения/разработки
FROM node:20-alpine AS development

# Указываем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json в образ
COPY package*.json .

# Загружаем зависимости
RUN npm install

# Копируем все файлы из текущей директории (где находится Dockerfile) в рабочую директорию образа
COPY . .

# Собираем приложение
RUN npm run build

# Начинаем сборку образа для продакшн
FROM node:20-alpine AS production

# Устанавливаем рабочую директорию
WORKDIR /app

# Указываем переменную окружения для продакшн (в продакшн режиме приложение работает с оптимизированной производительностью, уменьшенными логами и другой конфигурацией, которая делает его более эффективным и безопасным для рабочей среды)
# Эта строка задает аргумент сборки с именем NODE_ENV и значением "production". Этот аргумент доступен только во время сборки образа.
ARG NODE_ENV=production
# Эта строка устанавливает переменную окружения NODE_ENV внутри контейнера, используя значение аргумента сборки NODE_ENV. Эта переменная окружения будет доступна во время выполнения контейнера, указывая, что контейнер работает в режиме продакшн.
ENV NODE_ENV=${NODE_ENV}
# В продакшн режиме:
# - Логирование сведено к минимуму, до необходимого уровня.
# - Используются дополнительные уровни кэширования для оптимизации производительности.

# Копируем package.json и package-lock.json в образ
COPY package*.json .

# Устанавливаем только продакшн зависимости (избегаем dev зависимостей)
RUN npm install --only=production

# Копируем собранное приложение из предыдущего образа (образ сборки)
COPY --from=development /app/dist .dist

# Устанавливаем глобально менеджер процессов Node.js PM2
RUN npm install pm2 -g

# Указываем порт, который будет использован приложением
EXPOSE ${EXPRESS_PORT}