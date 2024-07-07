import type {Knex} from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'postgresql',
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
            directory: 'db/migrations'
        },
        seeds: {
            directory: 'db/seeds'
        }
    },
};

module.exports = config;