import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { editPizza, getPizzaById, removeEditPizza } from '../redux/actions/pizzaActions'
import Loading from '../components/Loading'
import Success from '../components/Success'
import Error from '../components/Error'

function EditPizza() {
  const {id} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const[name,setName] = useState('')
  const[smallprice, setsmallprice] = useState()
  const[mediumprice, setmediumprice] = useState()
  const[largeprice, setlargeprice] = useState()
  const[image, setimage] = useState('')
  const[description, setdescription] = useState('')
  const[category,setcategory] = useState('')
  const getByPizzaState = useSelector(state=>state.getPizzaByIdReducer)
  const {error, loading, success, message, pizza} = getByPizzaState
  const editPizzaState = useSelector(state=>state.editPizzaReducer)
  const {error: editerror, loading: editloading, success: editsuccess, message: editmessage } = editPizzaState
  const formHandler = (e) => {
    e.preventDefault()
    const updatedPizza = {
        _id: pizza._id,
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
    console.log(updatedPizza)
    dispatch(editPizza(updatedPizza))
  }
  useEffect(()=>{
    if(pizza){
      if(pizza._id===id){
        setName(pizza.name)
        setcategory(pizza.category)
        setdescription(pizza.description)
        setimage(pizza.image)
        setsmallprice(pizza.prices[0]['small'])
        setmediumprice(pizza.prices[0]['medium'])
        setlargeprice(pizza.prices[0]['large'])
      }
      else{
        dispatch(getPizzaById(id))
      }
    }
    else{
      dispatch(getPizzaById(id)) 
    }
    if(editsuccess){
      setTimeout(() => {
      dispatch(removeEditPizza())
      navigate("/admin/pizzasList")
   }, 10000);
    }
  },[pizza,editsuccess,dispatch, navigate])
  return (
    <div className='text-center shadow-lg p-3 mb-5 bg-body rounded'>
    <h2>Edit Pizza</h2>
      {loading&&<Loading/>}
      {message&&<Success success={success} message={message}/>}
      {error&&<Error error={error}/>}
      {editloading&&<Loading/>}
      {editmessage && <Success success={editsuccess} message={editmessage}/>}
      {editerror && <Error error={editerror}/>}
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
            value={category}
            onChange={(e)=>{ setcategory(e.target.value)}} required>
              <option value="veg">Veg</option>
              <option value="nonveg">Non-Veg</option>
            </select>
        <textarea type="text" placeholder='description' value={description} onChange={(e)=>setdescription(e.target.value)} className='form-control' rows="5"   required>
        </textarea>
        <button className='btn mt-2 w-100' type="submit">Edit Pizza</button>
      </form>
    </div>
  )
}

export default EditPizza