import { useQuery } from '@tanstack/react-query'
import useAxiosPublic from '../../../../hooks/useAxiosPublic'
import { Link } from 'react-router-dom'

const MeetGuides = () => {
  const axiosPublic = useAxiosPublic()

  const { data: guides = [] } = useQuery({
    queryKey: ['guides'],
    queryFn: async () => {
      const res = await axiosPublic.get(`/guides/tourGuide`)
      return res.data
    }
  })

  return (
    <div className='mx-auto px-6 md:px-12 py-10 max-w-7xl'>
      <h2 className='mb-4 font-extrabold text-sky-600 text-3xl text-center'>Meet Our Expert Tour Guides</h2>
      <div className='bg-white shadow-md rounded-lg overflow-x-auto'>
        <table className='w-full text-left table-auto'>
          <thead className='bg-sky-100 text-sky-700'>
            <tr>
              <th className='p-3'>#</th>
              <th className='p-3'>Photo</th>
              <th className='p-3'>Name</th>
              <th className='p-3'>Email</th>
              <th className='p-3'>Phone</th>
              <th className='p-3'>Education</th>
              <th className='p-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {guides.map((guide, i) => (
              <tr key={guide._id} className='border-b'>
                <td className='p-3'>{i + 1}</td>
                <td className='p-3'>
                  <img src={guide.image} alt='' className='rounded-full w-10 h-10' />
                </td>
                <td className='p-3'>{guide.name}</td>
                <td className='p-3'>{guide.email}</td>
                <td className='p-3'>{guide.number}</td>
                <td className='p-3'>{guide.education}</td>
                <td className='p-3'>
                  <Link to={`/guideDetails/${guide._id}`}>
                    <button className='bg-sky-600 hover:bg-sky-700 text-white btn btn-sm'>Details</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MeetGuides