import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import styled from 'styled-components';
import Header from '../components/Header';
import withRedux from 'next-redux-wrapper';
import { createStore } from 'redux';
import reducer from '../reducers/reducers';
import Footer from '../components/Footer';
import Cargando from '../components/Loading';
import fetch from 'isomorphic-fetch';
import Mensajero from '../components/Mensajero';
import Mensajeria from '../components/Mensajeria';
import PedidoDialog from '../components/PedidoDialog';

const data = {
    loading: true,
    open: false,
    cargaMensajeria:true,
    cargaMensajero:true,
    visible:'loading',
    bienvenida:true,
    lanzar:false
};

const makeStore = function(initialState = data){
    return createStore(reducer,initialState);
}




class Home extends Component{
    constructor(props){
        super(props);
        try {injectTapEventPlugin()}catch (e){};
        this.state = {
            loading: true,
            data: [],
            open:false,
            cargaMensajeria:true,
            cargaMensajero:true,
            visible:'loading',
            bienvenida:true,
            lanzar:false
        };

    }

    static async getInitialProps(){
        return {};
    }

    async componentDidMount() {
        this.setState({bienvenida: false});
        this.props.dispatch({
            type:'SET_LOADING_STATUS',
            payload:{
                visible:'hide'
            }
        });
    }

    async componentWillReceiveProps({query})
    {
        if(sessionStorage.getItem("estado") == 1){
            const URL = `//vmr.tarrao.co/data/getMensajeria`;
            const response = await fetch(URL);
            const data = await response.json();
            this.setState({data: data,
                            bienvenida:true,
                            cargaMensajeria:false,
                            cargaMensajero:true
            });
            this.props.dispatch({
                type:'SET_LOADING_STATUS',
                payload:{
                    visible:'hide'
                }
            });
        }else
        {
            if(sessionStorage.getItem("estado")  == 2){
                const URL = `//vmr.tarrao.co/data/getMensajero/${sessionStorage.getItem("idMensajeria")}`;
                const response = await fetch(URL);
                const data = await response.json();
                this.setState({data: data,
                                bienvenida:true,
                                cargaMensajeria:true,
                                cargaMensajero:false
                });
                this.props.dispatch({
                    type:'SET_LOADING_STATUS',
                    payload:{
                        visible:'hide'
                    }
                });
            }
        }



    }

    render(){
        return(
            <div>
                <Wrapper>
                    <Header />
                </Wrapper>
                <Content>
                    <Spinner>
                    <Cargando/>
                    </Spinner>

                    {!this.state.bienvenida &&
                        <Bienvenida>
                            Bienvenido a RapiYApp. La manera fácil de pedir tus domicilios.
                        </Bienvenida>
                    }

                    {!this.state.cargaMensajeria &&
                    <ul>{this.state.data.Mensajerias.map(
                        mensajeria => {
                            return (
                                <Mensajeria key={mensajeria.id} {...mensajeria}/>
                            );
                        }
                    )}
                    </ul>
                    }

                    {!this.state.cargaMensajero &&
                    <ul>{this.state.data.Mensajeros.map(
                        mensajero => {
                            return (
                                <Mensajero key={mensajero.id} {...mensajero}/>
                            );
                        }
                    )}
                    </ul>
                    }


                </Content>
                <Footer/>
            </div>

        );
    }
}

export default withRedux(makeStore)(Home);


const Wrapper = styled.div`
 position: fixed;
 /*bottom: 0;*/
 left: 0;
 right: 0;
 top: 0;
 z-index: 1;
`;

const Bienvenida = styled.div`
    background-repeat: no-repeat;
    background-position: center center;
    font
    background-size: 50% auto;
    width: 100px;
    text-align: center;
    position: absolute;
    height:500px;
    width:100%;
    height:400px;
    box-shadow: 0 0 15px 0;
    background: #64DD17;
  font-weight: bold;
  font-family: 'Quicksand';
  font-size: 20px;
  display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
`;

const Content = styled.div`
 overflow: auto;
 margin-top:64px;
 padding-top: 2px;
 height: calc(100vh - 74px);
 position:relative;
 /*border: 1px solid gray;*/
`;

const Spinner = styled.div`
 position: absolute;
 left: calc(50% - 50px);
 top: 50%;
 padding: 0;
 text-align: center;
`




