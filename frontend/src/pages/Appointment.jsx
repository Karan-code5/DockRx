import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {

    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(false)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const navigate = useNavigate()

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
    }

    const getAvailableSolts = async () => {

        setDocSlots([])

        // getting current date
        let today = new Date()

        for (let i = 0; i < 7; i++) {

            // getting date with index 
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            // setting end time of the date with index
            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            // setting hours 
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = [];


            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime

                const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

                if (isSlotAvailable) {

                    // Add slot to array
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }

                // Increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots(prev => ([...prev, timeSlots]))

        }

    }

    const bookAppointment = async () => {

        if (!token) {
            toast.warning('Login to book appointment')
            return navigate('/login')
        }

        const date = docSlots[slotIndex][0].datetime

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        const slotDate = day + "_" + month + "_" + year

        try {

            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getDoctosData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts()
        }
    }, [docInfo])

    return docInfo ? (
        <div className='py-5'>

            {/* ---------- Doctor Details ----------- */}
            <div className='flex flex-col sm:flex-row gap-8'>
                <div className='bg-primary w-full sm:max-w-72 rounded-2xl overflow-hidden shadow-lg'>
                    <img className='w-full h-full object-cover' src={docInfo.image} alt={docInfo.name} />
                </div>

                <div className='flex-1 border border-slate-200 rounded-2xl p-8 bg-white shadow-sm relative -mt-12 sm:mt-0 mx-2 sm:mx-0'>

                    {/* ----- Doc Info : name, degree, experience ----- */}
                    <div className='flex flex-col gap-2'>
                        <p className='flex items-center gap-2 text-3xl font-bold text-slate-800'>
                            {docInfo.name} 
                            <img className='w-5' src={assets.verified_icon} alt="Verified" />
                        </p>
                        <div className='flex items-center gap-3 text-slate-500 font-semibold'>
                            <p>{docInfo.degree} — {docInfo.speciality}</p>
                            <span className='px-2 py-0.5 border border-slate-200 rounded-lg text-xs bg-slate-50'>{docInfo.experience} exp</span>
                        </div>
                    </div>

                    {/* ----- Doc About ----- */}
                    <div className='mt-6'>
                        <p className='flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wider'>
                            About <img className='w-3.5 opacity-50' src={assets.info_icon} alt="" />
                        </p>
                        <p className='text-slate-600 leading-relaxed max-w-[700px] mt-2 font-medium'>{docInfo.about}</p>
                    </div>

                    <div className='mt-8 pt-6 border-t border-slate-100'>
                        <p className='text-slate-500 font-bold'>
                            Appointment Fee: <span className='text-slate-900 text-xl ml-1'>{currencySymbol}{docInfo.fees}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Booking slots */}
            <div className='sm:ml-80 mt-12 font-bold text-slate-700'>
                <p className='text-lg mb-6'>Select Booking Slot</p>
                
                <div className='flex gap-4 items-center w-full overflow-x-auto pb-4 no-scrollbar'>
                    {docSlots.length && docSlots.map((item, index) => (
                        <div 
                            onClick={() => setSlotIndex(index)} 
                            key={index} 
                            className={`flex flex-col items-center justify-center py-5 min-w-[70px] rounded-2xl cursor-pointer transition-all duration-200 border-2 ${slotIndex === index ? 'bg-primary border-primary text-white shadow-md shadow-blue-200' : 'bg-white border-slate-100 hover:border-slate-300 text-slate-500'}`}
                        >
                            <p className='text-xs uppercase opacity-80 mb-1'>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p className='text-lg font-black'>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
                </div>

                <div className='flex items-center gap-3 w-full overflow-x-auto mt-8 pb-4 no-scrollbar'>
                    {docSlots.length && docSlots[slotIndex].map((item, index) => (
                        <p 
                            onClick={() => setSlotTime(item.time)} 
                            key={index} 
                            className={`text-sm font-bold flex-shrink-0 px-6 py-3 rounded-xl cursor-pointer transition-all duration-200 border-2 ${item.time === slotTime ? 'bg-primary border-primary text-white shadow-md shadow-blue-100' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'}`}
                        >
                            {item.time.toLowerCase()}
                        </p>
                    ))}
                </div>

                <button 
                    onClick={bookAppointment} 
                    className='bg-primary text-white text-base font-bold px-12 py-4 rounded-xl mt-10 hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95 flex items-center gap-2'
                >
                    Confirm Appointment
                </button>
            </div>

            {/* Listing Releated Doctors */}
            <div className='mt-20'>
                <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
            </div>
        </div>
    ) : null
}

export default Appointment