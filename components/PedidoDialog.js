import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
    radioButton: {
        marginTop: 16,
    },
};

const customContentStyle = {
    width: '100%',
    maxWidth: 'none',
};

class PedidoDialog extends Component{
    constructor(props){
        super(props);
    }

    async componentWillReceiveProps() {
        this.props.dispatch({
            type:'SET_LOADING_STATUS',
            payload:{
                visible:'hide'
            }
        });
    }

    async componentWillUnmount(){
        this.props.dispatch({
            type:'SET_PEDIDODIALOG',
            payload:{
                lanzar:false
            }
        });
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.props.dispatch({
            type:'SET_PEDIDODIALOG',
            payload:{
                lanzar:false
            }
        });
    };

    render(){
        const actions = [
            <FlatButton
                label="Cancelar"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Enviar"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleClose}
            />,
        ];

        const radios = [];
        for (let i = 0; i < 2; i++) {
            radios.push(
                <RadioButton
                    key={i}
                    value={`value${i + 1}`}
                    label={`Opcion ${i + 1}`}
                    style={styles.radioButton}
                />
            );
        }

        return(
            <MuiThemeProvider>
                <div>
                    <Dialog
                        title="Nuevo domicilio"
                        actions={actions}
                        modal={false}
                        open={this.props.lanzar}
                        onRequestClose={this.handleClose}
                        autoScrollBodyContent={true}
                        contentStyle={customContentStyle}
                    >
                        Aquí se pedirá toda la información para enviar la nueva solictud de domicilio.
                        <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
                            {radios}
                        </RadioButtonGroup>
                    </Dialog>
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

