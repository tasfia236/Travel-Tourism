import { useQuery } from '@tanstack/react-query'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import Form from './Form'
import useTourGuide from '../../../hooks/useTourGuide'
import { FaGraduationCap, FaLightbulb, FaPhoneSquareAlt, FaShoppingBag } from 'react-icons/fa'

const Profile = () => {
  const [isTourGuide] = useTourGuide()
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()

  const { data: profile = [], refetch } = useQuery({
    queryKey: ['profile', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user.email}`)
      return res.data
    }
  })

  const data = profile[0] || {}

  return (
    <div className='flex lg:flex-row flex-col bg-gradient-to-r from-sky-50 via-blue-50 to-white p-0 md:p-6 min-h-screen overflow-hidden'>
      {/* Left - Profile Visual */}
      <div className='flex flex-col justify-center items-center bg-white bg-opacity-90 shadow-2xl p-10 border-r rounded-r-3xl w-full lg:w-1/3'>
        <img
          src={data?.image}
          alt='Profile'
          className='shadow-lg mb-6 border-4 border-sky-300 rounded-full w-44 h-44 object-cover hover:scale-105 transition-transform'
        />
        <h2 className='font-extrabold text-blue-800 text-2xl'>{data?.name}</h2>
        <p className='text-gray-500'>{data?.email}</p>

        <div className='space-y-2 mt-6 px-4 w-full text-left'>
          <p>
            <span className='flex justify-start items-center gap-1 font-semibold text-sky-700'>
              <FaPhoneSquareAlt /> Phone:
            </span>{' '}
            {data?.number}
          </p>
          <p>
            <span className='flex justify-start items-center gap-1 font-semibold text-sky-700'>
              <FaGraduationCap /> Education:
            </span>{' '}
            {data?.education}
          </p>
          <p>
            <span className='flex justify-start items-center gap-1 font-semibold text-sky-700'>
              <FaLightbulb /> Skills:
            </span>{' '}
            {data?.skill}
          </p>
          <p>
            <span className='flex justify-start items-center gap-1 font-semibold text-sky-700'>
              <FaShoppingBag /> Work:
            </span>{' '}
            {data?.work}
          </p>
        </div>

        {isTourGuide && (
          <div className='bg-sky-100 mt-6 px-4 py-2 rounded-lg font-semibold text-sky-700 text-center'>
            ✅ Verified Tour Guide
          </div>
        )}
      </div>

      {/* Right - Form Area */}
      <div className='p-8 md:p-12 w-full lg:w-2/3 overflow-y-auto'>
        <Form profile={profile} refetch={refetch} />
      </div>
    </div>
  )
}

export default Profile
