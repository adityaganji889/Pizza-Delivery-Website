import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import web from '../assets/images/website-logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { landingPageTrue } from '../redux/actions/landingPageActions';
import { useEffect } from 'react';
import { logoutUser, removeUserInfo, removeLoginInfo, removeRegisterInfo, getUserInfo, removeAllUsersInfo } from '../redux/actions/userActions';
import { removeAddPizza, removeEditPizza, removeEditPizzaById, removePizzas } from '../redux/actions/pizzaActions';
import axios from 'axios';
import { getMyOrders, removeMyOrders, removeOrders } from '../redux/actions/orderActions';

function NavBar() {
  const cartState = useSelector(state=>state.cartReducer)
  const user = useSelector(state=>state.getUserInfoReducer.user)
  const {cartItems} = cartState
  const {pathname} = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const getUserInform = async() => {
    try{
     const axiosInstance = axios.create({
      headers : {
          'authorization': `Bearer ${localStorage.getItem('token')}`
      }
     });
     const response = await axiosInstance.post("/api/users/get-user-info");
     dispatch(getUserInfo(response.data.data))
    }
    catch(error){
        console.log("error:" , error)
    }
  }  
  useEffect(()=>{
    console.log(pathname)
    if(pathname==="/"&&localStorage.getItem("isLandingPage")){
      dispatch(landingPageTrue())
    }
    if(!localStorage){
      navigate("/")
    }
    if(localStorage.getItem("token")){
      getUserInform()
    }
  },[dispatch, navigate])
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className='shadow-lg p-3 mb-5 bg-white rounded'>
      <Container>
        <LinkContainer to="/home">
        <Navbar.Brand><img src={web} width="50rem" height="50rem" alt="web-logo" className='me-4'/>Pizza Hut</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
          {user?(
            <Dropdown>
      <Dropdown.Toggle variant="danger" id="dropdown-basic">
        {user.name}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {user.isAdmin&&<Dropdown.Item onClick={()=>{
          navigate("/admin")
        }}>Admin</Dropdown.Item>}
        <Dropdown.Item onClick={()=>{
          dispatch(getMyOrders())
          navigate("/orders")
        }}>Orders</Dropdown.Item>
        <Dropdown.Item onClick={()=>{
          dispatch(landingPageTrue())
          dispatch(logoutUser())
          dispatch(removeLoginInfo())
          dispatch(removeUserInfo())
          dispatch(removePizzas())
          dispatch(removeRegisterInfo())
          dispatch(removeMyOrders())
          dispatch(removeEditPizza())
          dispatch(removeAddPizza())
          dispatch(removeAllUsersInfo())
          dispatch(removeEditPizzaById())
          dispatch(removeOrders())
          navigate("/")
        }}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
          ) : (
            <LinkContainer to="/login" >
            <Nav.Link active={pathname===
            "/login"?true:false}>Login</Nav.Link>
            </LinkContainer>
          )}
          <LinkContainer to="/cart">
            <Nav.Link to="/cart" active={pathname==="/cart"?true:false}>Cart {cartItems.length}</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;