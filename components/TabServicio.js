import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import TimePicker from 'material-ui/TimePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import fetch from 'isomorphic-fetch';
import {Table, TableHeader, TableHeaderColumn, TableRow, TableBody,TableRowColumn} from 'material-ui/Table';
import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux';
import Router from 'next/router';
import ValidacionError from '../components/ValidacionDialog'
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';


 class TabServicio extends Component {
     constructor(props) {
         super(props);
         this.state = {
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
         }
         this.handleChanDir = this.handleChangeDirecciones.bind(this);
     }

     async componentDidMount(){
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
            console.log(event, date)
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
             this.props.dispatch({
                 type:'VALIDACION_DIALOG',
                 payload:{
                     validacionerror:true
                 }
             });

             this.props.dispatch({
                 type:'SET_ERROR_MESSAGE',
                 payload:{
                     errorMessage:'El campo artículo y cantidad son obligatorios'
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
         Router.push(`/`);
     };

     handleRequestDelete = () => {
         this.props.dispatch({
             type:'SET_LOADING_STATUS',
             payload:{
                 visible:'loading'
             }
         });
         sessionStorage.setItem("estado", 2);
         Router.push(`/`);
     }

     async insertarSolicitud() {
         const URL = `http://vmr.tarrao.co/data/insertarSolicitud`;
         const response = await fetch(URL,{
             method:'POST',
             body: JSON.stringify(this.state.Solicitud),
         })
         const data = await response.json();
     }

    render() {
        return (
            <div>
                <div style={styles.wrapper}>
                    <Chip
                        onRequestDelete={this.handleRequestDelete}
                        onClick={this.handleRequestDelete}
                        style={styles.chip}
                    >
                        <Avatar src={sessionStorage.getItem("urlImagenMensajero")} />
                        <FuenteChip> {sessionStorage.getItem("nombreMensajeria") + ' - ' + sessionStorage.getItem("nombreMensajero")}</FuenteChip>
                    </Chip>
                </div>

                <Fuente>
                    Seleccione un tipo de servicio
                </Fuente>
                {this.props.validacionerror &&
                <div>
                    <ValidacionError descripcion={this.props.errorMessage}/>
                </div>
                }
            <Tabs
                value={this.state.value}
                onChange={this.handleChangeTab}
            >
                <Tab style={styles.tab} label="Ven a casa" value="a">
                    <div>
                        <h5 style={styles.headline2}>En este servicio el mensajero se dirige a tu casa y desde allá le indicas sus tareas</h5>
                        <h6 style={styles.headline}>Dirección del servicio</h6>
                        <SelectField style={styles.Direccion} value={this.state.valueDirecciones} onChange={this.handleChanDir} fullWidth={true}>
                            {this.state.itemDirecciones}
                        </SelectField>
                        <h6 style={styles.headline}>¿Quieres programar tu domicilio para más tarde?</h6>
                        <TimePicker
                            format="ampm"
                            hintText="Seleccione una hora del servicio"
                            value={this.state.value12}
                            onChange={this.handleChangeTimePicker12}
                            style={styles.TimePicker}
                            cancelLabel="Cancelar"
                        />
                    </div>
                    <ButtonEnviar onClick={this.handleClickEnviar}>Enviar solicitud</ButtonEnviar>
                </Tab>
                <Tab style={styles.tabD} label="Domicilio" value="b">
                    <div>
                        <h5 style={styles.headline2}>Indica que necesitas que te lleven a casa</h5>
                        <h4 style={styles.headline}>Direccion del servicio</h4>
                        <SelectField style={styles.Direccion} value={this.state.valueDirecciones} onChange={this.handleChanDir} fullWidth={true}>
                            {this.state.itemDirecciones}
                        </SelectField>
                        <h4 style={styles.headline}>Agrega los artículos a comprar</h4>

                        <Form onSubmit={this.handleSubmitBotonAgregar} autoComplete="off">
                        <Input
                            name="articulo"
                            type="text"
                            placeholder="**Artículo"
                        />
                        <Input
                            name="cantidad"
                            type="text"
                            placeholder="**Cantidad"
                        />
                        <Input
                            name="dondeComprar"
                            type="text"
                            placeholder="Donde comprar"
                        />
                            <div>
                                <ButtonAgregar>Agregar artículo</ButtonAgregar>
                            </div>
                        </Form>
                        <h4 style={styles.headline}>Lista de artículos</h4>
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
                        <h6 style={styles.headline}>¿Quieres programar tu domicilio para más tarde?</h6>
                        <TimePicker
                            format="ampm"
                            hintText="Seleccione una hora del servicio"
                            value={this.state.value12}
                            onChange={this.handleChangeTimePicker12}
                            style={styles.TimePicker}
                            cancelLabel="Cancelar"

                        />
                    </div>
                    <ButtonEnviar onClick={this.handleClickEnviar}>Enviar solicitud</ButtonEnviar>
                </Tab>
            </Tabs>

            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        visible: state.visible,
        validacionerror: state.validacionerror,
        errorMessage: state.errorMessage,
    }
}

export default connect(mapStateToProps)(TabServicio);

const styles = {
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

const FuenteChip = styled.h6`
  font-family: 'Quicksand';
  text-align:center;
`;

const Fuente = styled.h5`
  font-weight: bold;
  font-family: 'Quicksand';
  text-align:center;
`;

const DefaultStyles = `
  outline: 0;
  border: none;
  border-radius: 4px;
`;

const Form = styled.form`
  display: flex;
  font-weight: bold;
  font-family: 'Quicksand';
  @media (max-width: 1024px) {
    flex-direction: column
  }
`;

const Input = styled.input`
  flex: 1;
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  ${DefaultStyles}
  @media (max-width: 1024px) {
    margin-right: 0;
  }
`;

const ButtonAgregar = styled.button`
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

const ButtonEnviar = styled.button`
  ${DefaultStyles}
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
/*
 <FlatButton
 label="Cancelar solicitud"
 primary={true}
 onTouchTap={this.handleClose}
 style={styles.Boton}
 />
 */