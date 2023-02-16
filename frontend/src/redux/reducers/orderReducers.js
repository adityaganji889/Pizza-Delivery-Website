import { GET_ALLORDERS_FAILED, GET_ALLORDERS_REQUEST, GET_ALLORDERS_SUCCESS, GET_MYORDERS_FAILED, GET_MYORDERS_REQUEST, GET_MYORDERS_SUCCESS, PLACE_ORDER_FAILED, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS, REMOVE_ALLORDERS_INFO, REMOVE_MYORDERS_INFO, REMOVE_PLACEORDER_INFO } from "../constants/orderConstants";

export const placeOrderReducer = (state={},action) => {
    switch(action.type){
        case PLACE_ORDER_REQUEST:
            return {
                loading: true
            }
        case PLACE_ORDER_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case PLACE_ORDER_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        case REMOVE_PLACEORDER_INFO:
            return {}
        default:
            return state  
    }
}

export const getMyOrdersReducer=(state={orders:[]},action) => {
    switch(action.type){
      case GET_MYORDERS_REQUEST:
        return {
            loading: true,
            ...state
        }
      case GET_MYORDERS_SUCCESS:
        return {
            loading: false,
            orders: action.payload
        }
      case GET_MYORDERS_FAILED:
        return {
            loading: false,
            error: action.payload
        }
      case REMOVE_MYORDERS_INFO:
        return {
          orders: []
        }
      default:
        return state
    }
}

export const getAllOrdersReducer=(state={orders:[]},action) => {
    switch(action.type){
      case GET_ALLORDERS_REQUEST:
        return {
            loading: true,
            ...state
        }
      case GET_ALLORDERS_SUCCESS:
        const data = action.payload
        return {
            loading: false,
            message: data.message,
            success: data.success,
            orders: data.data
        }
      case GET_ALLORDERS_FAILED:
        return {
            loading: false,
            error: action.payload
        }
      case REMOVE_ALLORDERS_INFO:
        return {
          orders: []
        }
      default:
        return state
    }
}