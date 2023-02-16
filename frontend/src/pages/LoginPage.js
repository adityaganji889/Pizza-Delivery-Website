import React,{useState, useEffect} from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Success from '../components/Success';
import { getAllPizzas } from '../redux/actions/pizzaActions';
import { loginUser } from '../redux/actions/userActions';

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const userLogin = useSelector(state=>state.loginUserReducer)
    const {token, error, loading, success, message} = userLogin
    const login = () => {
          const user = {
              email,
              password
          }
          console.log(user)
          dispatch(loginUser(user))
    }
    useEffect(()=>{
       if(localStorage.getItem('token')&&token!==""){
         dispatch(getAllPizzas())
         navigate("/home")
       }
    },[dispatch, navigate, token, success, userLogin])
    return (
      <Container fluid={true}>
        <Row className='d-flex justify-content-center mt-5'>
          <Col md={5} className="mt-5 text-left shadow-lg p-3 mb-5 bg-body rounded">
          <h2 className='f-30 text-center'>Login</h2>
          <div className='text-center'>
          {loading&&<Loading/>}
          </div>
          {error&&<Error error={error}/>}
          {message&&<Success message={message} success={success}/>}
            <div>
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
              <div className='d-flex justify-content-between'>
              <button className='btn mt-3' onClick={login}>
                  Login
              </button>
              <Link to="/register" className='mt-4'>Don't have an account ? Register Here</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    )
}

export default LoginPage