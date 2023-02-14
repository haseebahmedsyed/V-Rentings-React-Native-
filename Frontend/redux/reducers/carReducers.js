import {
    GET_CARS_REQUEST,
    GET_CARS_SUCCESS,
    GET_CARS_FAIL
} from '../constants/carConstants'

export const getCarReducer = (state={success:false}, action) => {
    switch (action.type) {
        case GET_CARS_REQUEST:
            return {
                ...state,
                success:false,
                loading:true,
                error:null,
                
            }
        case GET_CARS_SUCCESS:
            return {
                ...state,
                loading:false,
                success:true,
                error:null,
                cars:action.payload
            }
        case GET_CARS_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
                success:false
            }

        default:
            return {...state}
    }

}