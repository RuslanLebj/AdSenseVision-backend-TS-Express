import type {Knex} from "knex";
import dotenv from "dotenv";
import path from 'path';

// Загрузите переменные окружения, если они хранятся в .env
// Важно явно загрузить переменные окружения в этом процессе
// - поскольку миграции запускаются отдельным процессом и могут не иметь доступа к переменным окружения, загруженным в основном процессе Node.js.
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
//console.log(process.env)

// Update with your config settings.
const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.POSTGRES_DB_HOST,
            port: Number(process.env.POSTGRES_DB_PORT),
            database: process.env.POSTGRES_DB_NAME,
            user: process.env.POSTGRES_DB_USER,
            password: process.env.POSTGRES_DB_PASSWORD
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: 'migrations'
        },
        seeds: {
            directory: 'seeds'
        }
    },
};

// typescript export default is not supported by knex cli by default.
module.exports = config;