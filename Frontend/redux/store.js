import {legacy_createStore as createStore,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {
    loginReducer,
    initLocation,
    isUserExist
} from './reducers/accountReducers'
import {
    getCarReducer,
    getCar,
    addCar,
    editCar,
    deleteCar
} from './reducers/carReducers'
import {
    filterReducer,
    sortReducer
} from './reducers/filterReducer'

const reducer = combineReducers({
    loginReducer,
    getCars:getCarReducer,
    initLocation,
    filterReducer,
    sortReducer,
    getCar,
    isUserExist,
    addCar,
    editCar,
    deleteCar
})

const initialState = {};
const middleware = [thunk];
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;