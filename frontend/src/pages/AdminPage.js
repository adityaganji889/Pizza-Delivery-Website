import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'

function AdminPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation();
  useEffect(()=>{
     if(!localStorage.getItem("token")){
        navigate("/login")
     }
     else{
        const user = JSON.parse(localStorage.getItem("user"))
        if(!user.isAdmin){
            navigate("/home")
        }
     }
  },[dispatch,navigate])
  return (
    <Container>
      <Row className='justify-content-center p-3'>
       <Col md={10} sm={12}>
       <h1 className='f-40 text-center'>Admin Panel</h1>
        <ul className='adminFunctions text-center'>
            <li className={`${location.pathname==="/admin/usersList"&&'list-active-item'}`}><Link to="/admin/usersList">Users List</Link></li>
            <li><Link to="/admin/pizzasList">Pizzas List</Link></li>
            <li><Link to="/admin/addPizza">Add Pizza</Link></li>
            <li><Link to="/admin/ordersList">Orders List</Link></li>
        </ul>
        <Outlet />
       </Col>
      </Row>
    </Container>
  )
}

export default AdminPage