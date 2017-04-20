import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Router from 'next/router';
import Styled from 'styled-components';

class Mensajeria extends Component{
    constructor(props){
        super(props);
    }

    handleClick = event =>{
        this.props.dispatch({
            type:'SET_LOADING_STATUS',
            payload:{
                visible:'loading'
            }
        });

        sessionStorage.setItem("idMensajeria", this.props.id);
        sessionStorage.setItem("estado", 2);
        Router.push(`/`);
    };

    render(){
        return(
            <div>
                <Title>Seleccione una mensajería</Title>
                <MuiThemeProvider>
                    <Fuente>
                    <Card>
                        <CardHeader
                            actAsExpander={true}
                            showExpandableButton={true}
                            style={cardColor.card}
                        >
                            <List>
                                <ListItem
                                    disabled={true}
                                    leftAvatar={
                                        <Avatar src={this.props.urlImagen} size={50}/>
                                    }
                                >
                                    {this.props.nombre.replace(/\b\w/g, l => l.toUpperCase())}<br/>

                                </ListItem>
                            </List>
                        </CardHeader>
                        <CardText style={cardColor.card} expandable={true}>
                            Direccion: {this.props.direccion} <br/>
                            Telefonos: {this.props.telefono1} <br/>
                            Horario: {this.props.horario}
                        </CardText>
                        <CardActions>
                            <FlatButton fullWidth={true} rippleColor="white" style={styleDrawer.drawer} backgroundColor="#64DD17" label="Seleccionar" secondary={true} onTouchTap={this.handleClick}/>
                        </CardActions>
                    </Card>
                    </Fuente>
                </MuiThemeProvider>
                <br />
            </div>
        );
    }
}

export default connect(null)(Mensajeria);

const Fuente = Styled.form`
  font-weight: bold;
  font-family: 'Quicksand';
  background-color:'#E8F5E9';
`;

const styleDrawer = {
    drawer:{
        color:'white'
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