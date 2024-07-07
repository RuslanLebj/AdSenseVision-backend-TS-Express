const knex = require("knex")
const knexfile = require("src/knexfile")

const db = knex(knexfile.development)
module.exports = db
