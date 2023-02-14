import {legacy_createStore as createStore,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {
    loginReducer,
    initLocation
} from './reducers/accountReducers'
import {
    getCarReducer
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
    sortReducer
})

const initialState = {};
const middleware = [thunk];
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;