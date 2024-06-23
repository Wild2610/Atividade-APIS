import React, { useState } from "react";
import App from "../componentes/App";

const Deletar = () => {
  const [id, setId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

  
      const response = await fetch(`http://localhost:3030/deletar/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) {
        setId(''); 
      }
  };

  return (
    <App
      titulo={"Deletar"}
      textoBt={"Deletar"}
      idState={true}
      nomeState={false}
      emailState={false}
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
      onSubmit={handleSubmit}
    />
  );
};

export default Deletar;