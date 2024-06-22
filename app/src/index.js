import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cadastro from './componentes/Cadastro.js';
import Error from './componentes/Error.js'

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/cadastro" element={<Cadastro />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
