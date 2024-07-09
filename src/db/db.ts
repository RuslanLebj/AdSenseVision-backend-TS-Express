const knex = require("knex")
const knexfile = require("./knexfile")

const db = knex(knexfile.development)
// typescript export default is not supported by knex cli by default.
module.exports = db