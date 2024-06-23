import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cadastro from "./componentes/Cadastro.js";
import Alterar from "./componentes/Alterar.js";
import Deletar from "./componentes/Deletar.js";
import Error from "./componentes/Error.js";

const root = createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/alterar" element={<Alterar />} />
      <Route path="/deletar" element={<Deletar />} />
    </Routes>
  </Router>
);