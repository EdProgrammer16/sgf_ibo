require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

exports.getAll = async (req, res) => {
  const result = await sql`SELECT * FROM parcela_de_terra;`;

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
};
