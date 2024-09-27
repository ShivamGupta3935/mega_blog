import React, { useEffect, useState } from 'react'
import authService from './appwrite/auth'
import './App.css'
import { useDispatch } from 'react-redux'
import {login, logout} from "./store/authSlice"
import { Header, Footer } from './components'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userdata)=>{
      if (userdata) {
        dispatch(login(userdata))
      }else{
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  },[])


  return !loading ? (<div className='min-h-screen flex flex-wrap bg-gray-400 content-center'>
    <div className='w-full block'>
          <Header/>
          <main>
           Todo: {/* <Outlet></Outlet> */}
          </main>
          <Footer/>
    </div>
  </div>) : null;
}

export default App
