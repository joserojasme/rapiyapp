function reducer(state, action){
    switch (action.type){
        case 'SET_LOADING':
            return {...state, loading: action.payload.loading};
            break;
        case 'SET_LOADING_STATUS':
            return {...state, visible: action.payload.visible};
            break;
        case 'DRAWER_OPEN':
            return {...state, open: action.payload.open};
            break;
        case 'SET_MENSAJERIA':
            return {...state, cargaMensajeria: action.payload.cargaMensajeria};
            break;
        case 'SET_MENSAJERO':
            return {...state, cargaMensajero: action.payload.cargaMensajero};
            break;
        case 'SET_BIENVENIDA':
            return {...state, bienvenida: action.payload.bienvenida};
            break;
        case 'SET_PEDIDODIALOG':
            return {...state, lanzar: action.payload.lanzar};
            break;
        case 'ERROR_DIALOG':
            return {...state, error: action.payload.error};
            break;
        case 'SET_ERROR_MESSAGE':
            return {...state, errorMessage: action.payload.errorMessage};
            break;
        case 'VALIDACION_DIALOG':
            return {...state, validacionerror: action.payload.validacionerror};
            break;
        case 'SET_DATOS_VARIOS':
            return {...state, estado: action.payload.validacionerror};
            break;
        default: return state;
    }

}
export default reducer;