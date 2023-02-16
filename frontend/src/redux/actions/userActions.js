import axios from "axios";
import { USER_REGISTER_FAILED, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILED, GET_USER_INFO, REMOVE_USER_INFO, REMOVE_LOGIN_INFO, REMOVE_REGISTER_INFO, GET_ALLUSERS_REQUEST, GET_ALLUSERS_SUCCESS, REMOVE_ALLUSERS_INFO } from "../constants/userConstants";

export const registerUser = (user) => async(dispatch) => {
    try{
      dispatch({
        type: USER_REGISTER_REQUEST,
      })
      const {data} = await axios.post('/api/users/register',user)
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data
      })
    }
    catch(error){
      dispatch({
        type: USER_REGISTER_FAILED,
        payload: error.message
      })
    }
}
export const loginUser = (user) => async(dispatch,getState) => {
    try{
      dispatch({
        type: USER_LOGIN_REQUEST,
      })
      const {data} = await axios.post('/api/users/login',user)
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data
      })
      if(data.success){
        localStorage.setItem("currentUser",JSON.stringify(getState().loginUserReducer))
        localStorage.setItem("token",JSON.stringify(getState().loginUserReducer.token))
      }
    }
    catch(error){
      dispatch({
        type: USER_LOGIN_FAILED,
        payload: error.message
      })
    }
}

export const getUserInfo = (user) => (dispatch,getState) => {
  dispatch({
        type: GET_USER_INFO,
        payload: user
  })
  localStorage.setItem("user",JSON.stringify(getState().getUserInfoReducer.user))
}

export const removeUserInfo = () => (dispatch,getState) => {
  dispatch({
        type: REMOVE_USER_INFO,
  })
  localStorage.removeItem("user")
}

export const removeLoginInfo = () => (dispatch) => {
  dispatch({
     type: REMOVE_LOGIN_INFO
  })
  localStorage.removeItem("currentUser")
}

export const removeRegisterInfo = () => (dispatch) => {
  dispatch({
     type: REMOVE_REGISTER_INFO
  })
}


export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token")
  localStorage.removeItem("isLandingPage")
}


export const getAllUsers = () => async(dispatch,getState) => {
  try{
   dispatch({
       type: GET_ALLUSERS_REQUEST
   })
   const config = {
       headers:{
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${localStorage.getItem("token")}`,
       }
   }
   const {data} = await axios.get('/api/users/getAllUsers',config)
   dispatch({
       type: GET_ALLUSERS_SUCCESS,
       payload: data
   })
  }
  catch(error){
   dispatch({
       type: GET_ALLUSERS_SUCCESS,
       payload: error.message
   })
  }
}

export const removeAllUsersInfo = () => dispatch => {
  dispatch({
    type: REMOVE_ALLUSERS_INFO
  })
}

export const updateUserAdminStatus = (id) => async(dispatch) => {
  try{
      const config = {
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token")}`,
          }
      }
      const {data} = await axios.get(`/api/users/updateUserAdminStatus/${id}`, config)
      if(data.success){
          alert(data.message)
          dispatch(getAllUsers())
      }
      else{
          alert(data.message)
      }
  }
  catch(error){
      alert(error.message)
  }
}

export const deleteUserById = (id) => async(dispatch) => {
  try{
      const config = {
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token")}`,
          }
      }
      const {data} = await axios.delete(`/api/users/deleteUser/${id}`, config)
      if(data.success){
          alert(data.message)
          dispatch(getAllUsers())
      }
      else{
          alert(data.message)
      }
  }
  catch(error){
      alert(error.message)
  }
} 