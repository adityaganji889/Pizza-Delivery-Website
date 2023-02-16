import {combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { addPizzaReducer, editPizzaReducer, getAllPizzasReducer, getPizzaByIdReducer } from './reducers/pizzaReducers'
import { CartReducer } from './reducers/cartReducers'
import { landingPageReducer } from './reducers/LandingPageReducers'
import { registerUserReducer, loginUserReducer, getUserInfoReducer, getAllUsersReducer } from './reducers/userReducers'
import { getAllOrdersReducer, getMyOrdersReducer, placeOrderReducer } from './reducers/orderReducers'

const finalReducer = combineReducers({
    landingPageReducer: landingPageReducer,
    registerUserReducer: registerUserReducer,
    loginUserReducer: loginUserReducer,
    getUserInfoReducer: getUserInfoReducer,
    getAllPizzasReducer: getAllPizzasReducer,
    cartReducer: CartReducer,
    placeOrderReducer: placeOrderReducer,
    getMyOrdersReducer: getMyOrdersReducer,
    addPizzaReducer: addPizzaReducer,
    getPizzaByIdReducer: getPizzaByIdReducer,
    editPizzaReducer: editPizzaReducer,
    getAllOrdersReducer: getAllOrdersReducer,
    getAllUsersReducer: getAllUsersReducer
})

const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')):[]
const isLandingPage = localStorage.getItem('isLandingPage') ? JSON.parse(localStorage.getItem('isLandingPage')):true 

const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : ""
const user = localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : ""



const initialState = {
    landingPageReducer: isLandingPage,
    getUserInfoReducer: user,
    loginUserReducer: currentUser,
    cartReducer: {
        cartItems: cartItems
    }
}

const composeEnhancers = composeWithDevTools({})

const store = createStore(finalReducer,initialState, composeEnhancers(applyMiddleware(thunk)))

export default store;