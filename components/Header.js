import React, {Component} from 'react';
import AppBar from './AppBarr';
import Drawer from './Menu';
import Styled from 'styled-components';

class Header extends  Component{
    render(){
        return(
            <div>
            <AppBar/>
                <Drawer/>
            </div>
        );
    }
}
export default  Header;