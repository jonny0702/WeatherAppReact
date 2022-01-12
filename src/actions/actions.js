export const changeCoordinates = (payload)=>{
    {
        type: 'CHANGE_COORDINATES',
        payload
    }
}
export async function fetchCoordinates (dispach) {
    await dispach({type: 'CHANGE_COORDINATES', payload})
}
