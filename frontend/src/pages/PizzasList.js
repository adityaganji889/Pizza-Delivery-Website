import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePizzaById, getAllPizzas, removeEditPizza, removeEditPizzaById } from '../redux/actions/pizzaActions'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function PizzasList() {
  const pizzaState = useSelector(state=>state.getAllPizzasReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {pizzas, error, loading} = pizzaState
  useEffect(()=>{
    if(localStorage.getItem("token")){
        dispatch(getAllPizzas())
        dispatch(removeEditPizza())
        dispatch(removeEditPizzaById())
    }
  },[dispatch])
  return (
    <div className='text-center'>
     <h2>Pizzas List</h2>
     {loading&&<Loading/>}
     {error&&<Error error={error}/>}
     <Table bordered responsive="sm">
        <thead className='thead-dark'>
           <tr>
             <th>Name</th>
             <th>Prices</th>
             <th>Category</th>
             <th>Actions</th>
           </tr>
        </thead>
        <tbody>
            {pizzas&&pizzas.map((pizza,index)=>{
              return(
                <tr key={index}>
                   <td>{pizza.name}</td>
                   <td>
                     Small : &#8377; {pizza.prices[0]['small']} <br/>
                     Medium : &#8377; {pizza.prices[0]['medium']} <br/>
                     Large : &#8377; {pizza.prices[0]['large']}
                   </td>
                   <td>{pizza.category}</td>
                   <td>
                     <span onClick={()=>{
                      dispatch(deletePizzaById(pizza._id))
                     }}>
                       🗑️
                     </span>
                     &nbsp; &nbsp;
                     <span onClick={()=>{
                        navigate(`/admin/editPizza/${pizza._id}`)
                     }}>
                       📝
                     </span>
                   </td>
                </tr>
              )
            })}
        </tbody>
     </Table>
    </div>
  )
}

export default PizzasList