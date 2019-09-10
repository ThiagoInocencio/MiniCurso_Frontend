import React, { Component } from 'react';
import FileBase64 from 'react-file-base64';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import estilo from "../css/estilo.module.css";
import axios from 'axios';
import { Redirect } from 'react-router'

export default class EditarLivro extends Component {

    constructor(props) {
        super(props);

        this.onChangeInput = this.onChangeInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onLoadImage = this.onLoadImage.bind(this);

        this.state = {
            fotoCapa: '',
            nome: '',
            autor: 0,
            ano: 1900,
            exemplares: 0,
            redirecionar: false,
            validacao: {
                fotoCapa: false,
                nome: false,
                autor: false,
                ano: false,
                exemplares: false
            }
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/livros/' + this.props.match.params.id)
            .then(response => {

                this.setState({
                    fotoCapa: response.data.fotoCapa,
                    nome: response.data.nome,
                    autor: response.data.autor,
                    ano: response.data.ano,
                    exemplares: response.data.exemplares
                })

            })
            .catch(function (error) {
                console.log(error);
            })
    }

    removeErroValidacao(campo) {
        var state = this.state;
        state.validacao[campo] = false;
        this.setState({ state });
    }

    onChangeInput(e) {
        this.removeErroValidacao(e.target.name);
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onLoadImage(files) {
        this.removeErroValidacao("fotoCapa");
        this.setState({ fotoCapa: files[0].base64 });
    }

    validarCampos() {

        var state = this.state;
        var erroValidacao = false;

        if (this.state.fotoCapa === '') {
            state.validacao.fotoCapa = true;
            erroValidacao = true;
            this.setState({ state })
        }

        if (this.state.nome === '') {
            state.validacao.nome = true;
            erroValidacao = true;
            this.setState({ state })
        }

        if (this.state.autor === '') {
            state.validacao.autor = true;
            erroValidacao = true;
            this.setState({ state })
        }

        if (this.state.ano === '') {
            state.validacao.ano = true;
            erroValidacao = true;
            this.setState({ state })
        }

        if (this.state.exemplares === '') {
            state.validacao.exemplares = true;
            erroValidacao = true;
            this.setState({ state })
        }

        if (erroValidacao)
            return true;
        else
            return false;
    }

    onSubmit(e) {

        e.preventDefault();

        if (this.validarCampos()) return;

        const livro = {
            fotoCapa: this.state.fotoCapa,
            nome: this.state.nome,
            autor: this.state.autor,
            ano: this.state.ano,
            exemplares: this.state.exemplares
        }

        axios.post('http://localhost:5000/livros/update/' + this.props.match.params.id, livro)
            .then(res => {
                var alerta = {
                    tipo: "success",
                    msg: "Livro " + livro.nome + " atualizado com sucesso !"
                }

                localStorage.setItem("alerta", JSON.stringify(alerta));

                this.props.history.push("/listagem");
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    temAlerta: true,
                    mensagemDoAlerta: JSON.stringify(error.message),
                    tipoDoAlerta: "danger"
                })
            })

    }

    render() {

        if (this.state.redirecionar) {
            return <Redirect to='/listagem' />;
        }

        return (
            <Container>
                <h1>Editar Livro</h1>

                {
                    this.state.temAlerta &&
                    <Alert variant={this.state.tipoDoAlerta} dismissible onClose={() => this.setState({ temAlerta: false })}>
                        {this.state.mensagemDoAlerta}
                    </Alert>
                }

                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className={estilo.inputFotoLabel}>Imagem de capa</Form.Label>

                        {this.state.fotoCapa !== '' &&
                            <img src={this.state.fotoCapa} width="150" height="200" alt="foto de capa" className={estilo.fotoCapa} />
                        }

                        {
                            this.state.validacao.fotoCapa &&
                            <Form.Text className={estilo.validacao}>
                                Por favor, carrega a capa do livro
                            </Form.Text>
                        }

                        <FileBase64 multiple={true} onDone={this.onLoadImage} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Nome do Livro</Form.Label>
                        <Form.Control value={this.state.nome} name="nome" onChange={this.onChangeInput} placeholder="Digite o nome do livro" />

                        {
                            this.state.validacao.nome &&
                            <Form.Text className={estilo.validacao}>
                                Por favor, digite o nome do livro
                            </Form.Text>
                        }
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Autor</Form.Label>
                        <Form.Control value={this.state.autor} name="autor" onChange={this.onChangeInput} placeholder="Digite o nome do Autor" />

                        {
                            this.state.validacao.autor &&
                            <Form.Text className={estilo.validacao}>
                                Por favor, digite o nome do autor
                            </Form.Text>
                        }
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Ano</Form.Label>
                        <Form.Control value={this.state.ano} name="ano" type="number" onChange={this.onChangeInput} placeholder="Digite o ano de publicação" />

                        {
                            this.state.validacao.ano &&
                            <Form.Text className={estilo.validacao}>
                                Por favor, digite o ano de publicação
                            </Form.Text>
                        }
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Exemplares</Form.Label>
                        <Form.Control value={this.state.exemplares} name="exemplares" type="number" onChange={this.onChangeInput} placeholder="Digite a quantidade de exemplares" />

                        {
                            this.state.validacao.exemplares &&
                            <Form.Text className={estilo.validacao}>
                                Por favor, digite a quantidade de exemplares
                            </Form.Text>
                        }
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Atualizar
                    </Button>
                </Form>
            </Container>
        )
    }
}