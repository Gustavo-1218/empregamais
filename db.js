// =====================================================================
// db.js
// Ponte entre o Node.js e o banco MySQL do Aiven.
//
// Este arquivo cria a conexão com o banco e disponibiliza um pool
// para o server.js realizar consultas.
// =====================================================================

require('dotenv').config();

const mysql = require('mysql2/promise');
const fs = require('fs');


// =====================================================================
// POOL DE CONEXÕES
// =====================================================================

const pool = mysql.createPool({

    // Dados do banco
    host: process.env.DB_HOST,

    port: process.env.DB_PORT,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME,


    // ---------------------------------------------------------------
    // SSL
    // ---------------------------------------------------------------
    // O Aiven utiliza conexão criptografada.
    // O certificado ca.pem deve estar no projeto.
    // ---------------------------------------------------------------

    ssl: {

        ca: fs.readFileSync(process.env.DB_CA)

    },


    // ---------------------------------------------------------------
    // Configurações do pool
    // ---------------------------------------------------------------

    waitForConnections: true,

    connectionLimit: 10,

    queueLimit: 0

});


// =====================================================================
// EXPORTA O POOL
// =====================================================================
// O server.js poderá fazer:
//
// const pool = require('./db');
//
// E então:
//
// pool.query(...)
// =====================================================================

module.exports = pool;