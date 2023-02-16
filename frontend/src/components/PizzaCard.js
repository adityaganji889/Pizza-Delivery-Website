import React, {useState} from 'react'
import { addToCart } from '../redux/actions/cartActions';
import PizzaModal from './PizzaModal';
import { useDispatch } from 'react-redux';
import AOS from 'aos'
import 'aos/dist/aos.css'

function PizzaCard(props) {
  AOS.init()
  const {pizza} = props
  const dispatch = useDispatch()
  const [quantity,setQuantity] = useState(1);
  const [varient, setVarient] = useState('small')
  const [modalShow, setModalShow] = useState(false);
  const addToCartHandler = () => {
   dispatch(addToCart(pizza,quantity,varient))
  }
  return (
    <div data-aos='zoom-in' className='shadow-lg p-3 mb-5 bg-body rounded text-center'>
    <div onClick={()=>setModalShow(true)} className="cursor-pointer">
    <div className='fb-20'>{pizza.name}</div>
      <img src={pizza.image} alt="pizza" className='img-fluid wh-200'/>
    </div>
      <div className='flex-container'>
        <div className='w-100 m-1'>
          <p>Varients</p>
          <select className='form-select' value={varient} onChange={(e)=>setVarient(e.target.value)}>
            {pizza.varients.map((varient,index)=>{
                return <option value={varient} key={index}>{varient}</option>
            })}
          </select>
        </div>
        <div className='w-100 m-1'>
          <p>Quantity</p>
          <select className='form-select' value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))}>
            {[...Array(10).keys()].map((x,index)=>{
                return <option value={index+1} key={index}>{index+1}</option>
            })}
          </select>
        </div>
      </div>
      <div className='flex-container'>
       <div className='m-1 w-100'>
        <div className='fb-20 mt-2'>
          Price : &#8377; {pizza.prices[0][varient]*quantity}
        </div>
       </div>
       <div className='m-1 w-100'>
          <button className='btn w-100' onClick={addToCartHandler}>Add to Cart</button>
       </div>
      </div>
      {modalShow&&<PizzaModal pizza={pizza} modalShow={modalShow} setModalShow={setModalShow}/>}
    </div>
  )
}

export default PizzaCard