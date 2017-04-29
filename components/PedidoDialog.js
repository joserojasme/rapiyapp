import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Styled from 'styled-components';
import Router from 'next/router';
import TabServicio from '../components/TabServicio';


const customContentStyle = {
    width: '100%',
    maxWidth: 'none',
    maxHeight: '20%',
    textAlign:'center'
};

class PedidoDialog extends Component{
    constructor(props){
        super(props);
    }

    async cambiarEstadoMensajero(idEstado, idMensajero) {
        Router.push(`/`);
        /*const URL = `//vmr.tarrao.co/data/updateEstadoMensajero/${idEstado}/${idMensajero}`;
        const response = await fetch(URL);
        if(response.status == 200){
            Router.push(`/`);
        }else{
            this.props.dispatch({
                type:'ERROR_DIALOG',
                payload:{
                    error:true
                }
            });
        }*/
    }

    async componentWillReceiveProps() {
        this.props.dispatch({
            type:'SET_LOADING_STATUS',
            payload:{
                visible:'loading'
            }
        });
    }

    async componentWillUnmount(){
        this.cambiarEstadoMensajero(1,sessionStorage.getItem("idMensajero"));
        this.props.dispatch({
            type:'SET_PEDIDODIALOG',
            payload:{
                lanzar:false
            }
        });

        this.props.dispatch({
            type:'SET_LOADING_STATUS',
            payload:{
                visible:'loading'
            }
        });
    }

    handleClose = () => {
        this.props.dispatch({
            type:'SET_PEDIDODIALOG',
            payload:{
                lanzar:false
            }
        });
        this.cambiarEstadoMensajero(1,sessionStorage.getItem("idMensajero"));
    };


    render(){
        const actions = [
            <FlatButton
                label="Cancelar"
                primary={true}
                onTouchTap={this.handleClose}
                style={styleDialog.Boton}
            />,
            /*<FlatButton
                label="Enviar"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleSubmit}
                style={styleDialog.Boton}
            />,*/
        ];
        return(
            <MuiThemeProvider>
                <div>
                        <Fuente>
                        Seleccione un tipo de servicio
                        </Fuente>
                        <TabServicio/>
                    <FlatButton
                        label="Cancelar solicitud"
                        primary={true}
                        onTouchTap={this.handleClose}
                        style={styleDialog.Boton}
                    />

                </div>
            </MuiThemeProvider>
        );
    }
}

function mapStateToProps(state) {
    return {
        lanzar: state.lanzar,
        valores: state.valores
    }
}

export default connect(mapStateToProps)(PedidoDialog);

const Fuente = Styled.h5`
  font-weight: bold;
  font-family: 'Quicksand';
  text-align:center;
`;

const styleDialog = {
    Boton:{
        fontFamily:'Quicksand',
        fontWeight:'bold',
        textAlign:'left'
    },
    Title:{
        zIndex:'0',
        fontFamily:'Quicksand',
        fontWeight:'bold',
        color:'#64DD17'
    }
}
