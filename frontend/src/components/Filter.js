import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { filterPizzas } from '../redux/actions/pizzaActions'

function Filter() {
  const dispatch = useDispatch()
  const [searchKey,setSearchKey] = useState('')
  const [category, setCategory] = useState('all')
  return (
    <div>
        <Row className='justify-content-center mb-4 shadow-lg p-3 mb-5 bg-body rounded'>
          <Col md={3}>
            <input type="text" className='form-control w-100' placeholder='search pizzas' name='pizzas' value={searchKey}
            onChange={(e)=>setSearchKey(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <select name="" id="" className='form-select mt-2 w-100'
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            >
              <option value="all">All</option>
              <option value="veg">Veg</option>
              <option value="nonveg">Non-Veg</option>
            </select>
          </Col>
          <Col md={3}>
            <button className='btn mt-2 w-100' onClick={()=>{
                dispatch(filterPizzas(searchKey,category))
            }}>Filter</button>
          </Col>
        </Row>
    </div>
  )
}

export default Filter