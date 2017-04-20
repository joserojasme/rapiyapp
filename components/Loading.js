import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {connect} from 'react-redux';


class Loading extends  Component{

    constructor(props){
        super(props);
    }
    /*<CircularProgress size={64} thickness={5} /> style={style.refresh}*/
    render(){
        return(
            <MuiThemeProvider>
                <div>
                    <RefreshIndicator
                        size={50}
                        left={10}
                        top={0}
                        status={this.props.visible}
                        style={style.container}
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}

function mapStateToProps(state) {
    return {
        visible: state.visible
    }
}

export default connect(mapStateToProps)(Loading);



const style = {
    container: {
        position: 'absolute',
    },

};