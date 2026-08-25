// =====================================================================
// server.js
// Servidor do Emprega Mais
//
// Ele faz duas coisas:
// 1) Entrega os arquivos HTML, CSS e JS.
// 2) Recebe os dados do cadastro e salva no MySQL.
// =====================================================================

require('dotenv').config();

const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const pool = require('./db');

const app = express();

// Permite receber JSON
app.use(express.json());

// Entrega os arquivos da pasta public
app.use(express.static(path.join(__dirname, 'public')));


// =====================================================================
// ROTA - CADASTRAR USUÁRIO
//
// O navegador envia:
// POST /api/cadastro
//
// Com:
// {
//   nome,
//   cpf,
//   celular,
//   email,
//   senha
// }
// =====================================================================

app.post('/api/cadastro', async (req, res) => {

    const {
        nome,
        cpf,
        celular,
        email,
        senha
    } = req.body;


    // ---------------------------------------------------------------
    // VERIFICAÇÃO DOS CAMPOS
    // ---------------------------------------------------------------

    if (!nome || !cpf || !celular || !email || !senha) {

        return res.status(400).json({
            erro: 'Todos os campos são obrigatórios.'
        });

    }


    try {

        // -----------------------------------------------------------
        // VERIFICA SE O E-MAIL JÁ EXISTE
        // -----------------------------------------------------------

        const [emailExistente] = await pool.query(
            'SELECT id FROM usuarios WHERE email = ?',
            [email]
        );

        if (emailExistente.length > 0) {

            return res.status(409).json({
                erro: 'Este e-mail já está cadastrado.'
            });

        }


        // -----------------------------------------------------------
        // VERIFICA SE O CPF JÁ EXISTE
        // -----------------------------------------------------------

        const [cpfExistente] = await pool.query(
            'SELECT id FROM usuarios WHERE cpf = ?',
            [cpf]
        );

        if (cpfExistente.length > 0) {

            return res.status(409).json({
                erro: 'Este CPF já está cadastrado.'
            });

        }


        // -----------------------------------------------------------
        // CRIA O HASH DA SENHA
        // -----------------------------------------------------------

        const senhaHash = await bcrypt.hash(senha, 10);


        // -----------------------------------------------------------
        // SALVA NO BANCO
        // -----------------------------------------------------------

        const [resultado] = await pool.query(

            `INSERT INTO usuarios
            (nome, cpf, celular, email, senha)
            VALUES (?, ?, ?, ?, ?)`,

            [
                nome.trim(),
                cpf.trim(),
                celular.trim(),
                email.trim(),
                senhaHash
            ]

        );


        // -----------------------------------------------------------
        // RESPOSTA
        // -----------------------------------------------------------

        res.status(201).json({

            sucesso: true,

            mensagem: 'Conta criada com sucesso!',

            usuario: {

                id: resultado.insertId,
                nome: nome.trim(),
                email: email.trim()

            }

        });


    } catch (erro) {

        console.error('Erro ao cadastrar usuário:', erro);

        res.status(500).json({

            erro: 'Não foi possível criar a conta.'

        });

    }

});


// =====================================================================
// ROTA - BUSCAR USUÁRIO PELO ID
// =====================================================================

app.get('/api/usuarios/:id', async (req, res) => {

    try {

        const [usuarios] = await pool.query(

            `SELECT
                id,
                nome,
                cpf,
                celular,
                email
             FROM usuarios
             WHERE id = ?`,

            [req.params.id]

        );


        if (usuarios.length === 0) {

            return res.status(404).json({
                erro: 'Usuário não encontrado.'
            });

        }


        res.json(usuarios[0]);


    } catch (erro) {

        console.error(erro);

        res.status(500).json({

            erro: 'Não foi possível buscar o usuário.'

        });

    }

});


// =====================================================================
// INICIA O SERVIDOR
// =====================================================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(
        `\nSite rodando! Abra no navegador: http://localhost:${PORT}\n`
    );

});