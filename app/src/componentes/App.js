import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/form.module.css";
import PropTypes from "prop-types";

const App = ({
  titulo,
  textoBt,
  idState,
  nomeState,
  emailState,
  idInput,
  nomeInput,
  emailInput,
  onSubmit,
}) => {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:3030/usuarios");
      if (response.ok) {
        const data = await response.json();
        setUsuarios(data); // atualiza o estado com os dados dos usuarios
      } else {
        console.error("Erro ao buscar usuários");
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const click = async (caminho) => {
    navigate(`/${caminho}`);
    await fetchUsuarios(); // Atualiza a lista após navegação
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // executar a função passada por props para lidar com o submit
    if (onSubmit) {
      await onSubmit(event);
      await fetchUsuarios();
    }
  };

  // renderização condicional
  let renderIdInput = null;
  if (idState) {
    renderIdInput = idInput;
  }

  let renderNomeInput = null;
  if (nomeState) {
    renderNomeInput = nomeInput;
  }

  let renderEmailInput = null;
  if (emailState) {
    renderEmailInput = emailInput;
  }

  return (
    <div className={styles.body}>
      <div className={styles.navBar}>
        <button onClick={() => click("cadastro")}>Cadastrar</button>
        <button onClick={() => click("alterar")}>Alterar</button>
        <button onClick={() => click("deletar")}>Deletar</button>
      </div>

      <div className={styles.main}>
        <div className={styles.container_form}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1>{titulo}</h1>
            <div className={styles.container}>
              {renderIdInput}
              {renderNomeInput}
              {renderEmailInput}
              <div>
                <button type="submit">{textoBt}</button>
              </div>
            </div>
          </form>
        </div>

        <div className={styles.containerSaida}>
          <h1>Usuários Cadastrados </h1>
          <ul className={styles.lista}>
            {usuarios.map((usuario) => (
              <li key={usuario.id}>
                ID: {usuario.id}, Nome: {usuario.nome}, Email: {usuario.email}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

App.propTypes = {
  titulo: PropTypes.string.isRequired,
  textoBt: PropTypes.string.isRequired,
  idState: PropTypes.bool.isRequired,
  nomeState: PropTypes.bool.isRequired,
  emailState: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default App;
