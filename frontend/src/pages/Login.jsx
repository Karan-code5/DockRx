import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {

      if (state === 'Sign Up') {

        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }

      } else {

        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }

      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center justify-center py-10'>
      <div className='flex flex-col gap-6 m-auto items-start p-10 min-w-[340px] sm:min-w-96 border border-slate-100 rounded-2xl bg-white text-slate-600 shadow-xl'>
        <div className='flex flex-col gap-2'>
          <p className='text-3xl font-bold text-slate-800'>{state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}</p>
          <p className='text-sm font-medium text-slate-400'>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to access healthcare services.</p>
        </div>

        {state === 'Sign Up' && (
          <div className='w-full flex flex-col gap-1.5'>
            <p className='text-xs font-bold uppercase tracking-widest text-slate-400'>Full Name</p>
            <input 
              onChange={(e) => setName(e.target.value)} 
              value={name} 
              className='border border-slate-200 rounded-xl w-full px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-800' 
              type="text" 
              placeholder='John Doe'
              required 
            />
          </div>
        )}

        <div className='w-full flex flex-col gap-1.5'>
          <p className='text-xs font-bold uppercase tracking-widest text-slate-400'>Email Address</p>
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            className='border border-slate-200 rounded-xl w-full px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-800' 
            type="email" 
            placeholder='name@example.com'
            required 
          />
        </div>

        <div className='w-full flex flex-col gap-1.5'>
          <p className='text-xs font-bold uppercase tracking-widest text-slate-400'>Password</p>
          <input 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            className='border border-slate-200 rounded-xl w-full px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-800' 
            type="password" 
            placeholder='••••••••'
            required 
          />
        </div>

        <button className='bg-primary text-white w-full py-3.5 mt-4 rounded-xl text-base font-bold shadow-md hover:bg-blue-700 transition-all active:scale-95'>
          {state === 'Sign Up' ? 'Register Account' : 'Login Now'}
        </button>

        <div className='w-full text-center mt-2'>
          {state === 'Sign Up' ? (
            <p className='text-sm font-medium'>Already have an account? <span onClick={() => setState('Login')} className='text-primary font-bold cursor-pointer hover:underline'>Login here</span></p>
          ) : (
            <p className='text-sm font-medium'>Need a new account? <span onClick={() => setState('Sign Up')} className='text-primary font-bold cursor-pointer hover:underline'>Click here</span></p>
          )}
        </div>
      </div>
    </form>
  )
}

export default Login