import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {

    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [payment, setPayment] = useState('')

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    // Getting User Appointments Data Using API
    const getUserAppointments = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            setAppointments(data.appointments.reverse())

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to cancel appointment Using API
    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Appointment Payment',
            description: "Appointment Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {

                console.log(response)

                try {
                    const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } });
                    if (data.success) {
                        navigate('/my-appointments')
                        getUserAppointments()
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    // Function to make payment using razorpay
    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
            if (data.success) {
                initPay(data.order)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to make payment using stripe
    const appointmentStripe = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { appointmentId }, { headers: { token } })
            if (data.success) {
                const { session_url } = data
                window.location.replace(session_url)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }



    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    return (
        <div className='py-5'>
            <p className='pb-4 mt-8 text-2xl font-bold text-slate-800 border-b border-slate-100'>My Appointments</p>
            <div className='mt-4 flex flex-col gap-4'>
                {appointments.map((item, index) => (
                    <div key={index} className='flex flex-col sm:flex-row gap-6 py-6 px-4 border border-slate-100 rounded-2xl bg-white hover:shadow-md transition-all group'>
                        <div className='w-full sm:w-40 h-40 rounded-xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100'>
                            <img className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' src={item.docData.image} alt={item.docData.name} />
                        </div>
                        <div className='flex-1 flex flex-col gap-1 text-slate-600'>
                            <p className='text-slate-900 text-xl font-bold'>{item.docData.name}</p>
                            <p className='text-primary font-bold text-sm tracking-wide uppercase'>{item.docData.speciality}</p>
                            
                            <div className='mt-3 flex flex-col gap-1.5'>
                                <p className='text-slate-800 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5'>
                                    <span className='w-1.5 h-1.5 rounded-full bg-slate-400'></span> Address
                                </p>
                                <p className='text-sm font-medium leading-relaxed'>{item.docData.address.line1}<br />{item.docData.address.line2}</p>
                            </div>
                            
                            <div className='mt-3 flex items-center gap-2'>
                                <span className='text-slate-800 font-bold text-xs uppercase tracking-wider'>Date & Time:</span>
                                <span className='text-sm font-bold bg-slate-50 px-3 py-1 rounded-lg border border-slate-100 text-slate-700'>{slotDateFormat(item.slotDate)} | {item.slotTime}</span>
                            </div>
                        </div>

                        <div className='flex flex-col gap-3 justify-end min-w-[200px]'>
                            {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                                <button onClick={() => setPayment(item._id)} className='w-full py-3 px-6 rounded-xl font-bold text-sm bg-primary text-white hover:bg-blue-700 transition-all shadow-sm active:scale-95'>Pay Online</button>
                            )}
                            
                            {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                                <>
                                    <button onClick={() => appointmentStripe(item._id)} className='w-full py-2.5 px-6 rounded-xl border-2 border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center grayscale hover:grayscale-0'>
                                        <img className='h-5' src={assets.stripe_logo} alt="Stripe" />
                                    </button>
                                    <button onClick={() => appointmentRazorpay(item._id)} className='w-full py-2.5 px-6 rounded-xl border-2 border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center grayscale hover:grayscale-0'>
                                        <img className='h-5' src={assets.razorpay_logo} alt="Razorpay" />
                                    </button>
                                </>
                            )}
                            
                            {!item.cancelled && item.payment && !item.isCompleted && (
                                <div className='w-full py-3 px-6 rounded-xl font-bold text-sm bg-green-50 text-green-600 border border-green-100 text-center flex items-center justify-center gap-2'>
                                    <span className='w-2 h-2 rounded-full bg-green-500'></span> Paid
                                </div>
                            )}

                            {item.isCompleted && (
                                <div className='w-full py-3 px-6 rounded-xl font-bold text-sm bg-blue-50 text-primary border border-blue-100 text-center flex items-center justify-center gap-2'>
                                    <span className='w-2 h-2 rounded-full bg-primary'></span> Completed
                                </div>
                            )}

                            {!item.cancelled && !item.isCompleted && (
                                <button onClick={() => cancelAppointment(item._id)} className='w-full py-3 px-6 rounded-xl font-bold text-sm text-slate-400 border-2 border-slate-100 hover:border-red-100 hover:bg-red-50 hover:text-red-500 transition-all active:scale-95'>Cancel Appointment</button>
                            )}
                            
                            {item.cancelled && !item.isCompleted && (
                                <div className='w-full py-3 px-6 rounded-xl font-bold text-sm bg-red-50 text-red-500 border border-red-100 text-center flex items-center justify-center gap-2'>
                                    <span className='w-2 h-2 rounded-full bg-red-500'></span> Cancelled
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyAppointments