import { Types } from "./constants/Types"
import jwtDecode from "jwt-decode";


const initialState = {
    health: null,
    login: null,
    decodedtoken: null,
    isLoginLoading: false,
    userDetails: null,
    createUser: null,
    usersParams: {page: 1, pageSize: 10, search: '', sortBy: '', orderBy: ''}
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {

        case Types.HEALTH:
            console.log("reducer.health", action.payload);
            return { ...state, health: action.payload }

        case Types.LOGIN:
             //console.log("...reducer.login", action.payload.data)
            return { ...state, login: action.payload, decodedtoken: action.payload.data && jwtDecode(action.payload.data.token) }

        case Types.IS_LOGIN_LOADING:
            console.log("......reducer.isLoading", action.payload)
            return { ...state, isLoginLoading: action.payload }

            case Types.GET_USERS:
                console.log("......users-reducer", action.payload)
                return{ ...state, userDetails: action.payload}

                case Types.CREATE_USER:
                    return{ ...state, createUser: action.payload}

        default:
            return state;
    }
}