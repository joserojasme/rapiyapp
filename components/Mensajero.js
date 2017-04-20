import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Styled from 'styled-components';
import PedidoDialog from '../components/PedidoDialog';

class Mensajero extends Component{
    constructor(props){
        super(props);
    }

    async  cambiarEstadoMensajero()
    {
        /*
        const URL = `//vmr.tarrao.co/data/getMensajeria`;
        const response = await fetch(URL);
        const data = await response.json();*/
        console.log("**Entro", "hola");
    }

    handleClick = event =>{
        this.props.dispatch({
            type:'SET_LOADING_STATUS',
            payload:{
                visible:'loading'
            }

        });

        this.cambiarEstadoMensajero();

        this.props.dispatch({
            type:'SET_PEDIDODIALOG',
            payload:{
                lanzar:true
            }
        });
    };

    render(){
        if(this.props.BotonDisable == 0){
            return(
                <div>
                    {this.props.lanzar &&
                    <div>
                        <PedidoDialog/>
                    </div>
                    }
                    <MuiThemeProvider>
                        <Fuente>
                            <Card>
                                <CardHeader
                                    actAsExpander={true}
                                    showExpandableButton={true}
                                    style={cardColor.card}
                                    subtitle={this.props.EstadoDesc}
                                >
                                    <List>
                                        <ListItem
                                            disabled={true}
                                            leftAvatar={
                                                <Avatar src={this.props.urlImagen} size={50}/>
                                            }
                                        >
                                            {this.props.Nombre.replace(/\b\w/g, l => l.toUpperCase())}<br/>

                                        </ListItem>
                                    </List>
                                </CardHeader>
                                <CardText style={cardColor.card} expandable={true}>
                                    Marca moto: {this.props.marcaVehiculo} <br/>
                                    Modelo: {this.props.modelo} <br/>
                                    Placa: {this.props.placa}
                                </CardText>
                                <CardActions>
                                    <FlatButton fullWidth={true} rippleColor="white" style={styleDrawer.drawer} backgroundColor="#64DD17" label="Seleccionar" primary={true} onTouchTap={this.handleClick}/>
                                </CardActions>
                            </Card>
                        </Fuente>
                    </MuiThemeProvider>
                    <br />
                </div>
            );
        }else{
            return(
                <div>
                    <MuiThemeProvider>
                        <Fuente>
                            <Card>
                                <CardHeader
                                    actAsExpander={true}
                                    showExpandableButton={true}
                                    style={cardColor.card}
                                    subtitle={this.props.EstadoDesc}
                                >
                                    <List>
                                        <ListItem
                                            disabled={true}
                                            leftAvatar={
                                                <Avatar src={this.props.urlImagen} size={50}/>
                                            }
                                        >
                                            {this.props.Nombre.replace(/\b\w/g, l => l.toUpperCase())}<br/>

                                        </ListItem>
                                    </List>
                                </CardHeader>

                                <CardText style={cardColor.card} expandable={true}>
                                    Marca moto: {this.props.marcaVehiculo} <br/>
                                    Modelo: {this.props.modelo} <br/>
                                    Placa: {this.props.placa}
                                </CardText>
                            </Card>
                        </Fuente>
                    </MuiThemeProvider>
                    <br />
                </div>
            );
        }

    }
}

function mapStateToProps(state) {
    return {
        lanzar: state.lanzar
    }
}

export default connect(mapStateToProps)(Mensajero);

const Fuente = Styled.form`
  font-weight: bold;
  font-family: 'Quicksand';
`;

const styleDrawer = {
    drawer:{
        color:'white',
    }
}

const cardColor = {
    card:{
        backgroundColor:'#F1F8E9'
    }
}

const Title = Styled.h5`
  font-weight: bold;
  font-family: 'Quicksand';
  text-align:center;
`;