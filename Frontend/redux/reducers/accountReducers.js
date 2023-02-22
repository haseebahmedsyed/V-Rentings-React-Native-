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
} from '../constants/accountConstants'

export const initLocation = (state = {}, action) => {
    switch (action.type) {
        case INIT_LOCATION:
            console.log(action.payload)
            return {
                location: { latitude: action.payload.latitude, longitude: action.payload.longitude },
                ...state
            }

        case INIT_DATE:
            return {
                date: action.payload,
                ...state
            }
            return {
                location: action.payload
            }

        default:
            return { ...state }
    }
}

export const loginReducer = (state = { loading:false,user: {}, success: false,rents:[],cars:[] }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false
            }
        case LOGIN_SUCCESS:
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
        case 'GET_ME':
            return{
                ...state,
                user: action.payload.user,
                cars:action.payload.user.cars,
                rents:action.payload.user.rents
            }
        case LOGOUT_FAIL:
            return{
                ...state,
                loading: false,
                error:action.payload,
                isLoggedOut:false
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

        default:
            return { ...state }
    }
}