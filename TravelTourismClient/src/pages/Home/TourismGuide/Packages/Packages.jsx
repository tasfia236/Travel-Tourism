
import { useQuery } from '@tanstack/react-query'
import SinglePackage from './SinglePackage'
import { Link } from 'react-router-dom'

const Packages = () => {
  const { isPending, isError, error, data: spots } = useQuery({
    queryKey: ['spots'],
    queryFn: async () => {
      const res = await fetch('https://travel-tourism-seven.vercel.app/spots')
      return res.json()
    }
  })

  if (isPending) {
    return <span className='text-primary loading loading-spinner'></span>
  }

  if (isError) {
    return <p>{error.message}</p>
  }

  return (
    <div className='flex flex-col justify-center items-center gap-10 px-4 md:px-8 lg:px-16 py-12'>
      <h2 className='mb-4 font-extrabold text-sky-600 text-3xl text-center'>Featured Tour Packages</h2>

      <div className='gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {spots?.slice(0, 4).map(spot => (
          <SinglePackage key={spot._id} spot={spot} />
        ))}
      </div>

      <Link to='/allpackages'>
        <button className='bg-sky-600 hover:bg-sky-700 shadow-md px-6 py-2 rounded-lg text-white transition-all duration-300'>
          Explore All Packages
        </button>
      </Link>
    </div>
  )
}

export default Packages