import React, {Component} from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import styled from 'styled-components';
import Logo from '../components/Logo';

class AppBarr extends Component{

    constructor(props){
        super(props);
    }

    handleToggle = event =>{
        this.props.dispatch({
           type:'DRAWER_OPEN',
            payload:{
               open:true
            }
        });
    }

    render(){
        return(
            <MuiThemeProvider>
                    <AppBar
                        title={<Logo/>}
                        onLeftIconButtonTouchTap={this.handleToggle}
                        showMenuIconButton={true}
                        style={AppBarStyle.AppBar}
                    />
            </MuiThemeProvider>
        );
    }
}

const Title = styled.form`
  display: flex;
  font-weight: bold;
  font-family: 'Quicksand';
`;

const AppBarStyle = {
    AppBar:{
        backgroundColor: '#011528',
    }
}

export default connect(null)(AppBarr);