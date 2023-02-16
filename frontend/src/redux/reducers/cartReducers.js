import { ADD_TO_CART, DELETE_FROM_CART, REMOVE_CART_ITEMS } from "../constants/cartConstants"

export const CartReducer = (state={cartItems: []},action) => {
    switch(action.type){
        case ADD_TO_CART:
            const cartItem = action.payload
            const alreadyExists = state.cartItems.find((item)=>item._id===cartItem._id)
            console.log(alreadyExists)
            if(alreadyExists){
                return{
                    ...state,
                    cartItems:state.cartItems.map((item)=>{
                        return item._id===cartItem._id?cartItem:item
                     }
                    )
                }
            }
            else{
                return{
                    ...state,
                    cartItems:[...state.cartItems,cartItem]
                }
            }
        case DELETE_FROM_CART:
            const pizza = action.payload
            return {
                    ...state,
                    cartItems: state.cartItems.filter(item => item._id!== pizza._id)
            }
        case REMOVE_CART_ITEMS:
            return {
                cartItems: []
            }
        default:
            return state
    }
}