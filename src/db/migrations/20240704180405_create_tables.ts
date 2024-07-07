import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('camera', (table) => {
        table.increments('id').primary();
        table.string('name', 120).notNullable();
        table.string('url_address', 80).notNullable();
        table.string('connection_login', 50).notNullable();
        table.string('connection_password', 50).notNullable();
    });

    await knex.schema.createTable('screen', (table) => {
        table.increments('id').primary();
        table.string('name', 120).notNullable();
        table.time('start_time').notNullable();
        table.time('end_time').notNullable();
        table.time('pause_time').notNullable();
        table.date('update_date');
    });

    await knex.schema.createTable('broadcast_station', (table) => {
        table.increments('id').primary();
        table.string('name', 120).notNullable();
        table.integer('camera_id').references('id').inTable('camera');
        table.integer('screen_id').references('id').inTable('screen');
        table.string('location_address', 120);
    });

    await knex.schema.createTable('media_content', (table) => {
        table.increments('id').primary();
        table.string('video', 250).notNullable();
        table.string('name', 120);
        table.string('description', 360);
        table.date('upload_date');
        table.time('duration');
        table.string('preview', 250);
    });

    await knex.schema.createTable('schedule', (table) => {
        table.increments('id').primary();
        table.integer('queue_number').notNullable();
        table.integer('media_content_id').references('id').inTable('media_content');
        table.integer('screen_id').references('id').inTable('screen');
    });

    await knex.schema.createTable('statistics', (table) => {
        table.increments('id').primary();
        table.integer('media_content_id').references('id').inTable('media_content');
        table.integer('broadcast_station_id').references('id').inTable('broadcast_station');
        table.time('total_viewing_time');
        table.integer('max_viewers_count');
        table.integer('show_count');
    });

    await knex.schema.createTable('statistics_per_show', (table) => {
        table.increments('id').primary();
        table.integer('media_content_id').references('id').inTable('media_content');
        table.integer('broadcast_station_id').references('id').inTable('broadcast_station');
        table.time('viewing_time').notNullable();
        table.integer('max_viewers_count').notNullable();
        table.timestamp('show_datetime').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('statistics_per_show');
    await knex.schema.dropTableIfExists('statistics');
    await knex.schema.dropTableIfExists('schedule');
    await knex.schema.dropTableIfExists('media_content');
    await knex.schema.dropTableIfExists('broadcast_station');
    await knex.schema.dropTableIfExists('screen');
    await knex.schema.dropTableIfExists('camera');
}

