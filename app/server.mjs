import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import cors from "cors";

const app = express();
const port = 3030;

// configurar conexao com o banco de dados
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ildefonso22",
  database: "usuarios",
});

// conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados: " + err.stack);
    return;
  }
  console.log("Conectado ao banco de dados");
});

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//rota para listar
app.get("/usuarios", (req, res) => {
  const query = "SELECT * FROM usuarios";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao listar usuários: " + err.stack);
      return res.status(500).send("Erro ao listar usuários.");
    }
    res.status(200).json(results); // retorna os resultados como JSON
  });
});

// rota para cadastrar um usuário
app.post("/cadastro", (req, res) => {
  const { nome, email } = req.body;

  // verificar se os campos são validos
  if (!nome || !email) {
    return res.status(400).send("Nome e email são obrigatórios.");
  }

  const queryVerificaEmail = "SELECT * FROM usuarios WHERE email = ?";

  db.query(queryVerificaEmail, [email], (err, results) => {
    if (err) {
      console.error(`Erro ao verificar email ${err.stack}`);
      return res.status(500).send("Erro ao verificar email.");
    }

    if (results.length > 1) {
      alert("Email já existente")
      return res.status(403).send("O email já existe");      
    } else {
      const query = "INSERT INTO usuarios (nome, email) VALUES (?, ?)";

      db.query(query, [nome, email], (err, results) => {
        if (err) {
          console.error("Erro ao inserir usuário: " + err.stack);
          return res.status(500).send("Erro ao cadastrar usuário.");
        }
        res.status(200).send("Usuário cadastrado com sucesso!");
      });
    }
  });
});

//rota para alterar um usuario
app.put("/alterar/:id", (req, res) => {
  const id = req.params.id;
  const { nome, email } = req.body;

  if (!nome || !email || !id) {
    return res.status(400).send("Falta alguma informação necessária.");
  }

  const selectQuery = "SELECT * FROM usuarios WHERE id = ?";
  db.query(selectQuery, [id], (err, results) => {
    if (err) {
      console.error("Erro ao verificar o ID:", err.stack);
      return res.status(500).send("Erro ao verificar o ID.");
    }

    if (results.length == 0) {
      return res.status(404).send("ID não encontrado na tabela.");
    }

    const updateQuery = "UPDATE usuarios SET nome=?, email=? WHERE id=?";
    db.query(updateQuery, [nome, email, id], (err, results) => {
      if (err) {
        console.error("Erro ao alterar usuário: " + err.stack);
        return res.status(500).send("Erro ao alterar usuário.");
      }
      res.status(200).send("Usuário alterado com sucesso!");
    });
  });
});
//rota pra deletar um usuario
app.delete("/deletar/:id" /* passa o id como parametro na url*/, (req, res) => {
    const id = req.params.id; // resgata o id na url
  
    // verificar se o id foi fornecido
    if (!id) {
      return res.status(400).send("ID é obrigatório");
    }
  
    const queryVerificaId = 'SELECT * FROM usuarios WHERE id=?';
  
    db.query(queryVerificaId, [id], (err, results) => {
      if (err) {
        console.error(`Erro ao tentar encontrar ID: ${err.stack}`);
        return res.status(500).send('Erro ao tentar encontrar ID');
      }
  
      if (results.length == 0) {
        return res.status(403).send('ID não existe');
      }
  
      const query = "DELETE FROM usuarios WHERE id = ?";
  
      db.query(query, [id], (err, results) => {
        if (err) {
          console.error("Erro ao deletar usuário: " + err.stack);
          return res.status(500).send("Erro ao deletar usuário.");
        }
        res.status(200).send("Usuário deletado com sucesso!");
      });
    });
  });



// iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
