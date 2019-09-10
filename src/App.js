import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar.component";
import ListagemLivros from "./components/listagem-livros";
import CadastroLivro from "./components/criar-livro";
import EditarLivro from "./components/editar_livro";

import { Container } from "react-bootstrap";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path="/listagem" exact component={ListagemLivros} />
      <Route path="/cadastrar-livro" exact component={CadastroLivro} />
      <Route path="/editar-livro/:id" exact component={EditarLivro} />

    </Router>
  );
}

export default App;
