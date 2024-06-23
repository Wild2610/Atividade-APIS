import { useNavigate } from "react-router-dom";

const Error = () => {
  const nav = useNavigate();

  const voltar = () => {
    nav("/cadastro");
  };

  return (
    <body
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        height: "100vh",
        color: "white",
        fontSize: "400px",
      }}
    >
      404
      <button onClick={voltar}>Voltar</button>
    </body>
  );
};

export default Error;
