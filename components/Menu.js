import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import Avatar from './Avatar';
import Divider from 'material-ui/Divider';
import Styled from 'styled-components';
import Router from 'next/router';


class Menu extends Component{
    constructor(props){
        super(props);
    }


    render(){
        return(
            <MuiThemeProvider>
                <Title>
                    <Drawer
                        docked={false}
                        width={250}
                        open={this.props.open}
                        containerStyle={styleDrawer.drawer}
                    >
                        <Avatar/>
                        <Divider/>
                        <MenuItem onTouchTap={this.handleCloseUno}>Nuevo domicilio</MenuItem>
                        <MenuItem onTouchTap={this.handleClose}>Domicilio en curso</MenuItem>
                        <MenuItem onTouchTap={this.handleClose}>Calificar mensajero</MenuItem>
                        <MenuItem onTouchTap={this.handleClose}>Personal disponible</MenuItem>
                        <Divider/>
                        <MenuItem onTouchTap={this.handleClose}>Mis direcciones</MenuItem>
                        <MenuItem onTouchTap={this.handleClose}>Cerrar</MenuItem>
                    </Drawer>
                </Title>
            </MuiThemeProvider>
        );
    }

    handleCloseUno = event => {
        this.props.dispatch({
            type: 'DRAWER_OPEN',
            payload: {
                open: false
            }
        });

        this.props.dispatch({
            type:'SET_LOADING_STATUS',
            payload:{
                visible:'loading'
            }
        });

        sessionStorage.setItem("estado",1);
        Router.push(`/`);
    }

    handleClose = event => {
        this.props.dispatch({
            type: 'DRAWER_OPEN',
            payload: {
                open: false
            }
        });
    }
}

function mapStateToProps(state) {
    return {
        open: state.open
    }
}

export default connect(mapStateToProps)(Menu);

const styleDrawer = {
    drawer:{
        backgroundColor: '#D9D3D1',
        zIndex: '9999'
    }
}

const Title = Styled.form`
  display: flex;
  font-weight: bold;
  font-family: 'Quicksand';
  color: white;
`;

