import React from "react";
import "../mascotas.css";
import { Container, Row } from "react-bootstrap";
import { request } from "../../helper/helper";
import DataGrid from "../../grid/grid";
import ConfirmationProps from "../../prompts/confirmation";
import MessagePrompt from "../../prompts/message";
import Loading  from "../../loading/loading";

const columns = [{
    dataField: '_id',
    text: 'ID',
    hidden: true,
  },{
    dataField: 'nombre',
    text: 'Nombre',
  },{
    dataField: 'nombre_provisional',
    text: 'Nombre Provisional',
  },{
    dataField: 'raza',
    text: 'Raza',
  },{
    dataField: 'peso',
    text: 'Peso',
  },{
    dataField: 'vacunas',
    text: 'Vacunas',
  },{
    dataField: 'esterilizado',
    text: 'Esterilizado',
  },
];

export default class MascotasBuscar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      idMascota: null,
      message: {
          text: "",
          show: false,
      },
      confirmation: {
        title: "Eliminar la Mascota",
        text: "Desea Eliminar la Mascota?",
        show: false,
    },
    };
    this.onClickEditButton = this.onClickEditButton.bind(this);
    this.onClickDeleteButton = this.onClickDeleteButton.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  } 
  
  componentDidMount() {
    this.getData();
  }
  onClickEditButton(row) {
    this.props.setIdMascota(row._id);
    this.props.changeTab("editar");
  }
  getData() {
    request
      .get(this.props.url)
      .then((response) => {
        this.setState({ rows: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  onClickDeleteButton(row) {
    this.setState({
        idMascota: row._id,
        confirmation: {
            ...this.state.confirmation,
            show: true,
        },
    });
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
  });
  this.eliminarMascota();
}
eliminarMascota() {
  this.setState({ loading: true });
  request
      .delete(`/mascotas/${this.state.idMascota}`)
      .then((response) => {
          this.setState({
              loading: false,
              message: {
                  text: response.data.msg,
                  show: true,
              },
          });
          this.setState({ loading: false });
          if(response.data.exito) this.reloadPage();
      })

      .catch((err) => {
          console.error(err);
          this.setState({ loading: false });
      });
}
reloadPage() {
  setTimeout(() => {
      window.location.reload();
  }, 1500);
}
  render() {

    return (
      <Container id="mascotas-buscar-container">
        <ConfirmationProps 
                show={this.state.confirmation.show}
                title={this.state.confirmation.title}
                text={this.state.confirmation.text}
                onCancel={this.onCancel}
                onConfirm={this.onConfirm}
                />
                        <MessagePrompt
                    text={this.state.message.text}
                    show={this.state.message.show}
                    duration={2500}
                    onExited={this.onExitedMessage}
                />
                <Loading show={this.state.loading}></Loading>
        <Row>
          <h1>Buscar Mascotas</h1>
        </Row>
        <Row>
          <DataGrid url='/mascotas'  columns={columns} 
          showEditButton={true}
          showDeleteButton={true}
          onClickEditButton={this.onClickEditButton} 
          onClickDeleteButton={this.onClickDeleteButton}
          />
        </Row>
      </Container>
    );
  }
}
