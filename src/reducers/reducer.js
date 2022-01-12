const reducer = (state, action)=>{
    switch (action.type) {
        case 'WEATHER_DATA':
            return{
                ...state
            }
        case 'CHANGE_COORDINATES':
            return{
                ...state,
                coordinates:{...state.coordinates}
            }
            
        default:
            return state
    }
}

export default reducer