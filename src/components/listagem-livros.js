import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Table, Alert, Spinner, Button, Modal, Row, Col } from "react-bootstrap";
import estilo from "../css/estilo.module.css";

import { withRouter } from 'react-router'

const Livro = props => (
    <tr>
        <td><img src={props.livro.fotoCapa} width="65" height="85" alt="livro" /></td>
        <td>{props.livro.nome}</td>
        <td>{props.livro.autor}</td>
        <td>{props.livro.ano}</td>
        <td>{props.livro.exemplares}</td>
        <td>
            <Button className={estilo.btn} size="sm" variant="success" onClick={() => props.abrirCapa(props.livro)}>Ver Capa</Button>
            <Button className={estilo.btn} size="sm" variant="danger" onClick={() => props.apagarLivro(props.livro._id)}>Excluir</Button>
            <Button className={estilo.btn} href={"/editar-livro/" + props.livro._id} size="sm" variant="info" onClick={(e) => e.preventDefault()}>
                <Link to={"/editar-livro/" + props.livro._id} >editar</Link>
            </Button>
        </td>
    </tr>
)

const VerCapa = (props) => {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.livro.nome}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <img src={props.livro.fotoCapa} width="300" height="400" alt="capa do livro" />
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    );
}

class ListagemLivros extends Component {

    constructor(props) {
        super(props);

        this.apagarLivro = this.apagarLivro.bind(this);
        this.abrirCapa = this.abrirCapa.bind(this);

        this.state = {
            livros: [],
            temAlerta: false,
            mensagemDoAlerta: null,
            tipoDoAlerta: null,
            isLoading: false,
            verCapa: false,
            livroSelecionado: {}
        }

    }

    componentDidMount() {
        this.setState({ isLoading: true });
        Axios.get('http://localhost:5000/livros/')
            .then(response => {
                this.setState({
                    livros: response.data,
                    isLoading: false
                });
            })
            .catch((error) => {
                console.log(error);
            })

        var alerta = JSON.parse(localStorage.getItem("alerta"));

        if (alerta !== null) {
            this.setState({
                temAlerta: true,
                mensagemDoAlerta: alerta.msg,
                tipoDoAlerta: alerta.tipo
            })

            localStorage.setItem("alerta", null);
        }
    }

    apagarLivro(id) {
        Axios.delete('http://localhost:5000/livros/' + id)
            .then(response => console.log(response.data))

        this.setState({
            temAlerta: true,
            mensagemDoAlerta: "Livro removido com sucesso !",
            tipoDoAlerta: "success",
            livros: this.state.livros.filter(el => el._id !== id)
        })

    }

    abrirCapa(livro) {
        this.setState({
            verCapa: true,
            livroSelecionado: livro
        })
    }

    listagemLivros() {
        return this.state.livros.map(livro => {
            return <Livro livro={livro} apagarLivro={this.apagarLivro} key={livro} abrirCapa={this.abrirCapa} />;
        })
    }

    render() {

        return (
            <Container>
                <h1>IFLivros</h1>
                {
                    this.state.temAlerta &&
                    <Alert variant={this.state.tipoDoAlerta} dismissible onClose={() => this.setState({ temAlerta: false })}>
                        {this.state.mensagemDoAlerta}
                    </Alert>
                }

                {
                    this.state.livros.length === 0 && !this.state.isLoading &&
                    <Alert variant="info" >
                        Nenhum livro cadastrado !
                    </Alert>
                }

                <Table bordered hover size="sm" className={estilo.tabela}>
                    <thead>
                        <tr>
                            <th>Imagem</th>
                            <th>Nome</th>
                            <th>Autor</th>
                            <th>Ano</th>
                            <th>Exemplares</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.listagemLivros()}
                    </tbody>

                </Table>

                {
                    this.state.isLoading &&
                    <div className={estilo.loading}>
                        <Spinner animation="border" role="status" >
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                }

                <VerCapa
                    show={this.state.verCapa}
                    onHide={() => this.setState({ verCapa: false })}
                    livro={this.state.livroSelecionado}
                />

            </Container>
        )

    }

}


export default withRouter(ListagemLivros);