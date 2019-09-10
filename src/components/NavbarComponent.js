import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import estilo from "../css/estilo.module.css";

import { Navbar, Nav, Container } from 'react-bootstrap';

export default class NavbarComponent extends Component {
    render() {
        return (

            <Navbar bg="dark" variant="dark" expand="lg" className={estilo.cabecalho}>
                <Container>
                    <Navbar.Brand className={estilo.logo}><Link to="/listagem" className="nav-link"><img src="/logo.png" width="30" height="30" alt="IFSP Logo" />&nbsp;IFLivros</Link></Navbar.Brand>
                    <Nav className="mr-auto">
                        <Link to="/listagem" className="nav-link">Listagem</Link>
                        <Link to="/cadastrar-livro" className="nav-link">Cadastro de Livro</Link>
                    </Nav>
                </Container>
            </Navbar>

        );
    }
}