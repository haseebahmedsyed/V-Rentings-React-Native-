import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    INIT_LOCATION,
    INIT_DATE,
    CHECK_USER_REQUEST,
    CHECK_USER_SUCCESS,
    CHECK_USER_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    GET_ME_REQUEST,
    GET_ME_SUCCESS,
    GET_ME_RESET,
    ERROR_RESET,
} from '../constants/accountConstants'

export const initLocation = (state = {}, action) => {
    switch (action.type) {
        case INIT_LOCATION:
            console.log(action.payload)
            return {
                ...state,
                location: { latitude: action.payload.latitude, longitude: action.payload.longitude },
            }

        case INIT_DATE:
            return {
                ...state,
                date: {
                    startDate:action.payload.startDate,
                    endDate: action.payload.endDate
                }
            }

        default:
            return { ...state }
    }
}

export const loginReducer = (state = { loading:false,user: {}, success: false,rents:[],cars:[],isGet:false }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false
            }
        case LOGIN_SUCCESS:
            console.log("cars------",)
            return {
                loading: false,
                error: null,
                success: true,
                user: action.payload.user,
                cars:action.payload.user.cars,
                rents:action.payload.user.rents
            }
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            }

        case LOGOUT_REQUEST:
            return{
                ...state,
                loading: true
            }
        case LOGOUT_SUCCESS:
            return{
                loading: false,
                success:false,
                user:{},
                error:null,
                isLoggedOut:true,
                cars:[],
                rents:[]
            }
        case GET_ME_REQUEST:
            return{
                ...state,
                isGet:false
            }
        case GET_ME_SUCCESS:
            return{
                ...state,
                user: action.payload.user,
                cars:action.payload.user.cars,
                rents:action.payload.user.rents,
                isGet:true
            }
        case GET_ME_RESET:
            return{
                ...state,
                isGet:false
            }
        case LOGOUT_FAIL:
            return{
                ...state,
                loading: false,
                error:action.payload,
                isLoggedOut:false
            }
        case ERROR_RESET:
            return{
                ...state,
                error:null
            }
        default:
            return { ...state }
    }

}

export const isUserExist = (state = {}, action) => {
    switch (action.type) {
        case CHECK_USER_REQUEST:
            return {
                loading: true,
                error: null,
            }
        case CHECK_USER_SUCCESS:
            return {
                loading: false,
                error: null,
                found: action.payload
            }
        case CHECK_USER_FAIL:
            return {
                loading: false,
                error: action.payload,
                ...state
            }
        case ERROR_RESET:
            return{
                ...state,
                error:null
            }
        default:
            return { ...state }
    }
}