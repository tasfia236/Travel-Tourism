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
 // // console.log(spots)

  if (isPending) {
    return <span className='text-primary loading loading-spinner'></span>
  }

  if (isError) {
    return <p>{error.message}</p>
  }

  return (
    <div className='flex flex-col justify-center items-center mx-auto px-2 pb-12'>
      <h1 className='pt-24 pb-12 font-black text-4xl text-center text-sky-600'>
        All Packages
      </h1>
      <div className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {spots?.map(spot => (
          <PackageCard
            key={spot._id}
            spot={spot}
            refetch={refetch}
          ></PackageCard>
        ))}
      </div>
    </div>
  )
}

export default AllPackages
