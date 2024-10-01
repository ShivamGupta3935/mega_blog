import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Login as authLogin} from './store/authSlice'
import {Logo, Input, Button} from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const {register, handleSubmit} = useForm()

  const login = async (data) => {
    console.log(data);
    
    setError("")
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if ( userData) dispatch(authLogin(userData))
          navigate("/")
      }
    } catch (error) {
      setError(error.message)
    }
  }
  return (
    <div className='w-full items-center justify-center flex'>
      <div className={`mx-auto w-full max-w-lg rounded-xl bg-gray-100 p-10 border border-black/10`}>
       <div className='mb-2 flex justify-center'> 
        <span className='inline-block w-full max-w-[100px]'></span>
            <Logo  width='100%'/>
       </div>
       <h2 className='text-center text-2xl font-bold leading-tight'>
           Sign in to your account
       </h2>
       <p className='mt-2 text-center text-base text-black/60 '>
          Don&apos;t have an account ? &nbsp;
       </p>
          <Link
          to='/signup'
          className='font-medium text-primary transition-all duration-200 hover:underline'
          >
            signup
          </Link>
          {
            error && <p className='text-red-600 mt-8 text-center'>{error} </p>
          }
          <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
              <Input 
               label="Email :"
               placeholder= 'Enter your email : '
               type= 'email'
               {
                ...register('email', {
                  required: true,
                  validate: {
                    matchPattern: (value) => {
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || "email address must be a valid address "
                    }
                  }
                })
               }
              />
              <Input 
              type="password"
              label="Password"
              placeholder='enter your password'
              {
                ...register("password",{
                  required:true,
                  minLength:{
                    value: 8,
                    message: "password length must be 8 character "
                  }
                })
              }
              />
              <Button 
              type='submit'
              className='w-full'
              >
                sign in
              </Button>
            </div>
          </form>
          

      </div>

    </div>
  )
}

export default Login