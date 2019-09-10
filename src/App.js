import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/NavbarComponent";
import ListagemLivro from "./components/ListagemLivro";
import CadastroLivro from "./components/CadastroLivro";
import EditarLivro from "./components/EditarLivro";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path="/" exact component={ListagemLivro} />
      <Route path="/listagem" exact component={ListagemLivro} />
      <Route path="/cadastrar-livro" exact component={CadastroLivro} />
      <Route path="/editar-livro/:id" exact component={EditarLivro} />
    </Router>
  );
}

export default App;