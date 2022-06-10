import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

const rootReducer = combineReducers()
const middlewares = [thunk]

const enhancer = applyMiddleware(...middlewares)


const store = createStore(rootReducer, enhancer );


export default store;