import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPizza, removeAddPizza } from '../redux/actions/pizzaActions'
import Loading from '../components/Loading'
import Success from '../components/Success'
import Error from '../components/Error'
import { useNavigate } from 'react-router-dom'


function AddPizza() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const[name,setName] = useState('')
  const[smallprice, setsmallprice] = useState()
  const[mediumprice, setmediumprice] = useState()
  const[largeprice, setlargeprice] = useState()
  const[image, setimage] = useState('')
  const[description, setdescription] = useState('')
  const[category,setcategory] = useState('')
  const addpizzastate = useSelector(state=>state.addPizzaReducer)
  const {success, error, loading, message} = addpizzastate
  const formHandler = (e) => {
    e.preventDefault()
    const pizza = {
        name: name,
        image: image,
        description: description,
        category: category,
        prices: {
            small : smallprice,
            medium : mediumprice,
            large : largeprice
        }
    }
    dispatch(addPizza(pizza))
  }
  useEffect(()=>{
    if(success){
        setTimeout(() => {
            dispatch(removeAddPizza())
            navigate("/admin/pizzasList")
         }, 3000);
    }
  },[success,dispatch,navigate])
  return (
    <div className='text-center shadow-lg p-3 mb-5 bg-body rounded'>
      <h2>Add Pizza</h2>
      {loading&&<Loading/>}
      {message&&<Success success={success} message={message}/>}
      {error&&<Error error={error}/>}
      <form className='form-control' onSubmit={formHandler}>
        <input type="text" placeholder='name' value={name} onChange={(e)=>setName(e.target.value)} className='form-control'
        required    
        />
        <input type="number" placeholder='small varient price' value={smallprice?smallprice:100} onChange={(e)=>setsmallprice(Number(e.target.value))} className='form-control' min={100} required/>
        <input type="number" placeholder='medium varient price' value={mediumprice?mediumprice:200} onChange={(e)=>setmediumprice(Number(e.target.value))} className='form-control' min={200} required/>
        <input type="number" placeholder='large varient price' value={largeprice?largeprice:300} onChange={(e)=>setlargeprice(Number(e.target.value))} className='form-control' min={300} required/>
        <input type="url" placeholder='image url' value={image} onChange={(e)=>setimage(e.target.value)} className='form-control' required/>
        {/* <input type="text" placeholder='category' value={category} onChange={(e)=>setcategory(e.target.value)} className='form-control'/> */}
        <select name="" id="" className='form-select mt-2 w-100'
            value={category?category:"veg"}
            onChange={(e)=>{ setcategory(e.target.value)}} required>
              <option value="veg" selected>Veg</option>
              <option value="nonveg">Non-Veg</option>
            </select>
        <textarea type="text" placeholder='description' value={description} onChange={(e)=>setdescription(e.target.value)} className='form-control' rows="5"   required>
        </textarea>
        <button className='btn mt-2 w-100' type="submit">Add Pizza</button>
      </form>
    </div>
  )
}

export default AddPizza