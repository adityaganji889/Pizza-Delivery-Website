// import logo from './logo.svg';
import NavBar from './components/NavBar';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CartPage from './pages/CartPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import OrdersPage from './pages/OrdersPage';
import AdminPage from './pages/AdminPage';
import UsersList from './pages/UsersList';
import OrdersList from './pages/OrdersList';
import AddPizza from './pages/AddPizza';
import PizzasList from './pages/PizzasList';
import EditPizza from './pages/EditPizza';

function App() {
  const landingpage = useSelector(state=>state.landingPageReducer)
  useEffect(()=>{
   
  },[landingpage])
  return (
    <Router>
      {(!landingpage)&&<NavBar/>}
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/orders" element={<OrdersPage/>}/>
        <Route path="/admin" element={<AdminPage/>}>
          <Route path="usersList" element={<UsersList/>}/>
          <Route path="pizzasList" element={<PizzasList/>}/>
          <Route path="addPizza" element={<AddPizza/>}/>
          <Route path="ordersList" element={<OrdersList/>}/>
          <Route path="editPizza/:id" element={<EditPizza/>}/> 
        </Route>
        {/* <Route path="/admin" element={<AdminPage/>}/> */}
      </Routes>
    </Router>
  );
}

export default App;
