import React, { useEffect } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { placeOrder, removePlaceOrderInfo } from '../redux/actions/orderActions'
import { useDispatch, useSelector } from 'react-redux'
import Success from './Success'
import Error from './Error'
import Loading from './Loading'
import { useNavigate } from 'react-router-dom'
import { removeCartItems } from '../redux/actions/cartActions'

function Checkout(props) {
  const {subTotal} = props
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const orderState = useSelector(state=>state.placeOrderReducer)
  const {error, loading, success} = orderState
  const tokenHandler = (token) => {
      console.log(token)
      dispatch(placeOrder(token, subTotal))
  }
  useEffect(()=>{
    if(success){
      setTimeout(()=>{
        dispatch(removeCartItems())
        dispatch(removePlaceOrderInfo())
        navigate("/home")
      },5000)
    }
  },[success,dispatch])
  return (
    <div>
      {loading&&<Loading/>}
      {error&&<Error error={error}/>}
      {success&&<Success success={success} message="Your order placed successfully"/>}
      {subTotal!==0&&<StripeCheckout stripeKey={window.env.PRIMARY_STRIPE_KEY}
      amount={subTotal*100}
      shippingAddress
      currency="INR"
      token={tokenHandler}
      >
        <button className='btn'>
            Proceed To Checkout
        </button>
      </StripeCheckout>}
    </div>
  )
}

export default Checkout