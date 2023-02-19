import {
    GET_CARS_REQUEST,
    GET_CARS_SUCCESS,
    GET_CARS_FAIL,
    GET_CAR_REQUEST,
    GET_CAR_SUCCESS,
    GET_CAR_FAIL,
    ADD_CAR_REQUEST,
    ADD_CAR_SUCCESS,
    ADD_CAR_FAIL,
    ADD_CAR_RESET,
    EDIT_CAR_REQUEST,
    EDIT_CAR_SUCCESS,
    EDIT_CAR_FAIL,
    EDIT_CAR_RESET
} from '../constants/carConstants'

export const getCarReducer = (state = { success: false }, action) => {
    switch (action.type) {
        case GET_CARS_REQUEST:
            return {
                ...state,
                success: false,
                loading: true,
                error: null,

            }
        case GET_CARS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                cars: action.payload
            }
        case GET_CARS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            }

        default:
            return { ...state }
    }

}

export const getCar = (state = { car: {} }, action) => {
    switch (action.type) {
        case GET_CAR_REQUEST:
            return {
                loading: true,
                success: false,
                error: null,
                car: {}
            }
        case GET_CAR_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                car: action.payload
            }
        case GET_CAR_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
                car: {}
            }
        default:
            return {
                ...state
            }
    }
}

export const addCar = (state = { success:false,loading:false}, action) => {
    switch (action.type) {
        case ADD_CAR_REQUEST:
            return {
                loading: true,
                success: false,
                error: null
            }
        case ADD_CAR_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload
            }
        case ADD_CAR_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload
            }
        case ADD_CAR_RESET:
            return{
                ...state,
                loading:false,
                success:false,
            }
        default:
            return {
                ...state
            }
    }
}
export const editCar = (state = { success:false,loading:false}, action) => {
    switch (action.type) {
        case EDIT_CAR_REQUEST:
            return {
                loading: true,
                success: false,
                error: null
            }
        case EDIT_CAR_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload
            }
        case EDIT_CAR_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload
            }
        case EDIT_CAR_RESET:
            return{
                ...state,
                loading:false,
                success:false,
            }
        default:
            return {
                ...state
            }
    }
}
