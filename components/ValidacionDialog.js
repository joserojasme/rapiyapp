import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Styled from 'styled-components';
import Router from 'next/router';

class validacionDialog extends React.Component {

    async componentWillUnmount(){
        this.props.dispatch({
            type:'VALIDACION_DIALOG',
            payload:{
                validacionerror:false
            }
        });

        this.props.dispatch({
            type:'SET_LOADING_STATUS',
            payload:{
                visible:'hide'
            }
        });
    }

    handleClose = () => {
        this.props.dispatch({
            type:'VALIDACION_DIALOG',
            payload:{
                validacionerror:false
            }
        });
    };

    render() {
        const actions = [
            <FlatButton
                label="Cerrar"
                primary={true}
                onTouchTap={this.handleClose}
                style={styleDialog.Boton}
            />
        ];

        return (
            <MuiThemeProvider>
                <div>
                    <Dialog
                        actions={actions}
                        modal={false}
                        open={this.props.validacionerror}
                        onRequestClose={this.handleClose}
                    >
                        <Fuente>
                            {this.props.descripcion}
                        </Fuente>
                    </Dialog>
                </div>
            </MuiThemeProvider>
        );
    }
}

function mapStateToProps(state) {
    return {
        validacionerror: state.validacionerror
    }
}

export default  connect(mapStateToProps)(validacionDialog);

const Fuente = Styled.h5`
  font-weight: bold;
  font-family: 'Quicksand';
  text-align:center;
`;

const styleDialog = {
    Boton:{
        fontFamily:'Quicksand',
        fontWeight:'bold'
    }
}