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
        case 'VALORES_PEDIDODIALOG':
            return {...state, valores: action.payload.valores};
            break;
        default: return state;
    }

}
export default reducer;