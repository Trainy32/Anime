import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import Posts from './modules/posts'

const rootReducer = combineReducers({ Posts })
const middlewares = [thunk]

const enhancer = applyMiddleware(...middlewares)


const store = createStore(rootReducer, enhancer);


export default store;