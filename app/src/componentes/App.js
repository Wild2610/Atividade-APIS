import React from "react";
import styles from "../styles/form.module.css";
import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const App = ({titulo, textoBt, nomeState}) => {
  //desestruturando as props

  const nav = useNavigate();

  const cadastrarClick = () => {
    nav("/cadastro");
  };

  return (
    <>
      <div className={styles.body}>
        <div className={styles.navBar}>
          <button onClick={cadastrarClick}>Cadastrar</button>
          <button>Alterar</button>
          <button>Deletar</button>
        </div>
        
        <div className={styles.container_form}>
          <form className={styles.form}>
            <h1>{titulo}</h1>
            <div className={styles.container}>
              <div>
                Nome:<input type="text" disabled={nomeState}></input>
              </div>
              <div>
                Email:<input type="email"></input>
              </div>
              <div>
                <button>{textoBt}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

App.propTypes = {
  titulo: propTypes.string.isRequired,
  textoBt: propTypes.string.isRequired, //
};

export default App;
