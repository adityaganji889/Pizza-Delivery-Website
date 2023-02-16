import { GET_PIZZAS_REQUEST, GET_PIZZAS_SUCCESS, GET_PIZZAS_FAILED, REMOVE_PIZZAS_INFO, ADD_PIZZA_REQUEST, ADD_PIZZA_FAILED, ADD_PIZZA_SUCCESS, REMOVE_ADD_PIZZA, GET_PIZZABYID_REQUEST, GET_PIZZABYID_SUCCESS, GET_PIZZABYID_FAILED, REMOVE_EDIT_PIZZA, EDIT_PIZZA_REQUEST, EDIT_PIZZA_SUCCESS, EDIT_PIZZA_FAILED, REMOVE_EDIT_PIZZABYID } from "../constants/pizzaConstants"
import axios from 'axios'


export const getAllPizzas = () => async(dispatch,getState) => {
   try{
    dispatch({
        type: GET_PIZZAS_REQUEST
    })
    const config = {
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
    }
    const {data} = await axios.get('/api/pizzas/getAllPizzas',config)
    dispatch({
        type: GET_PIZZAS_SUCCESS,
        payload: data
    })
   }
   catch(error){
    dispatch({
        type: GET_PIZZAS_FAILED,
        payload: error.message
    })
   }
}

export const removePizzas = () => dispatch => {
    dispatch({
        type: REMOVE_PIZZAS_INFO
    })
}

export const filterPizzas = (searchKey, category) => async(dispatch,getState) => {
    try{
        var filteredPizzas;
     dispatch({
         type: GET_PIZZAS_REQUEST
     })
     const config = {
         headers:{
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${localStorage.getItem("token")}`,
         }
     }
     const {data} = await axios.get('/api/pizzas/getAllPizzas',config)
     filteredPizzas = data.filter(pizza=>pizza.name.toLowerCase().includes(searchKey))
     if(category!=='all'){
        filteredPizzas = data.filter(pizza=>pizza.category.toLowerCase()===category)
     }
     dispatch({
         type: GET_PIZZAS_SUCCESS,
         payload: filteredPizzas
     })
    }
    catch(error){
     dispatch({
         type: GET_PIZZAS_FAILED,
         payload: error.message
     })
    }
 }

 export const addPizza = (pizza) => async(dispatch) => {
    try{
        dispatch({
            type: ADD_PIZZA_REQUEST
        })
        const config = {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        }
        const {data} = await axios.post('/api/pizzas/addPizza', {pizza}, config)
        dispatch({
            type: ADD_PIZZA_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: ADD_PIZZA_FAILED,
            error: error.message
        })
    }
}

export const removeAddPizza = () => dispatch => {
    dispatch({
        type: REMOVE_ADD_PIZZA
    })
}

export const getPizzaById = (Id) => async(dispatch) => {
    try{
     dispatch({
         type: GET_PIZZABYID_REQUEST
     })
     const config = {
         headers:{
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${localStorage.getItem("token")}`,
         }
     }
     const {data} = await axios.get(`/api/pizzas/getPizzaById/${Id}`,config)
     dispatch({
         type: GET_PIZZABYID_SUCCESS,
         payload: data
     })
    }
    catch(error){
     dispatch({
         type: GET_PIZZABYID_FAILED,
         payload: error.message
     })
    }
 }

 export const editPizza = (pizza) => async(dispatch) => {
    try{
        dispatch({
            type: EDIT_PIZZA_REQUEST
        })
        const config = {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        }
        const {data} = await axios.put('/api/pizzas/editPizza', {pizza}, config)
        dispatch({
            type: EDIT_PIZZA_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: EDIT_PIZZA_FAILED,
            error: error.message
        })
    }
} 


 export const removeEditPizza = () => dispatch => {
    dispatch({
        type: REMOVE_EDIT_PIZZA
    })
}

export const removeEditPizzaById = () => dispatch => {
    dispatch({
        type: REMOVE_EDIT_PIZZABYID
    })
}

export const deletePizzaById = (id) => async(dispatch) => {
    try{
        const config = {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        }
        const {data} = await axios.delete(`/api/pizzas/deletePizza/${id}`, config)
        if(data.success){
            alert(data.message)
            dispatch(getAllPizzas())
        }
        else{
            alert(data.message)
        }
    }
    catch(error){
        alert(error.message)
    }
} 