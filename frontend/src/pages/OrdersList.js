import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { Table } from 'react-bootstrap'
import { getAllOrders, orderDelivered } from '../redux/actions/orderActions'

function OrdersList() {
  const ordersState = useSelector(state=>state.getAllOrdersReducer)
  const dispatch = useDispatch()
  const {orders, error, loading} = ordersState
  useEffect(()=>{
    if(localStorage.getItem("token")){
        dispatch(getAllOrders())
    }
  },[dispatch])
  return (
    <div className='text-center'>
     {/* <AdminPage/> */}
     <h2>Orders List</h2>
     {loading&&<Loading/>}
     {error&&<Error error={error}/>}
     <Table bordered responsive="sm">
        <thead className='thead-dark'>
           <tr>
             <th>Order Id</th>
             <th>Email</th>
             <th>User Id</th>
             <th>Amount</th>
             <th>Date</th>
             <th>Status</th>
           </tr>
        </thead>
        <tbody>
        {orders&&orders.map((order,index)=>{
              return(
                <tr key={index}>
                   <td>{order._id}</td>
                   <td>{order.email}</td>
                   <td>{order.userid}</td>
                   <td>&#8377; {order.orderAmount}</td>
                   <td>{order.updatedAt.substring(0,10)}</td>
                   <td>{order.isDelivered ? (<h5 className='text-success'>Delivered</h5>) : (
                    <button className='btn' onClick={()=>{
                      dispatch(orderDelivered(order._id))
                    }}>Deliver</button>
                   )}</td>
                </tr>
              )
            })}
        </tbody>
    </Table>
    </div>
  )
}

export default OrdersList