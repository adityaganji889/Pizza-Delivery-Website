import { ADD_PIZZA_FAILED, ADD_PIZZA_REQUEST, ADD_PIZZA_SUCCESS, EDIT_PIZZA_FAILED, EDIT_PIZZA_REQUEST, EDIT_PIZZA_SUCCESS, GET_PIZZABYID_FAILED, GET_PIZZABYID_REQUEST, GET_PIZZABYID_SUCCESS, GET_PIZZAS_FAILED, GET_PIZZAS_REQUEST, GET_PIZZAS_SUCCESS, REMOVE_ADD_PIZZA, REMOVE_EDIT_PIZZA, REMOVE_EDIT_PIZZABYID, REMOVE_PIZZAS_INFO } from "../constants/pizzaConstants";

export const getAllPizzasReducer=(state={pizzas:[]},action) => {
    switch(action.type){
      case GET_PIZZAS_REQUEST:
        return {
            loading: true,
            ...state
        }
      case GET_PIZZAS_SUCCESS:
        return {
            loading: false,
            pizzas: action.payload
        }
      case GET_PIZZAS_FAILED:
        return {
            loading: false,
            error: action.payload
        }
      case REMOVE_PIZZAS_INFO:
        return {
          pizzas: []
        }
      default:
        return state
    }
}

export const addPizzaReducer=(state={},action) => {
  switch(action.type){
    case ADD_PIZZA_REQUEST:
      return {
          loading: true,
          ...state
      }
    case ADD_PIZZA_SUCCESS:
      const data = action.payload
      return {
          loading: false,
          success: data.success,
          message: data.message
      }
    case ADD_PIZZA_FAILED:
      return {
          loading: false,
          error: action.payload
      }
    case REMOVE_ADD_PIZZA:
      return {}
    default:
      return state
  }
}

export const getPizzaByIdReducer=(state={},action) => {
  switch(action.type){
    case GET_PIZZABYID_REQUEST:
      return {
          loading: true,
          ...state
      }
    case GET_PIZZABYID_SUCCESS:
      const pizzas = action.payload
      return {
          loading: false,
          pizza: pizzas.data,
          success: true
      }
    case GET_PIZZABYID_FAILED:
      return {
          loading: false,
          error: action.payload
      }
    case REMOVE_EDIT_PIZZABYID:
      return {}
    default:
      return state
  }
}


export const editPizzaReducer=(state={},action) => {
  switch(action.type){
    case EDIT_PIZZA_REQUEST:
      return {
          loading: true,
          ...state
      }
    case EDIT_PIZZA_SUCCESS:
      const data = action.payload
      return {
          loading: false,
          success: data.success,
          message: data.message
      }
    case EDIT_PIZZA_FAILED:
      return {
          loading: false,
          error: action.payload
      }
    case REMOVE_EDIT_PIZZA:
      return {}
    default:
      return state
  }
}