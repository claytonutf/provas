const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Configuração do Middleware para lidar com dados de formulário
app.use(bodyParser.urlencoded({ extended: true }));

// --- CONFIGURAÇÃO DO BANCO DE DADOS (SQLite em Memória) ---
// Criamos um banco temporário que zera toda vez que você reinicia o script
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE users (id INT, username TEXT, password TEXT)");
    // Usuário admin criado para o teste de invasão
    db.run("INSERT INTO users (id, username, password) VALUES (1, 'admin', 'secreta123')");
    console.log("--- Banco de dados pronto: Usuário 'admin' criado ---");
});

// --- ROTA: Página Inicial (Serve o index.html) ---
app.get('/', (req, res) => {
    // Envia o arquivo HTML para o cliente
    res.sendFile(path.join(__dirname, 'index.html'));
});

// -------------------------------------------------------------------
// --- ROTA 1: VULNERÁVEL (Não use em produção!) ----------------------
// -------------------------------------------------------------------
app.post('/login-vulneravel', (req, res) => {
    const { usuario, senha } = req.body;
    
    // ❌ VULNERABILIDADE: Concatenação direta de strings.
    const query = "SELECT * FROM users WHERE username = '" + usuario + "' AND password = '" + senha + "'";
    
    console.log("\n[VULNERÁVEL] QUERY EXECUTADA: " + query); // Monitore o terminal

    db.get(query, (err, row) => {
        if (err) return res.send(`<h1>ERRO</h1> <p>Erro no servidor: ${err.message}</p>`);
        if (row) {
            res.send(`<h1>✅ SUCESSO!</h1> <p>Você logou como: <b>${row.username}</b></p><p>A query foi manipulada com sucesso.</p><a href='/'>Voltar</a>`);
        } else {
            res.send(`<h1>❌ FALHA</h1> <p>Usuário ou senha inválidos.</p><a href='/'>Voltar</a>`);
        }
    });
});

// -------------------------------------------------------------------
// --- ROTA 2: SEGURA (Prepared Statements) --------------------------
// -------------------------------------------------------------------
app.post('/login-seguro', (req, res) => {
    const { usuario, senha } = req.body;

    // ✅ SEGURANÇA: Uso de placeholders (?) para separar comandos de dados.
    const query = "SELECT * FROM users WHERE username = ? AND password = ?";

    db.get(query, [usuario, senha], (err, row) => {
        if (err) return res.send(`<h1>ERRO</h1> <p>Erro no servidor: ${err.message}</p>`);
        if (row) {
            res.send(`<h1>✅ SUCESSO!</h1> <p>Login legítimo realizado.</p><a href='/'>Voltar</a>`);
        } else {
            res.send(`<h1>❌ FALHA</h1> <p>Tentativa de injeção bloqueada ou credenciais erradas.</p><a href='/'>Voltar</a>`);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});