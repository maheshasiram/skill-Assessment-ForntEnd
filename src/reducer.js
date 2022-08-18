import { Types } from "./constants/Types"
import jwtDecode from "jwt-decode";

const initialState = {
    health: null,
    login: null,
    decodedtoken: null,
    isLoginLoading: false,
    userDetails: null,
    createUser: null,
    usersParams: { page: 1, pageSize: 5, search: '', sortBy: '', orderBy: '' },
    lazyParams: { first: 0, page: 0, rows: 5, sortField: null, sortOrder: null },
    UserRoles: null,
    isLoader: false,
    deleteUser: null,
    restoreUser: null,
    modal: {
        header: '',
        status: 0,
        open: false,
        message: "",
        onok: () => { },
        onCancel: () => { },
    },
    allCategories: null,
    categoryParams: { page: 1, pageSize: 5, search: '', sortBy: '', orderBy: '' },
    createCategory: null,
    deleteCategory: null,
    updatedCategory: null,
    getAllQuestions: null,
}
export const reducer = (state = initialState, action) => {
    switch (action.type) {

        case Types.HEALTH:
            //console.log("reducer.health", action.payload);
            return { ...state, health: action.payload }

        case Types.LOGIN:
            //console.log("...reducer.login", action.payload.data)
            return { ...state, login: action.payload, decodedtoken: action.payload.data && jwtDecode(action.payload.data.token) }

        case Types.IS_LOGIN_LOADING:
            // console.log("......reducer.isLoading", action.payload)
            return { ...state, isLoginLoading: action.payload }

        case Types.GET_USERS:
            //console.log("......users-reducer", action.payload)
            return { ...state, userDetails: action.payload }

        case Types.USER_PARAMS:
            return { ...state, usersParams: action.payload }

        case Types.CREATE_USER:
            return { ...state, createUser: action.payload }

        case Types.GET_USER_ROLES:
            return { ...state, UserRoles: action.payload }

        case Types.ON_OPEN_ALERT_DIALOG:
            return { ...state, modal: action.payload }

        case Types.ON_CLOSE_ALERT_DIALOG:
            return { ...state, modal: action.payload }

        case Types.ON_SET_LOADER:
            return { ...state, isLoader: action.payload }

        case Types.ON_SORT_FIELD:
            return { ...state, lazyParams: action.payload }

        case Types.DELETE_USER:
            return { ...state, deleteUser: action.payload }

        case Types.RESTORE_USER:
            return { ...state, restoreUser: action.payload }

        case Types.GET_ALL_CATEGORIES:
            return { ...state, allCategories: action.payload }

        case Types.CATEGORY_PARAMS:
            return { ...state, categoryParams: action.payload }

        case Types.CREATE_CATEGORY:
            return { ...state, createCategory: action.payload }

        case Types.DELETE_CATEGORY:
            return { ...state, deleteCategory: action.payload }

        case Types.UPDATE_CATEGORY:
            return { ...state, updatedCategory: action.payload }

            case Types.GET_ALL_QUESTIONS:
        return{...state, getAllQuestions: action.payload}

        default:
            return state;
    }
}



