import {
    GET_CARS_REQUEST,
    GET_CARS_SUCCESS,
    GET_CARS_FAIL
} from '../constants/carConstants'
import Client from '../Client'
import store from '../store'

export const getCars=()=>async(dispatch)=>{
    let loc = store.getState().initLocation.location
    let dates = store.getState().initLocation.date
    let sortPrice = store.getState().sortReducer.sortPrice
    let sortDistance = store.getState().sortReducer.sortDistance
    let sortRating = store.getState().sortReducer.sortRating
    let transmission = store.getState().filterReducer.transmission
    let size = store.getState().filterReducer.size
    let price = store.getState().filterReducer.price
    try {
        dispatch({
            type: GET_CARS_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }

        const { data } = await Client.get(`/api/car/getCars?latitude=24.930799&longitude=67.198929&sortDistance=${sortDistance}&sortRating=${sortRating}&sortPrice=${sortPrice}&transmission=${transmission}&size=${size}&startPrice=${price}&endPrice=${price=='100' ? '200' : price =='300' ? '400' :'1000'}`, dates , config)
        // const { data } = await Client.get(`/api/car/getCars?latitude=${loc.latitude}&longitude=${loc.longitude}`, dates , config)

        dispatch({
            type: GET_CARS_SUCCESS,
            payload: data.cars
        })

    } catch (error) {
        dispatch({
            type: GET_CARS_FAIL,
            payload: error.response.data.message
        })
    }
}