import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import words from './modules/words'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({words})
const middlewares = [thunk]

const enhancer = applyMiddleware(...middlewares)


const store = createStore(rootReducer, enhancer );


export default store;