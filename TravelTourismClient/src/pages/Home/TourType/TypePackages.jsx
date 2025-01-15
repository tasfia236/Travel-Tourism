import { Link, useLoaderData } from 'react-router-dom'
import SingleTypePackage from './SingleTypePackage'

const TypePackages = () => {
  const types = useLoaderData()
  console.log(types[0].tour_type)

  return (
    <div className='flex flex-col justify-center items-center mx-auto px-2 pb-12'>
      <h1 className='pt-24 pb-12 font-black text-4xl text-center text-sky-600 uppercase'>
        {types[0].tour_type}
      </h1>
      <div className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {types?.slice(0, 3).map(spot => (
          <SingleTypePackage key={spot._id} spot={spot}></SingleTypePackage>
        ))}
      </div>
      <div className='border-3 pt-8'>
        <Link to='/allpackages'>
          <button className='mx-auto btn btn-outline'>All Packages</button>
        </Link>
      </div>
    </div>
  )
}

export default TypePackages
