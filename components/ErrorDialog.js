import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Styled from 'styled-components';
import Router from 'next/router';

class ErrorDialog extends React.Component {

    async componentWillUnmount(){
        this.props.dispatch({
            type:'ERROR_DIALOG',
            payload:{
                error:false
            }
        });

        this.props.dispatch({
            type:'SET_LOADING_STATUS',
            payload:{
                visible:'hide'
            }
        });

        Router.push(`/`);
    }

    handleClose = () => {
        this.props.dispatch({
            type:'ERROR_DIALOG',
            payload:{
                error:false
            }
        });
        Router.push(`/`);
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
                    open={this.props.error}
                    onRequestClose={this.handleClose}
                >
                    <Fuente>
                        {this.props.errorMessage}
                    </Fuente>
                </Dialog>
            </div>
            </MuiThemeProvider>
        );
    }
}

function mapStateToProps(state) {
    return {
        error: state.error,
        errorMessage: state.errorMessage
    }
}

export default  connect(mapStateToProps)(ErrorDialog);

const Fuente = Styled.h5`
  font-weight: bold;
  font-family: 'Quicksand';
  text-align:center;
`;

const styleDialog = {
    Boton:{
        fontFamily:'Quicksand',
        fontWeight:'bold',
        zIndex:'100'
    }
}