import React, { useEffect } from 'react'
import PizzaCard from '../components/PizzaCard'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPizzas } from '../redux/actions/pizzaActions'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import Error from '../components/Error'
import Filter from '../components/Filter'


function HomePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const pizzaState = useSelector(state=>state.getAllPizzasReducer)
  const isLandingPage = useSelector(state=>state.landingPageReducer)
  const {pizzas, error, loading} = pizzaState
  useEffect(()=>{
    if(isLandingPage){
      navigate("/")
    }
    if(localStorage.getItem("token")){
      navigate("/home")
      dispatch(getAllPizzas())
    }
    else{
      navigate("/login")
    }
  },[dispatch, navigate, isLandingPage, localStorage.getItem("token")])
  return (
    <Container>
      <Filter/>
      <Row className='d-flex justify-content-center'>
        {loading&&<Loading/>}
        {error&&<Error error={error}/>}
        {pizzas&&pizzas.map((pizza,index)=>{
          return(
            <Col md={4} key={index}>
            <PizzaCard pizza={pizza}/>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default HomePage