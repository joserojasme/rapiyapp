import React, {Component} from 'react';
import Styled from 'styled-components';

class Footer extends  Component{
    render(){
        return(
            <FooterStyle>
                Desarrollado por <a href="https://www.facebook.com/jose.m.rojas.395" target="_blank">Jose Manuel Rojas</a> 2017
            </FooterStyle>
        );
    }
}

const FooterStyle = Styled.div`
    color:white
    position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  background-color: #111;
  text-align: center;
  font-weight: bold;
  font-family: 'Quicksand';
  font-size: 12px;
`;

export default Footer;