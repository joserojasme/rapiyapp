import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import styled from 'styled-components';
import withRedux from 'next-redux-wrapper';
import { createStore } from 'redux';
import reducer from '../reducers/reducers';
import Footer from '../components/Footer';
import Cargando from '../components/Loading';
import fetch from 'isomorphic-fetch';
import Styled from 'styled-components';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Router from 'next/router';
import ErroDialog from '../components/ErrorDialog';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Avatar from '../components/Avatar';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Logo from '../components/Logo';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import AvatarMaterial from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import ValidacionError from '../components/ValidacionDialog'
//TabServicio
import {Tabs, Tab} from 'material-ui/Tabs';
import TimePicker from 'material-ui/TimePicker';
import SelectField from 'material-ui/SelectField';
import {Table, TableHeader, TableHeaderColumn, TableRow, TableBody,TableRowColumn} from 'material-ui/Table';
import Chip from 'material-ui/Chip';

const data = {
    loading: true,
    open: false,
    cargaMensajeria:true,
    cargaMensajero:true,
    visible:'loading',
    bienvenida:true,
    lanzar:true,
    error:false,
    errorMessage:'',
    validacionerror:false,
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
            lanzar:true,
            error:false,
            errorMessage:'',
            validacionerror:false,
            value: 'a',
            value24: null,
            value12: null,
            valueProgramada: '',
            valueDirecciones: 1,
            dataDirecciones: [],
            itemDirecciones: [],
            itemLista: [],
            valueArticulo: '',
            valueCantidad: '',
            Solicitud:{Encabezados:[], Detalles:[]}
        };
        this.handleChanDir = this.handleChangeDirecciones.bind(this);
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

        sessionStorage.setItem("idUsuario",1);
    }

    handleClickFlotante = (event) =>{
        sessionStorage.setItem("estado",1);
        event.preventDefault();
        this.props.dispatch({
            type:'SET_LOADING_STATUS',
            payload:{
                visible:'loading'
            }
        });
        this.proceso()
    };

    async proceso(){
        this.state.data = ""
        if(sessionStorage.getItem("estado") == 1){
            console.log("entro por el 1")
            const URL = `http://vmr.tarrao.co/data/getMensajeria`;
            const response = await fetch(URL);
            if(response.status != 200){
                this.props.dispatch({
                    type:'ERROR_DIALOG',
                    payload:{
                        error:true
                    }
                });
                this.props.dispatch({
                    type:'SET_ERROR_MESSAGE',
                    payload:{
                        errorMessage:':( Por favor intenta de nuevo más tarde...'
                    }
                });
                this.props.dispatch({
                    type:'SET_LOADING_STATUS',
                    payload:{
                        visible:'hide'
                    }
                });
                return;
            }
            const data = await response.json();
            this.setState({data: data,
                bienvenida:true,
                cargaMensajeria:false,
                cargaMensajero:true,
                lanzar:true
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
                console.log("entro por el 2")
                const URL = `//vmr.tarrao.co/data/getMensajero/${sessionStorage.getItem("idMensajeria")}`;
                const response = await fetch(URL);

                if(response.status != 200){
                    this.props.dispatch({
                        type:'ERROR_DIALOG',
                        payload:{
                            error:true
                        }
                    });
                    this.props.dispatch({
                        type:'SET_ERROR_MESSAGE',
                        payload:{
                            errorMessage:':( Por favor intenta de nuevo más tarde...'
                        }
                    });
                    this.props.dispatch({
                        type:'SET_LOADING_STATUS',
                        payload:{
                            visible:'hide'
                        }
                    });
                    return;
                }
                const data = await response.json();
                this.setState({data: data,
                    bienvenida:true,
                    cargaMensajeria:true,
                    cargaMensajero:false,
                    lanzar:true
                });

                this.props.dispatch({
                    type:'SET_LOADING_STATUS',
                    payload:{
                        visible:'hide'
                    }
                });
            }else{
                if(sessionStorage.getItem("estado")  == 3){
                    console.log("entro por el 3")
                    this.setState({bienvenida:true,
                        cargaMensajeria:true,
                        cargaMensajero:true,
                        lanzar:false
                    });
                    this.props.dispatch({
                        type:'SET_LOADING_STATUS',
                        payload:{
                            visible:'hide'
                        }
                    });
                    this.direccionUsuario();
                }
            }
        }
    }

    //Drawer y appBar
    handleCloseDrawer = (open,reason) => {
        this.setState({open:open})
    }

    handleCloseMenuDrawer = (open,reason) => {
        this.setState({open:false})
        this.props.dispatch({
            type:'SET_LOADING_STATUS',
            payload:{
                visible:'loading'
            }
        });
        sessionStorage.setItem("estado",1);
        this.proceso()
    }

    handleToggleAppBar = event =>{
        this.setState({open:true})
    }

    //Mensajeria
    handleClickMensajeria = (event) =>{
        event.preventDefault();
        this.props.dispatch({
            type:'SET_LOADING_STATUS',
            payload:{
                visible:'loading'
            }
        });
        const form = event.target;
        let nombreMensajeria = ''
        sessionStorage.setItem("idMensajeria", form.elements.id.value);
        this.state.data.Mensajerias.map(
            mensajeria =>{
                if(mensajeria.id === form.elements.id.value){
                    nombreMensajeria = mensajeria.nombre;
                    return;
                }
            }
        )
        sessionStorage.setItem("nombreMensajeria", nombreMensajeria);
        sessionStorage.setItem("estado", 2);
        this.proceso();
    };

    //Mensajero

    async validarEstadoMensajero(idMensajero,nombreMensajero, urlImgMensajero) {
        const URL = `//vmr.tarrao.co/data/getEstadoMensajero/${idMensajero}`;
        const response = await fetch(URL);
        if(response.status != 200){
            this.props.dispatch({
                type:'ERROR_DIALOG',
                payload:{
                    error:true
                }
            });
            this.props.dispatch({
                type:'SET_ERROR_MESSAGE',
                payload:{
                    errorMessage:':( Por favor intenta de nuevo más tarde...'
                }
            });
            this.props.dispatch({
                type:'SET_LOADING_STATUS',
                payload:{
                    visible:'hide'
                }
            });
            return;
        }

        const data = await response.json();
        if((data.Mensajero.map(mensajero=>mensajero.idEstado)) == "3"){
            this.props.dispatch({
                type:'SET_ERROR_MESSAGE',
                payload:{
                    errorMessage:'Lo sentimos, parace que alguien se adelantó y ya escogió este mensajero llegando al límite de solicitudes al tiempo.'
                }
            });
            this.props.dispatch({
                type:'ERROR_DIALOG',
                payload:{
                    error:true
                }
            });
            this.props.dispatch({
                type:'SET_LOADING_STATUS',
                payload:{
                    visible:'hide'
                }
            });
        }else{
            if(this.state.error == false)
            {
                sessionStorage.setItem("idMensajero", idMensajero);
                sessionStorage.setItem("nombreMensajero", nombreMensajero);
                sessionStorage.setItem("urlImagenMensajero", urlImgMensajero);
                sessionStorage.setItem("estado", 3);
                this.proceso()

            }
        }
    }

    handleClickMensajero = event =>{
        event.preventDefault();
        this.props.dispatch({
            type:'SET_LOADING_STATUS',
            payload:{
                visible:'loading'
            }
        });

        const form = event.target;
        this.setState({value:'a'})
        this.state.itemLista = [];
        let nombreMensajero = '';
        let urlImagenMensajero = '';
        this.state.data.Mensajeros.map(
            mensajero =>{
                if(mensajero.id == form.elements.id.value){
                    nombreMensajero = mensajero.Nombre;
                    urlImagenMensajero = mensajero.urlImagen;
                    return;
                }
            }
        )
        this.validarEstadoMensajero(form.elements.id.value,nombreMensajero, urlImagenMensajero);
    };

    //TabService
    async direccionUsuario(){
        this.props.dispatch({
            type:'SET_LOADING_STATUS',
            payload:{
                visible:'loading'
            }
        });
        let idUsuario = sessionStorage.getItem("idUsuario");
        const URL = `//vmr.tarrao.co/data/getDirecciones/${idUsuario}`;
        const response = await fetch(URL);
        const data = await response.json();
        this.setState({dataDirecciones:data, itemDirecciones:[]});
        this.items();
    }

    items(){
        this.state.dataDirecciones.Direccion.map(
            direccion =>{
                this.state.itemDirecciones.push(<MenuItem key={direccion.id}  value={direccion.id} label={direccion.nombre + ' - ' + direccion.direccionCompleta} primaryText={direccion.nombre + ' - ' + direccion.direccionCompleta} />);
                this.setState({valueDirecciones:direccion.id});
            }
        )
        this.props.dispatch({
            type:'SET_LOADING_STATUS',
            payload:{
                visible:'hide'
            }
        });
    }

    handleChangeTab = (value) => {
        this.setState({
            value: value,
        });
    };

    handleChangeTimePicker12 = (event, date) => {
        this.setState({value12: date});
        var hora = date.getHours();
        var minutos = date.getMinutes();
        if(hora<10){hora='0'+hora}
        if(minutos<10){minutos='0'+minutos}
        this.setState({valueProgramada:hora+':'+minutos})
    };

    handleChangeDirecciones = (event, index, value) =>{
        this.setState({valueDirecciones:value});
        console.log("Direccion", value)
    }

    handleSubmitBotonAgregar = (event) => {
        event.preventDefault();
        const form = event.target;
        if(form.elements.articulo.value == "" || form.elements.cantidad.value == "")
        {
            this.setState({errorMessage:'Los campos artículo y cantidad son obligatorios'})
            this.props.dispatch({
                type:'VALIDACION_DIALOG',
                payload:{
                    validacionerror:true
                }
            });

            return;
        }
        const newKey = this.state.itemLista.length + 1;
        const row = {id: newKey,
            articulo:form.elements.articulo.value,
            cantidad:form.elements.cantidad.value,
            dondeComprar:form.elements.dondeComprar.value}
        const newItemLista = this.state.itemLista;
        newItemLista.push(row);
        this.setState({ itemLista: newItemLista });
        form.elements.articulo.value = ""
        form.elements.cantidad.value = ""
        form.elements.dondeComprar.value = ""
    }

    handleSubmitLista = (event, value) =>{
    };

    handleClickEnviar = (event) =>{
        let dataEncabezado = "";
        let dataDetalle = "";
        let idUsuario = sessionStorage.getItem("idUsuario")
        let idMensajero =  sessionStorage.getItem("idMensajero")
        let idMensajeria = sessionStorage.getItem("idMensajeria")

        if(this.state.value == "b")
        {
            dataEncabezado = [{"idUsuario":idUsuario,"idMensajero":idMensajero,"idMensajeria":idMensajeria, "tipoDomicilio":"Domicilio", "idDireccion":this.state.valueDirecciones,"horaProgramada":this.state.valueProgramada}]
            this.state.Solicitud.Encabezados = dataEncabezado
            this.state.itemLista.map(
                item=>{
                    dataDetalle = {"articulo":item.articulo,"cantidad":item.cantidad,"lugarCompra":item.dondeComprar}
                    this.state.Solicitud.Detalles.push(dataDetalle)
                }
            )

        }else{
            dataEncabezado = [{"idUsuario":idUsuario,"idMensajero":idMensajero,"idMensajeria":idMensajeria, "tipoDomicilio":"Ven a casa", "idDireccion":this.state.valueDirecciones,"horaProgramada":this.state.valueProgramada}]
            this.state.Solicitud.Encabezados = dataEncabezado
            this.state.Solicitud.Detalles = []
        }

        this.insertarSolicitud()
    };

    handleClose = () => {
        sessionStorage.setItem("estado", 2);
        this.proceso()
    };

    handleRequestDelete = () => {
        this.props.dispatch({
            type:'SET_LOADING_STATUS',
            payload:{
                visible:'loading'
            }
        });
        sessionStorage.setItem("estado", 2);
        this.proceso()
    }

    async insertarSolicitud() {
        const URL = `http://vmr.tarrao.co/data/insertarSolicitud`;
        const response = await fetch(URL,{
            method:'POST',
            body: JSON.stringify(this.state.Solicitud),
        })
        const data = await response.json();
    }

    render(){
        return(
            <div>
                <Wrapper>
                    <MuiThemeProvider>
                        <AppBar
                            title={<Logo/>}
                            onLeftIconButtonTouchTap={this.handleToggleAppBar}
                            showMenuIconButton={true}
                            style={style.AppBar}
                        />
                    </MuiThemeProvider>
                    {this.state.open &&
                        <MuiThemeProvider>
                            <TitleDrawer>
                                <Drawer
                                    docked={false}
                                    width={250}
                                    open={this.state.open}
                                    onRequestChange={this.handleCloseDrawer}
                                    containerStyle={style.draw}
                                >
                                    <Avatar/>
                                    <Divider/>

                                    <MenuItem onTouchTap={this.handleCloseMenuDrawer}>Nuevo domicilio</MenuItem>
                                    <MenuItem onTouchTap={this.handleCloseMenuDrawer}>Domicilio en curso</MenuItem>
                                    <MenuItem onTouchTap={this.handleCloseMenuDrawer}>Calificar mensajero</MenuItem>
                                    <MenuItem onTouchTap={this.handleCloseMenuDrawer}>Personal disponible</MenuItem>
                                    <Divider/>
                                    <MenuItem onTouchTap={this.handleCloseMenuDrawer}>Mis direcciones</MenuItem>
                                    <MenuItem onTouchTap={this.handleCloseMenuDrawer}>Cerrar</MenuItem>

                                </Drawer>
                            </TitleDrawer>
                        </MuiThemeProvider>
                    }
                </Wrapper>
                <Content>
                    <Spinner>
                    <Cargando/>
                    </Spinner>

                    {!this.state.bienvenida &&
                        <Bienvenida>
                            Bienvenido a venAcasa. La manera fácil de pedir tus domicilios.
                            <Footer/>
                            <MuiThemeProvider>
                                <FloatingActionButton style={style.flotante} onTouchTap={this.handleClickFlotante}>
                                    <ContentAdd  />
                                </FloatingActionButton>
                            </MuiThemeProvider>
                        </Bienvenida>
                    }

                    {!this.state.cargaMensajeria &&
                    <ul><Title>Seleccione una mensajería</Title>{this.state.data.Mensajerias.map(
                        mensajeria => {
                            return (
                                <MuiThemeProvider>
                                    <FuenteMensajeria onSubmit={this.handleClickMensajeria}>
                                        <Card>
                                            <input type="text" name="id" value={mensajeria.id}  style={{display:'none'}} />
                                            <CardHeader
                                                actAsExpander={true}
                                                showExpandableButton={true}
                                                style={style.card}
                                            >
                                                <List>
                                                    <ListItem
                                                        key={mensajeria.id}
                                                        disabled={true}
                                                        leftAvatar={
                                                            <AvatarMaterial src={mensajeria.urlImagen} size={50}/>
                                                        }
                                                    >
                                                         {mensajeria.nombre.replace(/\b\w/g, l => l.toUpperCase())}<br/>

                                                    </ListItem>
                                                </List>
                                            </CardHeader>
                                            <CardText style={style.cardMensajeria} expandable={true}>
                                                Direccion: {mensajeria.direccion} <br/>
                                                Telefonos: {mensajeria.telefono1} <br/>
                                                Horario: {mensajeria.horario}

                                            </CardText>
                                            <CardActions>
                                                <ButtonSeleccionar>Seleccionar</ButtonSeleccionar>
                                            </CardActions>
                                        </Card>
                                    </FuenteMensajeria>
                                </MuiThemeProvider>
                            );
                        }
                    )}
                    </ul>
                    }

                    {!this.state.cargaMensajero &&
                    <ul><Title>Seleccione un mensajero</Title><Limite>Limite de pendientes: 3</Limite>{this.state.data.Mensajeros.map(
                        mensajero => {
                            return (
                                <MuiThemeProvider>
                                    <FuenteMensajeria onSubmit={this.handleClickMensajero}>
                                        <Card>
                                            <input type="text" name="id" value={mensajero.id}  style={{display:'none'}} />
                                            <CardHeader
                                                actAsExpander={true}
                                                showExpandableButton={true}
                                                style={style.cardMensajeria}
                                                subtitle={mensajero.EstadoDesc + ' - Pendientes: '+ mensajero.EnCola}
                                            >
                                                <List>
                                                    <ListItem
                                                        key={mensajero.id}
                                                        disabled={true}
                                                        leftAvatar={
                                                            <AvatarMaterial src={mensajero.urlImagen} size={50}/>
                                                        }
                                                    >
                                                        {mensajero.Nombre.replace(/\b\w/g, l => l.toUpperCase())}<br/>

                                                    </ListItem>
                                                </List>
                                            </CardHeader>
                                            <CardText style={style.cardMensajeria} expandable={true}>
                                                Marca moto: {mensajero.marcaVehiculo} <br/>
                                                Modelo: {mensajero.modelo} <br/>
                                                Placa: {mensajero.placa}
                                            </CardText>
                                            <CardActions>
                                                <ButtonSeleccionar>Seleccionar</ButtonSeleccionar>
                                            </CardActions>
                                        </Card>
                                    </FuenteMensajeria>
                                </MuiThemeProvider>
                            );
                        }
                    )}
                    </ul>
                    }

                    <MuiThemeProvider>
                        <FloatingActionButton style={style.flotante} onTouchTap={this.handleClickFlotante}>
                            <ContentAdd />
                        </FloatingActionButton>
                    </MuiThemeProvider>

                    {!this.state.validacionerror &&
                    <div>
                        <ValidacionError descripcion={this.state.errorMessage}/>
                    </div>
                    }

                    {!this.state.lanzar &&
                            <MuiThemeProvider>
                                <div>
                                    <div style={style.wrapper}>
                                        <Chip
                                            onRequestDelete={this.handleRequestDelete}
                                            onClick={this.handleRequestDelete}
                                            style={style.chip}
                                        >
                                            <AvatarMaterial src={sessionStorage.getItem("urlImagenMensajero")} />
                                            <FuenteChipTabServicio> {sessionStorage.getItem("nombreMensajeria") + ' - ' + sessionStorage.getItem("nombreMensajero")}</FuenteChipTabServicio>
                                        </Chip>
                                    </div>

                                    <FuenteTabServicio>
                                        Seleccione un tipo de servicio
                                    </FuenteTabServicio>
                                    <Tabs
                                        value={this.state.value}
                                        onChange={this.handleChangeTab}
                                    >
                                        <Tab style={style.tab} label="Ven a casa" value="a">
                                            <div>
                                                <h5 style={style.headline2}>En este servicio el mensajero se dirige a tu casa y desde allá le indicas sus tareas</h5>
                                                <h6 style={style.headline}>Dirección del servicio</h6>
                                                <SelectField style={style.Direccion} value={this.state.valueDirecciones} onChange={this.handleChanDir} fullWidth={true}>
                                                    {this.state.itemDirecciones}
                                                </SelectField>
                                                <h6 style={style.headline}>¿Quieres programar tu domicilio para más tarde?</h6>
                                                <TimePicker
                                                    format="ampm"
                                                    hintText="Seleccione una hora del servicio"
                                                    value={this.state.value12}
                                                    onChange={this.handleChangeTimePicker12}
                                                    style={style.TimePicker}
                                                    cancelLabel="Cancelar"
                                                />
                                            </div>
                                            <ButtonEnviarTabServicio onClick={this.handleClickEnviar}>Enviar solicitud</ButtonEnviarTabServicio>
                                        </Tab>
                                        <Tab style={style.tabD} label="Domicilio" value="b">
                                            <div>
                                                <h5 style={style.headline2}>Indica que necesitas que te lleven a casa</h5>
                                                <h4 style={style.headline}>Direccion del servicio</h4>
                                                <SelectField style={style.Direccion} value={this.state.valueDirecciones} onChange={this.handleChanDir} fullWidth={true}>
                                                    {this.state.itemDirecciones}
                                                </SelectField>
                                                <h4 style={style.headline}>Agrega los artículos a comprar</h4>

                                                <FormTabServicio onSubmit={this.handleSubmitBotonAgregar} autoComplete="off">
                                                    <InputTabServicio
                                                        name="articulo"
                                                        type="text"
                                                        placeholder="**Artículo"
                                                    />
                                                    <InputTabServicio
                                                        name="cantidad"
                                                        type="text"
                                                        placeholder="**Cantidad"
                                                    />
                                                    <InputTabServicio
                                                        name="dondeComprar"
                                                        type="text"
                                                        placeholder="Donde comprar"
                                                    />
                                                    <div>
                                                        <ButtonAgregarTabServicio>Agregar artículo</ButtonAgregarTabServicio>
                                                    </div>
                                                </FormTabServicio>
                                                <h4 style={style.headline}>Lista de artículos</h4>
                                                <Table fixedHeader={true} onCellClick={this.handleSubmitLista}>
                                                    <TableHeader displaySelectAll={false}
                                                                 adjustForCheckbox={false}>
                                                        <TableRow>
                                                            <TableHeaderColumn>Artículo</TableHeaderColumn>
                                                            <TableHeaderColumn>Cant.</TableHeaderColumn>
                                                            <TableHeaderColumn>Lugar</TableHeaderColumn>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody  displayRowCheckbox={false} stripedRows={true} >
                                                        {this.state.itemLista.map(
                                                            item => {
                                                                return(
                                                                    <TableRow key={item.id}>
                                                                        <TableRowColumn>{item.articulo}</TableRowColumn>
                                                                        <TableRowColumn>{item.cantidad}</TableRowColumn>
                                                                        <TableRowColumn>{item.dondeComprar}</TableRowColumn>
                                                                    </TableRow>)
                                                            }
                                                        )
                                                        }
                                                    </TableBody>
                                                </Table>
                                                <h6 style={style.headline}>¿Quieres programar tu domicilio para más tarde?</h6>
                                                <TimePicker
                                                    format="ampm"
                                                    hintText="Seleccione una hora del servicio"
                                                    value={this.state.value12}
                                                    onChange={this.handleChangeTimePicker12}
                                                    style={style.TimePicker}
                                                    cancelLabel="Cancelar"

                                                />
                                            </div>
                                            <ButtonEnviarTabServicio onClick={this.handleClickEnviar}>Enviar solicitud</ButtonEnviarTabServicio>
                                        </Tab>
                                    </Tabs>

                                </div>
                            </MuiThemeProvider>
                    }

                    {!this.state.error &&
                    <div>
                        <ErroDialog descripcion={this.props.errorMessage}/>
                    </div>
                    }


                </Content>
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

const Title = Styled.h5`
  font-weight: bold;
  font-family: 'Quicksand';
  text-align:center;
`;

const Limite = Styled.h6`
  font-family: 'Quicksand';
  text-align:center;
`;

const TitleDrawer = Styled.form`
  display: flex;
  font-weight: bold;
  font-family: 'Quicksand';
  color: white;
`;

const FuenteMensajeria = Styled.form`
  font-weight: bold;
  font-family: 'Quicksand';
  background-color:'#E8F5E9';
`;


const DefaultStyles = `
  outline: 0;
  border: none;
  border-radius: 4px;
`;

const ButtonSeleccionar = styled.button`
  ${DefaultStyles}
  background: #009688;
  padding: 0.5rem 20px;
  text-transform: uppercase;
  font-weight: bold;
  color: white;
  box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.3);
  font-size: 1rem;
  font-family: 'Quicksand';
  @media (max-width: 1024px) {
    margin-top: 1rem;
  }
`;

//Tab Servicio
const FuenteChipTabServicio = styled.h6`
  font-family: 'Quicksand';
  text-align:center;
`;

const FuenteTabServicio = styled.h5`
  font-weight: bold;
  font-family: 'Quicksand';
  text-align:center;
`;

const DefaultStylesTabServicio = `
  outline: 0;
  border: none;
  border-radius: 4px;
`;

const FormTabServicio = styled.form`
  display: flex;
  font-weight: bold;
  font-family: 'Quicksand';
  @media (max-width: 1024px) {
    flex-direction: column
  }
`;

const InputTabServicio = styled.input`
  flex: 1;
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  ${DefaultStyles}
  @media (max-width: 1024px) {
    margin-right: 0;
  }
`;

const ButtonAgregarTabServicio = styled.button`
  ${DefaultStylesTabServicio}
  background: #009688;
  padding: 0.5rem 20px;
  text-transform: uppercase;
  font-weight: bold;
  color: white;
  box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.3);
  font-size: 1rem;
  font-family: 'Quicksand';
  @media (max-width: 1024px) {
    margin-top: 1rem;
  }
`;

const ButtonEnviarTabServicio = styled.button`
  ${DefaultStylesTabServicio}
  background: #009688;
  padding: 0.5rem 20px;
  text-transform: uppercase;
  font-weight: bold;
  color: white;
  box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.3);
  font-size: 1rem;
  font-family: 'Quicksand';
  margin-bottom:5rem;
  @media (max-width: 1024px) {
    margin-top: 1rem;
  }
`;
const style = {

    flotante:{
    position: 'fixed',
    bottom: 20,
    right:30,
    },
    AppBar:{
        backgroundColor: '#011528',
        zIndex:'100'
    },
    draw:{
        backgroundColor: '#D9D3D1',
        zIndex: '1000000'
    },
    cardMensajeria:{
        backgroundColor:'#F1F8E9'
    },
    BotonMensajeria:{
        color:'white',
        zIndex: '0'
    },
    Boton:{
        fontFamily:'Quicksand',
        fontWeight:'bold',
        textAlign:'left',
        marginTop:'20',
    },
    headline: {
        fontSize: 12,
        paddingTop: 2,
        marginBottom: 2,
        fontWeight: 400,
        fontFamily:'Quicksand',
        fontWeight:'bold',
        color:'#00BCD4',
        textAlign:'center'
    },
    headline2: {
        fontSize: 12,
        paddingTop: 2,
        marginBottom: 2,
        fontWeight: 400,
        fontFamily:'Quicksand',
        fontWeight:'bold',
        textAlign:'center'
    },
    tab:{
        backgroundColor:'#64DD17',
        zIndex:'0'
    },
    tabD:{
        backgroundColor:'#009688',
        zIndex:'0'
    },
    TimePicker: {
        backgroundColor:'#E8F5E9',
        zIndex:'0'
    },
    Direccion: {
        backgroundColor:'#E8F5E9',
        zIndex:'0'
    },
    chip: {
        marginLeft: 'auto',
        marginRight:'auto',
        marginTop:10,
        zIndex:'0'

    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

function llamar(id) {
    var exampleArray =  JSLINQ(this.state.data)
        .Where(function(item){ return item.id == from.elements.id.value; })
        .Select(function(item){ return item.nombre; });
    cosole.log(exampleArray)
}
