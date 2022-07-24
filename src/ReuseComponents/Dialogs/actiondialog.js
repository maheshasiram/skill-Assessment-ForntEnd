import { Types } from "../../constants/Types"


export const AlertDialog=(data)=>{
    return (dispatch) => {
        dispatch({
            type: Types.ON_OPEN_ALERT_DIALOG,
            payload: {
                ...data,
                header: 'Alert',
                open: true
            }
        })
    }
}

export const ConfirmDialog=(data)=>{
    return (dispatch) => {
        dispatch({
            type: Types.ON_OPEN_ALERT_DIALOG,
            payload: {
                ...data,
                header: 'Confirm',
                open: true
            }
        })
    }
}


export const onLoader=(payload)=>{
return(dispatch)=>{
    dispatch({type: Types.ON_SET_LOADER, payload });
}
}