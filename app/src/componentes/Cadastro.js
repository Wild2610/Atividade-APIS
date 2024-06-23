import React, { useState } from "react";
import App from "../componentes/App";

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
      //cria uma rota para requisicao ao servidor
      const response = await fetch('http://localhost:3030/cadastro', {
        method: 'POST', //metodo http post para enviar informacoes
        headers: {
          'Content-Type': 'application/json' //especifica que o corpo da requisicao e json
        },
        body: JSON.stringify({ nome, email })  //corpo da requisicao em string JSON
      });

      if (response.ok) {
        // limpa os campos após o sucesso
        setNome('');
        setEmail('');
      }
   
  };

  return (
    <App
      titulo={"Cadastro"}
      textoBt={"Cadastrar"}
      idState={false}
      nomeState={true}
      emailState={true}
      idInput={false}
      onSubmit={handleSubmit} 
      nomeInput={
        <div>
          <label>Nome:</label>
          <input 
            type="text" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            required 
          />
        </div>
      }
      emailInput={
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
      }
    />
  );
};

export default Cadastro;