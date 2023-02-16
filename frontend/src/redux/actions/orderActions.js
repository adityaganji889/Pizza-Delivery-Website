import axios from "axios";
import { PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS, PLACE_ORDER_FAILED, GET_MYORDERS_REQUEST, GET_MYORDERS_SUCCESS, GET_MYORDERS_FAILED, REMOVE_MYORDERS_INFO, GET_ALLORDERS_FAILED, GET_ALLORDERS_REQUEST, GET_ALLORDERS_SUCCESS, REMOVE_ALLORDERS_INFO, REMOVE_PLACEORDER_INFO } from "../constants/orderConstants";

export const placeOrder = (token,subTotal) => async(dispatch,getState) => {
   try{
    dispatch({
        type: PLACE_ORDER_REQUEST,
       })
       const user = getState().getUserInfoReducer.user
       const cartItems = getState().cartReducer.cartItems
    const config = {
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
    }
    const {data} = await axios.post('/api/orders/placeorder',{token, subTotal, user, cartItems}, config)
    console.log(data)
    dispatch({
        type: PLACE_ORDER_SUCCESS,
    })
   }
   catch(error){
     dispatch({
        type: PLACE_ORDER_FAILED,
        payload: error.message
     })
   }
}

export const getMyOrders = () => async(dispatch,getState) => {
    try{
     dispatch({
         type: GET_MYORDERS_REQUEST
     })
     const config = {
         headers:{
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${localStorage.getItem("token")}`,
         }
     }
     const {data} = await axios.get('/api/orders/getMyOrders',config)
     dispatch({
         type: GET_MYORDERS_SUCCESS,
         payload: data
     })
    }
    catch(error){
     dispatch({
         type: GET_MYORDERS_FAILED,
         payload: error.message
     })
    }
 }

 export const removeMyOrders = () => dispatch => {
    dispatch({
        type: REMOVE_MYORDERS_INFO
    })
}

export const getAllOrders = () => async(dispatch,getState) => {
    try{
     dispatch({
         type: GET_ALLORDERS_REQUEST
     })
     const config = {
         headers:{
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${localStorage.getItem("token")}`,
         }
     }
     const {data} = await axios.get('/api/orders/getAllOrders',config)
     dispatch({
         type: GET_ALLORDERS_SUCCESS,
         payload: data
     })
    }
    catch(error){
     dispatch({
         type: GET_ALLORDERS_FAILED,
         payload: error.message
     })
    }
 }
 
 export const removeOrders = () => dispatch => {
     dispatch({
         type: REMOVE_ALLORDERS_INFO
     })
 }

 export const orderDelivered = (id) => async(dispatch) => {
    try{
        const config = {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        }
        const {data} = await axios.get(`/api/orders/updateOrder/${id}`, config)
        if(data.success){
            alert(data.message)
            dispatch(getAllOrders())
        }
        else{
            alert(data.message)
        }
    }
    catch(error){
        alert(error.message)
    }
 }

export const removePlaceOrderInfo = () => dispatch => {
    dispatch({
        type: REMOVE_PLACEORDER_INFO
    })
}