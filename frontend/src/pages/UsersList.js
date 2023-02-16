import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { Table } from 'react-bootstrap'
import { deleteUserById, getAllUsers, updateUserAdminStatus } from '../redux/actions/userActions'

function UsersList() {
  const userState = useSelector(state=>state.getAllUsersReducer)
  const dispatch = useDispatch()
  const {users, error, loading} = userState
  useEffect(()=>{
    if(localStorage.getItem("token")){
       dispatch(getAllUsers())
    }
  },[dispatch])
  return (
    <div className='text-center'>
       {/* <AdminPage/> */}
       <h2>Users List</h2>
       {loading&&<Loading/>}
       {error&&<Error error={error}/>}
       <Table bordered responsive="sm">
        <thead className='thead-dark'>
           <tr>
             <th>User Id</th>
             <th>Name</th>
             <th>Email</th>
             <th>isAdmin</th>
             <th>Actions</th>
           </tr>
        </thead>
        <tbody>
        {users&&users.map((user,index)=>{
              return(
                <tr key={index}>
                   <td>{user._id}</td>
                   <td>{user.name}</td>
                   <td>{user.email}</td>
                   <td className='cursor-pointer' onClick={()=>{
                    dispatch(updateUserAdminStatus(user._id))
                   }}>{user.isAdmin ? "✅" : "❌" }</td>
                   <td className='cursor-pointer' onClick={()=>{
                    dispatch(deleteUserById(user._id))
                   }}>🗑️</td>
                </tr>
              )
            })}
        </tbody>
        </Table>
    </div>
  )
}

export default UsersList