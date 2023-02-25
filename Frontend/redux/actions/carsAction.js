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
    EDIT_CAR_REQUEST,
    EDIT_CAR_SUCCESS,
    EDIT_CAR_FAIL,
    DELETE_CAR_REQUEST,
    DELETE_CAR_SUCCESS,
    DELETE_CAR_FAIL,
    BOOK_CAR_REQUEST,
    BOOK_CAR_SUCCESS,
    BOOK_CAR_FAIL,
    UPLOAD_CAR_PIC_REQUEST,
    UPLOAD_CAR_PIC_SUCCESS,
    UPLOAD_CAR_PIC_FAIL,
    UPLOAD_CAR_PIC_RESET
} from '../constants/carConstants'
import Client from '../Client'
import store from '../store'

export const uploadCarImage = (formData, id) => async (dispatch) => {
    try {
        dispatch({
            type: UPLOAD_CAR_PIC_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }

        const { data } = await Client.post(`/api/image/upload/${id}`, formData, config)

        dispatch({
            type: UPLOAD_CAR_PIC_SUCCESS,
            payload: data.success
        })

    }
    catch (error) {
        dispatch({
            type: UPLOAD_CAR_PIC_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getCars = () => async (dispatch) => {
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

        // const { data } = await Client.get(`/api/car/getCars?latitude=24.930799&longitude=67.198929&sortDistance=${sortDistance}&sortRating=${sortRating}&sortPrice=${sortPrice}&transmission=${transmission}&size=${size}&startPrice=${price}&endPrice=${price=='100' ? '200' : price =='300' ? '400' :'1000'}`, dates , config)
        console.log("hiii i am date",dates)
        const { data } = await Client.get(`/api/car/getCars?latitude=${loc.latitude}&longitude=${loc.longitude}&sortDistance=${sortDistance}&sortRating=${sortRating}&sortPrice=${sortPrice}&transmission=${transmission}&size=${size}&startPrice=${price}&endPrice=${price == '100' ? '200' : price == '300' ? '400' : '1000'}&startDate=${dates.startDate}&endDate=${dates.endDate}`, {
            startDate:dates.startDate,
            endDate:dates.endDate
        }, config)

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

export const getCar = (carID) => async (dispatch) => {
    try {
        dispatch({
            type: GET_CAR_REQUEST
        })
        const { data } = await Client.get(`/api/car/getCar/${carID}`)
        dispatch({
            type: GET_CAR_SUCCESS,
            payload: data.car
        })

    } catch (error) {
        dispatch({
            type: GET_CAR_FAIL,
            payload: error.response.data.message
        })
    }
}

export const addCar = (body) => async (dispatch) => {
    try {
        dispatch({
            type: ADD_CAR_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }

        const { data } = await Client.post('/api/car/create', body, config)
        dispatch({
            type: ADD_CAR_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: ADD_CAR_FAIL,
            payload: error.response.data.message
        })
    }
}

export const calculateRent = () => {
    let date = store.getState().initLocation.date
    let one_day = 1000 * 60 * 60 * 24;
    let difference_ms = Number(date.endDate) - Number(date.startDate);
    let days = Math.round(difference_ms / one_day);
    return days;
}

export const editCar = (id, body) => async (dispatch) => {
    try {
        dispatch({
            type: EDIT_CAR_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const { data } = await Client.put(`/api/car/updateCar/${id}`, body, config)

        dispatch({
            type: EDIT_CAR_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: EDIT_CAR_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteCar = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_CAR_REQUEST
        })

        const { data } = await Client.delete(`/api/car/deleteCar/${id}`)

        dispatch({
            type: DELETE_CAR_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_CAR_FAIL,
            payload: error.response.data.message
        })
    }
}

export const bookCar = (id) => async (dispatch) => {
    let dates = store.getState().initLocation.date
    try {
        dispatch({
            type: BOOK_CAR_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }

        const { data } = await Client.post(`/api/car/book/${id}`, { startDate: dates.startDate, endDate: dates.endDate }, config)

        dispatch({
            type: BOOK_CAR_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: BOOK_CAR_FAIL,
            payload: error.response.data.message
        })
    }
}