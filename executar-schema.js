// =====================================================================
// executar-schema.js
//
// Lê o arquivo schema.sql e executa os comandos no MySQL do Aiven.
//
// Isso cria automaticamente a tabela "usuarios" e qualquer outra
// tabela que você adicionar futuramente ao schema.sql.
//
// Como usar:
//
//     node executar-schema.js
//
// Ou, se configurado no package.json:
//
//     npm run db:setup
// =====================================================================

require('dotenv').config();

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');


// =====================================================================
// FUNÇÃO PRINCIPAL
// =====================================================================

async function main() {

    try {

        // -------------------------------------------------------------
        // 1. LOCALIZA O schema.sql
        // -------------------------------------------------------------

        const caminhoSchema = path.join(
            __dirname,
            'schema.sql'
        );


        // -------------------------------------------------------------
        // 2. LÊ O ARQUIVO
        // -------------------------------------------------------------

        const sql = fs.readFileSync(
            caminhoSchema,
            'utf8'
        );


        console.log('\nConectando ao MySQL do Aiven...');


        // -------------------------------------------------------------
        // 3. CONECTA AO MYSQL
        // -------------------------------------------------------------

        const conexao = await mysql.createConnection({

            host: process.env.DB_HOST,

            port: process.env.DB_PORT,

            user: process.env.DB_USER,

            password: process.env.DB_PASSWORD,

            database: process.env.DB_NAME,


            // Conexão segura com SSL
            ssl: {

                ca: fs.readFileSync(
                    process.env.DB_CA
                )

            },


            // Permite executar vários comandos SQL
            multipleStatements: true

        });


        console.log(
            'Conectado! Executando o schema.sql...'
        );


        // -------------------------------------------------------------
        // 4. EXECUTA O schema.sql
        // -------------------------------------------------------------

        await conexao.query(sql);


        console.log(
            '\nPronto! O banco foi configurado com sucesso.'
        );

        console.log(
            'A tabela de usuários está pronta para receber cadastros.\n'
        );


        // -------------------------------------------------------------
        // 5. FECHA A CONEXÃO
        // -------------------------------------------------------------

        await conexao.end();


    } catch (erro) {

        // -------------------------------------------------------------
        // TRATAMENTO DE ERRO
        // -------------------------------------------------------------

        console.error(
            '\nOcorreu um erro ao configurar o banco:'
        );

        console.error(
            '-> ' + erro.message
        );

        console.error(
            '\nConfira:'
        );

        console.error(
            '- Os dados do arquivo .env'
        );

        console.error(
            '- O certificado ca.pem'
        );

        console.error(
            '- O caminho definido em DB_CA'
        );

        console.error(
            '- Se o banco do Aiven está disponível\n'
        );


        process.exit(1);

    }

}


// =====================================================================
// EXECUTA
// =====================================================================

main();