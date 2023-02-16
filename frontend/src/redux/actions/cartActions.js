import { ADD_TO_CART, DELETE_FROM_CART, REMOVE_CART_ITEMS } from "../constants/cartConstants"

export const addToCart = (pizza, quantity, varient) => (dispatch,getState) => {
      var cartItem = {
        name: pizza.name,
        _id: pizza._id,
        image: pizza.image,
        varient: varient,
        quantity: quantity,
        prices: pizza.prices,
        price: pizza.prices[0][varient]*quantity
      }
      if(cartItem.quantity>10){
        alert("You cannot add more than 10 quantities")
      }
      else{
        if(cartItem.quantity<1){
          dispatch({
            type: DELETE_FROM_CART,
            payload: cartItem
          })
        }
        else{
          dispatch({
            type: ADD_TO_CART,
            payload: cartItem
          })
        }
      }
      localStorage.setItem('cartItems',JSON.stringify(getState().cartReducer.cartItems))
}

export const deleteFromCart = (pizza) => (dispatch,getState) => {
  dispatch({
    type: DELETE_FROM_CART,
    payload: pizza
  })
  localStorage.setItem('cartItems',JSON.stringify(getState().cartReducer.cartItems))
}

export const removeCartItems = () => (dispatch,getState) => {
  dispatch({
    type: REMOVE_CART_ITEMS
  })
  localStorage.removeItem('cartItems')
}