import React,{useState,useEffect} from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Success from '../components/Success';
import { getAllPizzas } from '../redux/actions/pizzaActions';
import { registerUser } from '../redux/actions/userActions';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const registerState = useSelector(state=>state.registerUserReducer)
  const {error,loading,success,message} = registerState
  const register = () => {
    if(password!==confirmPassword){
        alert("Passwords not matched.")
    }
    else{
        const user = {
            name,
            email,
            password
        }
        console.log(user)
        dispatch(registerUser(user))
    }
  }
  useEffect(()=>{
    if(localStorage.getItem("token")){
      dispatch(getAllPizzas())
      navigate("/home")
    }
    if(success){
      setTimeout(() => {
          navigate("/login")
       }, 3000);
     }
  },[dispatch,navigate,registerState])
  return (
    <Container fluid={true}>
      <Row className='d-flex justify-content-center mt-5'>
        <Col md={5} className="mt-5 text-left shadow-lg p-3 mb-5 bg-body rounded">
        <h2 className='f-30 text-center'>Register</h2>
        <div className='text-center'>
        {loading&&<Loading/>}
        </div>
        {error&&<Error error={error}/>}
        {message&&<Success message={message} success={success}/>}
          <div>
            <input type="text" placeholder='name' className='form-control'
            onChange={(e)=>{setName(e.target.value)}}
            value={name}   
            required={true} 
            />
            <input type="email" placeholder='email' className='form-control'
            onChange={(e)=>{setEmail(e.target.value)}} 
            value={email}
            required={true} 
            />
            <input type="password" placeholder='password' className='form-control'
            onChange={(e)=>{setPassword(e.target.value)}}    
            value={password}
            required={true}  
            />
            <input type="password" placeholder='confirmPassword' className='form-control'
            onChange={(e)=>{setConfirmPassword(e.target.value)}}
            value={confirmPassword}
            required={true}      
            />
            <div className='d-flex justify-content-between'>
            <button className='btn mt-3' onClick={register}>
                Register
            </button>
            <Link to="/login" className='mt-4'>Already have an account ? Login Here</Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default RegisterPage