import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Error from '../components/Error'
import Loading from '../components/Loading'
import { getMyOrders, removeMyOrders } from '../redux/actions/orderActions'
import AOS from 'aos'
import 'aos/dist/aos.css'

function OrdersPage() {
  AOS.init()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const myOrders = useSelector((state)=>state.getMyOrdersReducer)
  const {orders, loading, error} = myOrders
  useEffect(()=>{
     if(!localStorage.getItem("token")){
        dispatch(removeMyOrders())
        navigate("/login")
     }
     else{
        dispatch(getMyOrders())
     }
  },[dispatch,navigate])
  return (
    <Container fluid={true}>
      <Row className='text-center'>
        <h1 className='f-40'>My Orders</h1>
        <hr/>
        <Row className='justify-content-center'>
            {loading&&<Loading/>}
            {error&&<Error error={error}/>}
            {orders&&orders.map((order,index)=>{
                  return (
                    <Col md={8} key={index} className="btn m-2 ms-5" data-aos="fade-down">
                        <div className='flex-container'>
                          <div className='text-left w-100 m-1'>
                             <h2 className='f-25'>
                              Items
                             </h2>
                             {order.orderItems.map((item,index)=>{
                               return(
                                <div key={index}>
                                  <p>{item.name} [{item.varient}] x {item.quantity} = &#8377; {item.price}</p>
                                </div>
                               )
                             })}
                          </div>
                          <div className='text-left w-100 m-1'>
                            <h2 className='f-25'>Address</h2>
                            <p>
                            Street: {order.shippingAddress.street}
                            </p>
                            <p>
                            City: {order.shippingAddress.city}
                            </p>
                            <p>
                            Country: {order.shippingAddress.country}
                            </p>
                            <p>
                            Pincode: {order.shippingAddress.pincode}
                            </p>
                          </div>
                          <div className='text-left w-100 m-1'>
                           <h2 className='f-25'>
                            Order Info
                           </h2>
                           <p>
                            Order Amount: &#8377; {order.orderAmount}
                           </p>
                           <p>
                            Date:
                            {order.createdAt.substring(0,10)}
                           </p>
                           <p>
                            Transaction Id: 
                            {order.transactionid}
                           </p>
                           <p>
                            Order Id:
                            {order._id}
                           </p>
                           <p>
                            Delivery Status: {order.isDelivered? "Delivered" : "Yet To Deliver"}
                           </p>
                          </div>
                        </div>
                    </Col>
                  )
            })}
        </Row>
      </Row>
    </Container>
  )
}

export default OrdersPage