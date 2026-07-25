const { Pool } = require("pg");
require("dotenv").config();

const configuracion = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl:
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: false }
          : false,
    }
  : {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || "helpdesk_db",
    };

const pool = new Pool(configuracion);

pool.on("connect", () => {
  console.log("Conexión establecida con PostgreSQL");
});

pool.on("error", (error) => {
  console.error("Error inesperado en PostgreSQL:", error.message);
});

module.exports = pool;