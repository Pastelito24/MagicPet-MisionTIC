import React from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import "../mascotas.css";
import { request } from "../../helper/helper";
import Loading  from "../../loading/loading";
import MessagePrompt from "../../prompts/message";

export default class MascotasCrear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        rediret: false,
        message: {
            text: "",
            show: false,
        },
        loading: false,
        mascota: {
            nombre: "",
            nombre_provisional: "",
            raza: "",
            peso: "",
            vacunas: "",
            esterilizado: "",
        },
    };
    this.onExitedMessage = this.onExitedMessage.bind(this);
  }
setValue(iniciom, value){
    this.setState({
        mascota: {
                ...this.state.mascota,
                [iniciom]: value,
        },
    });
}
  guardarMascotas() {
    this.setState({ loading: true });
    request
    .post("/mascotas", this.state.mascota)
    .then((response) => {
        if (response.data.exito) {
            this.setState({
                rediret: response.data.exito,
                message: {
                    text: response.data.msg,
                    show: true,
                },
            });
        }
        this.setState({ loading: false });
    })
    .catch((err) => {
        console.error(err);
        this.setState({ loading: true });
    });
}
onExitedMessage () {
    if (this.state.rediret) this.props.changeTab( 'buscar' );
  }
  render() {
    return (
      <Container id="mascotas-crear-container">
        <MessagePrompt
                    text={this.state.message.text}
                    show={this.state.message.show}
                    duration={2500}
                    onExited={this.onExitedMessage}
                />
        <Loading show={this.state.loading}></Loading>
        <Row>
          <h1>Añadir Mascotas</h1>
        </Row>  
        <Row>
          <Form>
          <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                onChange={(e) =>
                                    this.setValue("nombre", e.target.value)
                                } />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Nombre Provisional</Form.Label>
                            <Form.Control
                                onChange={(e) =>
                                    this.setValue("nombre_provisional", e.target.value)
                                } />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Raza</Form.Label>
                            <Form.Control
                                onChange={(e) =>
                                    this.setValue("raza", e.target.value)
                                } />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Peso</Form.Label>
                            <Form.Control
                                onChange={(e) =>
                                    this.setValue("peso", e.target.value)
                                }
                            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Vacunas</Form.Label>
                            <Form.Control
                                onChange={(e) =>
                                    this.setValue("vacunas", e.target.value)
                                } />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Esterilizado</Form.Label>
                            <Form.Control
                                onChange={(e) =>
                                    this.setValue("esterilizado", e.target.value)
                                } />
            </Form.Group>
            
            <Button
                            variant="primary"
                            onClick={() => console.log(this.guardarMascotas())}
                        >
              Guardar Mascota
            </Button>   
          </Form>
        </Row>
      </Container>
    );
  }
}
