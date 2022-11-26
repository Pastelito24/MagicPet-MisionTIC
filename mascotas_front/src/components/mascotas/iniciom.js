import React from 'react';
import { Container, Row, Nav } from 'react-bootstrap';
import "./mascotas.css";
import MascotasBuscar from './crud/buscar';
import MascotasCrear from './crud/crear';
import MascotasEditar from './crud/editar';



export default class Mascotas extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentTab: 'buscar',
            _id: null,
         }
         this.changeTab = this.changeTab.bind(this);
         this.setIdMascota = this.setIdMascota.bind(this);
         this.getIdMascota = this.getIdMascota.bind(this);         
    }
    changeTab(tab) {
      this.setState({ currentTab: tab });
  }
  setIdMascota(id) {
    this.setState({ _id: id });
}

getIdMascota() {
    return this.state._id;
}
    render() { 
        return (  
<Container id="mascotas-container">
                <Row>
                <Nav
              fill
              variant="tabs"
              defaultActiveKey="buscar"
              onSelect={(eventKey) => this.setState({ currentTab: eventKey })}
            >
              <Nav.Item>
                <Nav.Link eventKey="buscar">Buscar</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="crear">Crear</Nav.Link>
              </Nav.Item>
            </Nav>
                </Row>
                <Row>
                {this.state.currentTab === 'buscar' ? ( 
                <MascotasBuscar  changeTab={this.changeTab}
                setIdMascota={this.setIdMascota}
                 />
                 ) : this.state.currentTab === 'crear' ?
                  ( <MascotasCrear  changeTab={this.changeTab}
                />) : (<MascotasEditar changeTab={this.changeTab} 
                  getIdMascota={this.getIdMascota}
                  />)}
                </Row>
            </Container>
        );
    }
}
