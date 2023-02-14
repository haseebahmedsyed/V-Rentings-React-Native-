import {
    PRICE,
    SIZE,
    TRANSMISSION,
    SORT_BY_PRICE,
    SORT_BY_DISTANCE,
    SORT_BY_RATING,
    CLEAR_ALL_FILTERS,
    CLEAR_ALL_SORTS
} from '../constants/filterConstants'

export const filterReducer = (state={price:'',size:'',transmission:''}, action) => {
    switch (action.type) {
        case PRICE:
            return {
                ...state,
                price : action.payload
                
            }
        case SIZE:
            return {
                ...state,
                size:action.payload
            }
        case TRANSMISSION:
            return {
                ...state,
                transmission:action.payload
            }
        case CLEAR_ALL_FILTERS:
            return{
                ...state,
                price:'',
                size:'',
                transmission:''
            }

        default:
            return {...state}
    }

}

export const sortReducer = (state={sortPrice:false,sortDistance:false,sortRating:false}, action) => {
    switch (action.type) {
        case SORT_BY_PRICE:
            return {
                sortDistance:false,
                sortPrice : true,
                sortRating:false
                
            }
        case SORT_BY_DISTANCE:
            return {
                sortDistance:true,
                sortPrice : false,
                sortRating:false
            }
        case SORT_BY_RATING:
            return {
                sortDistance:false,
                sortPrice : false,
                sortRating:true
            }
        case CLEAR_ALL_SORTS:
            return{
                sortDistance:false,
                sortPrice : false,
                sortRating:false
            }

        default:
            return {...state}
    }

}