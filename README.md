# **Segurança em aplicações web**
# Prof. Clayton Kossoski

**Protocolo HTTPS, técnicas de ataque, prevenção e monitoramento, criptografia, chaves assimétricas e certificados digitais**


# Entendendo a Injeção de SQL (SQL Injection)

Este README explica a vulnerabilidade de Injeção de SQL (SQLI), suas
causas e a solução mais eficaz, baseado em um formato de slides
didático.

## 🛡️ O Que é e Como Ocorre

### 1. O Conceito

A Injeção de SQL (SQL Injection) é uma falha de segurança que ocorre
quando um atacante insere código SQL malicioso através de campos de
entrada de dados.

Objetivos do ataque: - Burlar autenticação
- Extrair dados sigilosos
- Modificar ou deletar informações

### 2. A Causa Raiz: Concatenação de Strings

A vulnerabilidade ocorre quando o sistema cria consultas SQL
concatenando diretamente os valores recebidos do usuário.

**Exemplo vulnerável:**

``` javascript
const query = "SELECT * FROM users WHERE username = '" + usuario + "' AND password = '" + senha + "'";
```

### 3. A Exploração (Bypass)

O atacante usa entradas que fecham a string e injetam SQL.

**Payload clássico:**

    ' OR '1'='1' --

**Consulta resultante:**

    SELECT * FROM users WHERE username = '' OR '1'='1'

------------------------------------------------------------------------

## 🛡️ Como Prevenir a Injeção de SQL

### 1. Solução Essencial: Prepared Statements

Use consultas parametrizadas para separar comando e dados.

**Exemplo seguro em Node.js/SQLite:**

``` javascript
const query = "SELECT * FROM users WHERE username = ? AND password = ?";
db.get(query, [usuario, senha], (err, row) => { ... });
```

### 2. Por que Funciona

Com Prepared Statements, o banco interpreta o input como dado literal,
impedindo execução de comandos maliciosos.

### 3. Boas Práticas

-   Usar ORMs como Sequelize ou Prisma
-   Aplicar Princípio do Mínimo Privilégio
