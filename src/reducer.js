import { Types } from "./constants/Types"
import jwtDecode from "jwt-decode";

const initialState = {
    health: null,
    login: null,
    decodedtoken: null,
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {

        case Types.HEALTH:
            //console.log("reducer.health", action.payload);
            return { ...state, health: action.payload }

        case Types.LOGIN:
           // console.log("...reducer.login", jwtDecode(action.payload.data.token))
            return { ...state, login: action.payload, decodedtoken: jwtDecode(action.payload.data.token) }

        default:
            return state;
    }
}