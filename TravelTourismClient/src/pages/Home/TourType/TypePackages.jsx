import { Link, useLoaderData } from 'react-router-dom'
import SingleTypePackage from './SingleTypePackage'

const TypePackages = () => {
  const types = useLoaderData()

  if (!Array.isArray(types) || types.length === 0) {
    return (
      <div className='py-24 font-semibold text-red-600 text-xl text-center'>
        No tour packages found for this category.
      </div>
    )
  }

  console.log(types[0].tour_type)

  return (
    <div className='flex flex-col justify-center items-center mx-auto px-4 pb-16'>
      <h1 className='bg-clip-text bg-gradient-to-r from-sky-600 to-emerald-400 pt-24 pb-10 font-black text-transparent text-4xl text-center uppercase tracking-wider'>
        {types[0].tour_type} Packages
      </h1>

      <div className='gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {types?.slice(0, 3).map(spot => (
          <SingleTypePackage key={spot._id} spot={spot} />
        ))}
      </div>

      <div className='pt-10'>
        <Link to='/allpackages'>
          <button className='bg-gradient-to-r from-sky-500 to-emerald-400 shadow-lg px-6 py-2 rounded-full text-white hover:scale-105 duration-300 btn'>
            View All Packages
          </button>
        </Link>
      </div>
    </div>
  )
}



export default TypePackages
