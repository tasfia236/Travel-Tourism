import { useLoaderData } from 'react-router-dom'
import Gallery from './Gallery/Gallery'
import Plan from './Gallery/Plan/Plan'
import Booking from './Booking/Booking'
import AllGuides from './AllGuides/AllGuides'
import useAxiosPublic from '../../hooks/useAxiosPublic'
import { useQuery } from '@tanstack/react-query'
import useAuth from '../../hooks/useAuth'
import { FaCamera, FaStickyNote, FaWpforms } from 'react-icons/fa'
import { BsClock, BsPeopleFill } from 'react-icons/bs'

const Details = () => {
  const spot = useLoaderData()
  const axiosPublic = useAxiosPublic()
  const { user } = useAuth()

  const {
    images,
    tour_type,
    trip_title,
    price,
    description,
    tour_plan
  } = spot

  const { data: guides = [] } = useQuery({
    queryKey: ['guides'],
    queryFn: async () => {
      const res = await axiosPublic.get(`/guides/tourGuide`)
      return res.data
    }
  })

  return (
    <div className='bg-gradient-to-br from-sky-50 to-blue-100 px-4 py-20 w-full min-h-screen'>
      {/* Header Section */}
      <div className='mx-auto mb-10 max-w-6xl text-center'>
        <h1 className='mb-2 font-extrabold text-sky-700 text-4xl md:text-5xl'>
          {trip_title}
        </h1>
        <p className='text-gray-600 text-lg uppercase tracking-wider'>
          {tour_type}
        </p>
        <p className='mt-2 font-bold text-blue-900 text-2xl'>${price}</p>
      </div>

      {/* Gallery */}
      <section className='mx-auto mb-16 max-w-6xl'>
        <h2 className='flex justify-center items-center gap-2 mb-8 font-bold text-sky-600 text-3xl text-center'>
          <FaCamera /> Trip Gallery
        </h2>
        <Gallery images={images} />
      </section>

      {/* Description */}
      <section className='bg-white shadow-md mx-auto mb-12 p-6 rounded-lg max-w-4xl'>
        <h2 className='flex justify-start items-center gap-2 mb-4 font-semibold text-sky-700 text-2xl'>
          <FaStickyNote /> Trip Overview
        </h2>
        <p className='text-gray-800 text-lg leading-relaxed'>{description}</p>
      </section>

      {/* Tour Plan */}
      <section className='mx-auto mb-12 max-w-5xl'>
        <h2 className='flex justify-center items-center gap-2 mt-8 pt-6 font-extrabold text-sky-700 text-3xl text-center'>
          <BsClock /> Tour Plan Overview
        </h2>
        <Plan tour_plan={tour_plan} />
      </section>

      {/* Tour Guides */}
      <section className='mx-auto mb-12 max-w-5xl'>
        <h2 className='flex justify-center items-center gap-2 mb-8 font-extrabold text-sky-700 text-3xl text-center'>
          <BsPeopleFill /> Tour Guides
        </h2>
        <AllGuides guides={guides} />
      </section>

      {/* Booking */}
      <section className='mx-auto mb-12 max-w-5xl'>
        <h2 className='flex justify-center items-center gap-2 mb-8 font-extrabold text-sky-700 text-3xl text-center'>
          <FaWpforms /> Book This Trip
        </h2>
        <Booking guides={guides} user={user} spot={spot} />
      </section>
    </div>
  )
}

export default Details
