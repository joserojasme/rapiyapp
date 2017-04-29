import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Styled from 'styled-components';
import ErroDialog from '../components/ErrorDialog';
import ValidacionError from '../components/ValidacionDialog'
import Router from 'next/router';

class Mensajero extends Component{
    constructor(props, context){
        super(props, context);
    }

    async validarEstadoMensajero(idMensajero) {
        const URL = `//vmr.tarrao.co/data/getEstadoMensajero/${idMensajero}`;
        const response = await fetch(URL);
        if(response.status != 200){
            this.props.dispatch({
                type:'ERROR_DIALOG',
                payload:{
                    error:true
                }
            });
            this.props.dispatch({
                type:'SET_ERROR_MESSAGE',
                payload:{
                    errorMessage:':( Por favor intenta de nuevo más tarde...'
                }
            });
            return;
        }

        const data = await response.json();
        if((data.Mensajero.map(mensajero=>mensajero.idEstado)) == "3"){
            this.props.dispatch({
                type:'SET_ERROR_MESSAGE',
                payload:{
                    errorMessage:'Lo sentimos, parace que alguien se adelantó y ya escogió este mensajero llegando al límite de solicitudes al tiempo.'
                }
            });
            this.props.dispatch({
                type:'ERROR_DIALOG',
                payload:{
                    error:true
                }
            });
        }else{
            if(this.props.error == false)
            {
                sessionStorage.setItem("idMensajero", this.props.id);
                sessionStorage.setItem("nombreMensajero", this.props.Nombre);
                sessionStorage.setItem("urlImagenMensajero", this.props.urlImagen);
                sessionStorage.setItem("estado", 3);
                Router.push(`/`);

                /*if(this.props.Nombre == "Mensajero aleatorio"){
                    sessionStorage.setItem("idMensajero", this.props.id);
                    sessionStorage.setItem("nombreMensajero", this.props.Nombre);
                    this.props.dispatch({
                        type:'SET_PEDIDODIALOG',
                        payload:{
                            lanzar:true
                        }
                    });
                }else{
                    this.cambiarEstadoMensajero(12,this.props.id);
                }*/
            }
        }
    }

    async cambiarEstadoMensajero(idEstado, idMensajero) {
        const URL = `//vmr.tarrao.co/data/updateEstadoMensajero/${idEstado}/${idMensajero}`;

        const response = await fetch(URL);
        if(response.status == 200){
            sessionStorage.setItem("idMensajero", this.props.id);
            sessionStorage.setItem("nombreMensajero", this.props.Nombre);
            this.props.dispatch({
                type:'SET_PEDIDODIALOG',
                payload:{
                    lanzar:true
                }
            });
        }else{
            this.props.dispatch({
                type:'SET_ERROR_MESSAGE',
                payload:{
                    errorMessage:'Ha ocurrido un problema. Estamos trabajando en esto. Por favor intente más tarde.'
                }
            });
            this.props.dispatch({
                type:'ERROR_DIALOG',
                payload:{
                    error:true
                }
            });
        }
    }

    handleClick = event =>{
        this.props.dispatch({
            type:'SET_LOADING_STATUS',
            payload:{
                visible:'loading'
            }
        });
        this.validarEstadoMensajero(this.props.id);
    };

    render(){
        if(this.props.EnCola < 3){
            return(
                <div>
                    {this.props.error &&
                    <div>
                        <ErroDialog descripcion={this.props.errorMessage}/>
                    </div>
                    }

                    {this.props.validacionerror &&
                    <div>
                        <ValidacionError descripcion={this.props.errorMessage}/>
                    </div>
                    }

                    <MuiThemeProvider>
                        <Fuente>
                            <Card>
                                <CardHeader
                                    actAsExpander={true}
                                    showExpandableButton={true}
                                    style={cardColor.card}
                                    subtitle={this.props.EstadoDesc + ' - Pendientes: '+ this.props.EnCola}
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
                                    <FlatButton  rippleColor="white" style={styleDrawer.Boton} backgroundColor="#009688" label="Seleccionar" primary={true} onTouchTap={this.handleClick}/>
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
                                    subtitle={this.props.EstadoDesc  + ' - Pendientes: '+ this.props.EnCola}
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
        lanzar: state.lanzar,
        error: state.error,
        errorMessage: state.errorMessage,
        validacionerror: state.validacionerror,
    }
}

export default connect(mapStateToProps)(Mensajero);

const Fuente = Styled.form`
  font-weight: bold;
  font-family: 'Quicksand';
`;

const styleDrawer = {
    Boton:{
        color:'white',
        zIndex: '0'
    }
}

const cardColor = {
    card:{
        backgroundColor:'#F1F8E9'
    }
}
