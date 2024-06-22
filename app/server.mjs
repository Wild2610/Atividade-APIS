import express from 'express';

const app = express();

const porta = 3030;
app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`)
})