const { drizzle } = require("drizzle-orm/neon-http");
const schema = require("./schema");
const { neon } = require("@neondatabase/serverless");
require('dotenv').config();

const sql = neon(process.env.DRIZZLE_DATABASE_URL);
const db = drizzle(sql, { schema });
module.exports = { db } 
