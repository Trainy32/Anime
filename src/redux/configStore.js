import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import posts from '../redux/modules/posts'

const rootReducer = combineReducers({ posts })
const middlewares = [thunk]

const enhancer = applyMiddleware(...middlewares)


const store = createStore(rootReducer, enhancer);


export default store;