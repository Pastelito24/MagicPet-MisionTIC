import React from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import "../mascotas.css";
import { request } from "../../helper/helper";
import Loading  from "../../loading/loading";
import MessagePrompt from "../../prompts/message";
import ConfirmationProps from "../../prompts/confirmation";

export default class MascotasEditar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        idMascota: this.props.getIdMascota(),
        rediret: false,
        message: {
            text: "",
            show: false,
        },
        confirmation: {
            title: "Modificar Mascota",
            text: "Desea Modificar la Mascota?",
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
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }
  componentDidMount() { 
    this.getMascota();
}
getMascota() {      
    this.setState({ loading: true });
    request
        .get(`/mascotas/${this.state.idMascota}`)
        .then((response) => {
            this.setState({
                mascota: response.data,
                loading: false,
            }); 
        })
        .catch((err) => {
            console.error(err);
            this.setState({ loading: false });
        });       

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
        .put(`/mascotas/${this.state.idMascota}`, this.state.mascota)
        .then((response) => {
            if (response.data.exito) {
                this.props.changeTab("buscar");
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
  onCancel() {  
        this.setState({
            confirmation: {
                ...this.state.confirmation,
                show: false,
            },
        })      
}
onConfirm() {
    this.setState({
        confirmation: {
            ...this.state.confirmation,
            show: false,
        },
    },
    this.guardarMascotas()
    );
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
                <ConfirmationProps 
                show={this.state.confirmation.show}
                title={this.state.confirmation.title}
                text={this.state.confirmation.text}
                onCancel={this.onCancel}
                onConfirm={this.onConfirm}
                />
        <Loading show={this.state.loading}></Loading>
        <Row>
          <h1>Editar Mascotas</h1>
        </Row>  
        <Row>
          <Form>
          <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                value={this.state.mascota.nombre}
                                onChange={(e) =>
                                    this.setValue("nombre", e.target.value)
                                } />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Nombre Provisional</Form.Label>
                            <Form.Control
                            value={this.state.mascota.nombre_provisional}
                                onChange={(e) =>
                                    this.setValue("nombre_provisional", e.target.value)
                                } />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Raza</Form.Label>
                            <Form.Control
                            value={this.state.mascota.raza}
                                onChange={(e) =>
                                    this.setValue("raza", e.target.value)
                                } />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Peso</Form.Label>
                            <Form.Control
                            value={this.state.mascota.peso}
                                onChange={(e) =>
                                    this.setValue("peso", e.target.value)
                                }
                            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Vacunas</Form.Label>
                            <Form.Control
                            value={this.state.mascota.vacunas}
                                onChange={(e) =>
                                    this.setValue("vacunas", e.target.value)
                                } />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Esterilizado</Form.Label>
                            <Form.Control
                            value={this.state.mascota.esterilizado}
                                onChange={(e) =>
                                    this.setValue("esterilizado", e.target.value)
                                } />
            </Form.Group>
            
            <Button
                            variant="primary"
                             onClick={() => 
                                 this.setState({
                                     confirmation: { ...this.state.confirmation, show:true},
                                 })}
                            
                        >
              Editar Mascota
            </Button>   
          </Form>
        </Row>
      </Container>
    );
  }
}
