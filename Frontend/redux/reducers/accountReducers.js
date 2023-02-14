import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    INIT_LOCATION,
    INIT_DATE
} from '../constants/accountConstants'

export const initLocation =(state={},action)=>{
    switch(action.type){
        case INIT_LOCATION:
            console.log(action.payload)
            return{
                location:{latitude:action.payload.latitude,longitude:action.payload.longitude},
                ...state
            }
            
        case INIT_DATE:
            return{
                date:action.payload,
                ...state
            }
            return{
                location:action.payload
            }

        default:
            return {...state}
    }
}

export const loginReducer = (state={user:{},success:false}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                loading:true,
                error:null,
                success:false,
                ...state
            }
        case LOGIN_SUCCESS:
            return {
                loading:false,
                error:null,
                success:true,
                user:action.payload
            }
        case LOGIN_FAIL:
            // console.log(action.payload)
            return {
                loading:false,
                error:action.payload,
                success:false,
                ...state
            }

        default:
            return {...state}
    }

}