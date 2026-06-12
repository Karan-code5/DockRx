import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import { backendUrl } from '../config'

const Login = () => {

  const [state, setState] = useState('Admin')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {

      if (state === 'Admin') {

        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          setAToken(data.token)
          localStorage.setItem('aToken', data.token)
        } else {
          toast.error(data.message)
        }

      } else {

        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          setDToken(data.token)
          localStorage.setItem('dToken', data.token)
        } else {
          toast.error(data.message)
        }

      }

    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }

  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center justify-center py-10'>
      <div className='flex flex-col gap-6 m-auto items-start p-10 min-w-[340px] sm:min-w-96 border border-slate-100 rounded-2xl bg-white text-slate-600 shadow-xl'>
        <div className='flex flex-col gap-2 w-full text-center'>
          <p className='text-3xl font-bold text-slate-800'><span className='text-primary'>{state}</span> Portal</p>
          <p className='text-sm font-medium text-slate-400'>Authorized access only</p>
        </div>

        <div className='w-full flex flex-col gap-1.5'>
          <p className='text-xs font-bold uppercase tracking-widest text-slate-400'>Authorized Email</p>
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            className='border border-slate-200 rounded-xl w-full px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-800' 
            type="email" 
            placeholder='admin@dockrx.com'
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
          Login to Dashboard
        </button>

        <div className='w-full text-center mt-2'>
          {state === 'Admin' ? (
            <p className='text-sm font-medium'>Doctor access? <span onClick={() => setState('Doctor')} className='text-primary font-bold cursor-pointer hover:underline'>Login here</span></p>
          ) : (
            <p className='text-sm font-medium'>Administrator? <span onClick={() => setState('Admin')} className='text-primary font-bold cursor-pointer hover:underline'>Login here</span></p>
          )}
        </div>
      </div>
    </form>
  )
}

export default Login
