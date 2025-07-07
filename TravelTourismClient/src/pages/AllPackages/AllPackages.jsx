import { useQuery } from '@tanstack/react-query'
import PackageCard from './PackageCard'
import useAxiosPublic from '../../hooks/useAxiosPublic'

const AllPackages = () => {
  const axiosPublic = useAxiosPublic()
  const {
    isPending,
    isError,
    error,
    data: spots,
    refetch
  } = useQuery({
    queryKey: ['spots'],
    queryFn: async () => {
      const res = await axiosPublic.get('/allspots')
      return res.data
    }
  })

  if (isPending) {
    return (
      <div className='flex justify-center pt-24'>
        <span className='text-sky-600 loading loading-spinner'></span>
      </div>
    )
  }

  if (isError) {
    return <p className='text-red-600 text-center'>{error.message}</p>
  }

  return (
    <div className='px-4 pt-24 pb-20 text-center'>
      <h1 className='bg-clip-text bg-gradient-to-r from-sky-500 to-sky-600 mb-10 font-extrabold text-transparent text-4xl uppercase tracking-widest'>
        All Tour Packages
      </h1>
      <div className='justify-items-center gap-y-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {spots?.map(spot => (
          <PackageCard key={spot._id} spot={spot} refetch={refetch} />
        ))}
      </div>
    </div>
  )
}

export default AllPackages
