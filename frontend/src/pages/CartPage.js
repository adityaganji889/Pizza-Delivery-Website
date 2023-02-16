import React,{useEffect} from 'react'
import {Row,Col, Container} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Checkout from '../components/Checkout';
import { addToCart, deleteFromCart } from '../redux/actions/cartActions';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos'
import 'aos/dist/aos.css'

function CartPage() {
  AOS.init()
  const cartState = useSelector(state=>state.cartReducer)
  const cartItems = cartState.cartItems
  var subTotal = cartItems.reduce((x, item)=>x+item.price,0)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate("/login")
    }
  },[dispatch])
  return (
    <Container fluid={true} data-aos="fade-down">
        <Row className='justify-content-center p-2'>
            <Col md={6}>
                <h2 className='f-30 text-center'>My Cart</h2>
                {cartItems.map((cartItem,index)=>{
                    return (
                        <div key={index}>
                        <hr/>
                        <div className='flex-container'>
                  <div className='w-100 m-1 text-left'>
                      <h4>{cartItem.name} [{cartItem.varient}]</h4>
                      <h4>Price: {cartItem.quantity} x {cartItem.prices[0][cartItem.varient]} = &#8377; {cartItem.price}</h4>
                      <h4>Quantity:<span onClick={()=>{dispatch(addToCart(cartItem,cartItem.quantity+1,cartItem
                      .varient))}}>➕</span>{cartItem.quantity}<span onClick={()=>{dispatch(addToCart(cartItem,cartItem.quantity-1,cartItem
                      .varient))}}>➖</span></h4>
                  </div>
                  <div className='m-1 w-100 d-flex justify-content-center'>
                     <img src={cartItem.image} alt="cartitemimg" className='wh-80'/>
                  </div>
                  <div className='m-1 w-100 d-flex justify-content-center'>
                    <div className='fb-20 mt-4' onClick={()=>{
                      dispatch(deleteFromCart(cartItem))
                    }}>🗑️</div>
                  </div>
                </div>
                        </div>
                    )
                })}
                <hr/>
            </Col>
            <Col md={4} className="text-center">
              <h2 className='f-45'>SubTotal : &#8377; {subTotal} /-</h2>
              <Checkout subTotal={subTotal}/>
            </Col>
        </Row>
    </Container>
  )
}

export default CartPage