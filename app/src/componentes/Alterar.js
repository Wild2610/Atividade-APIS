import React, { useState } from "react";
import App from "../componentes/App";

const Alterar = () => {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:3030/alterar/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, email })
    });

    if (response.ok) {
      setId('');
      setNome('');
      setEmail('');
    } 
  };

  return (
    <App
      titulo={"Alterar"}
      textoBt={"Alterar"}
      idState={true}
      nomeState={true}
      emailState={true}
      idInput={
        <div>
          <label>ID:</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
      }
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
      onSubmit={handleSubmit}
    />
  );
};

export default Alterar;