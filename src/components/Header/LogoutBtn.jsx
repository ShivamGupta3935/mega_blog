import React from 'react'
import {logout, Logout} from '../../store/authSlice'
import authService from '../../appwrite/database'
import { useDispatch } from 'react-redux'

function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.deleteAccount()
        .then(()=>{
            dispatch(logout())
        })
        .finally()
    }
  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
        logout
    </button>
  )
}

export default LogoutBtn