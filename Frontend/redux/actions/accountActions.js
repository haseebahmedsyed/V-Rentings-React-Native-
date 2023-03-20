import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CHECK_USER_REQUEST,
    CHECK_USER_SUCCESS,
    CHECK_USER_FAIL,
    GET_ME_REQUEST,
    GET_ME_SUCCESS,
    GET_ME_RESET,
} from '../constants/accountConstants'
import Client from '../Client'


export const logOut = () => async (dispatch) => {
    try {
        dispatch({
            type: LOGOUT_REQUEST
        })

        await Client.post('/api/user/logout')

        dispatch({
            type: LOGOUT_SUCCESS
        })
    } catch (error) {

        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })

    }
}

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }

        const { data } = await Client.post('/api/user/login', { email, password }, config)
        {console.log(data)}
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log("Main error hoon",error.response.data)
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

export const checkEmail = (email) => async (dispatch) => {
    try {
        dispatch({
            type: CHECK_USER_REQUEST
        })

        const config = {
            withCredentials: true
        }

        const { data } = await Client.get(`/api/user/checkEmail/${email}`, config)

        dispatch({
            type: CHECK_USER_SUCCESS,
            payload: data.found
        })

    } catch (error) {
        dispatch({
            type: CHECK_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getMe=()=>async(dispatch)=>{
    dispatch({
        type: GET_ME_REQUEST
    })
    const {data} = await Client.get('/api/user/getMe',{withCredentials:true});
    dispatch({
        type: GET_ME_SUCCESS,
        payload: data
    })
}