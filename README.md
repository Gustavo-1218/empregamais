# Site + Node.js + MySQL (Aiven) — Projeto Exemplo

Uma **Lista de Tarefas** simples que mostra, na prática, um site (HTML, CSS e
JavaScript) conversando com um banco de dados **MySQL na nuvem (Aiven)** por
meio do **Node.js**.

```
Navegador  →  Node.js (servidor)  →  MySQL no Aiven
(HTML/CSS/JS)     (server.js)          (defaultdb)
```

O navegador **nunca** fala direto com o banco. Ele chama o servidor Node.js
(pelas rotas `/api/...`), e o servidor é quem executa o SQL no MySQL.

---

## Estrutura do projeto

```
site-com-banco/
├── public/            → o SITE (o que roda no navegador)
│   ├── index.html
│   ├── style.css
│   └── script.js      → usa fetch() para chamar o servidor
├── db.js              → conexão com o MySQL do Aiven (mysql2 + SSL)
├── server.js          → servidor Node.js (Express) + rotas da API
├── schema.sql         → cria a tabela "tarefas" no banco
├── .env.example       → modelo das variáveis de conexão
├── package.json
└── README.md
```

---

## Pré-requisitos

- **Node.js** instalado (versão 18 ou mais nova). Baixe em <https://nodejs.org>.
  - Para conferir, rode no terminal: `node -v`

---

## Passo 1 — Criar a conta e o banco no Aiven

1. Acesse <https://aiven.io> e clique em **Sign up** (dá para entrar com Google
   ou GitHub). **Não precisa de cartão de crédito.**
2. No painel (Console), clique em **Create service**.
3. Escolha **MySQL**.
4. Em plano, escolha o **Free** (grátis para sempre).
5. Escolha uma **região** próxima (ex.: uma da América do Sul/Norte) e dê um
   **nome** ao serviço. Clique em **Create service**.
6. Espere o indicador ficar **verde** (`Running`). Pode levar alguns minutos.

## Passo 2 — Pegar os dados de conexão

Ainda no Aiven, abra o serviço e vá na aba **Overview**, seção
**Connection information**. Anote:

- **Host** (algo como `nome-xxxx.aivencloud.com`)
- **Port** (um número, ex.: `12345`)
- **User** (`avnadmin`)
- **Password** (clique no olhinho para revelar)
- **Database** (`defaultdb`)
- Baixe o **CA Certificate** e salve como **`ca.pem`** na **raiz do projeto**
  (na mesma pasta do `server.js`).

## Passo 3 — Configurar o projeto

1. Copie o arquivo `.env.example` para um novo arquivo chamado **`.env`**.
2. Abra o `.env` e preencha com os dados que você anotou no Passo 2.

Exemplo de `.env` preenchido:

```
DB_HOST=meu-servico-abc123.aivencloud.com
DB_PORT=12345
DB_USER=avnadmin
DB_PASSWORD=AVNS_xxxxxxxxxxxxx
DB_NAME=defaultdb
DB_CA=ca.pem
PORT=3000
```

## Passo 4 — Instalar as bibliotecas

No terminal, dentro da pasta do projeto:

```bash
npm install      # baixa as bibliotecas (express, mysql2, dotenv)
```

## Passo 5 — Criar as tabelas (sem MySQL Workbench!)

Este projeto já vem com um script que **cria as tabelas automaticamente**:
ele lê o `schema.sql`, conecta no seu banco do Aiven (usando os dados do `.env`)
e executa os comandos. Basta rodar:

```bash
npm run db:setup      # o mesmo que: node executar-schema.js
```

Se aparecer `Pronto! As tabelas foram criadas com sucesso.`, deu certo. ✅

> Pode rodar mais de uma vez sem problema: a tabela usa `CREATE TABLE IF NOT
> EXISTS` e os dados de exemplo só entram se ela estiver vazia.

**Alternativa manual:** se preferir, dá para abrir a aba **Query editor** do
serviço no Aiven (ou o MySQL Workbench) e colar o conteúdo do `schema.sql`.

## Passo 6 — Rodar o site

```bash
npm start        # liga o servidor
```

Você verá a mensagem: `Site rodando! Abra no navegador: http://localhost:3000`

Abra **<http://localhost:3000>** no navegador. Adicione, conclua e apague
tarefas — tudo fica salvo no banco de dados do Aiven! 🎉

---

## O que cada parte faz

| Arquivo         | Papel                                                                 |
|-----------------|-----------------------------------------------------------------------|
| `index.html`    | A estrutura da página (formulário e lista).                           |
| `style.css`     | A aparência (cores, espaçamentos).                                    |
| `script.js`     | Roda no navegador; usa `fetch()` para chamar o servidor.             |
| `server.js`     | O servidor Node.js; recebe as chamadas e executa o SQL.              |
| `db.js`         | Abre a conexão segura (SSL) com o MySQL do Aiven.                    |
| `schema.sql`    | Os comandos SQL que criam a tabela `tarefas`.                        |
| `executar-schema.js` | Roda o `schema.sql` no banco e cria as tabelas automaticamente. |

## As rotas da API

| Método | Rota                      | O que faz                          |
|--------|---------------------------|------------------------------------|
| GET    | `/api/tarefas`            | Lista todas as tarefas             |
| POST   | `/api/tarefas`            | Adiciona uma tarefa                |
| PUT    | `/api/tarefas/:id/concluir` | Marca/desmarca como concluída    |
| DELETE | `/api/tarefas/:id`        | Apaga uma tarefa                   |

---

## Dicas e problemas comuns

- **`Error: ENOENT ... ca.pem`** → o arquivo `ca.pem` não está na raiz do
  projeto. Baixe-o de novo do Aiven (aba Overview).
- **Erro de conexão / timeout** → confira host, porta e senha no `.env`. Se o
  serviço do Aiven estiver "adormecido" por inatividade, abra o painel e
  ligue-o novamente (`Power on`).
- **Nunca** suba o arquivo `.env` nem o `ca.pem` para o GitHub — eles contêm
  dados sigilosos. (Já estão no `.gitignore`.)
