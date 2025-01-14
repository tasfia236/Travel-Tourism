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
  // console.log(guides)

  return (
    <div className='px-12 py-6'>
      <div className='overflow-x-auto'>
        <table className='mt-10 w-full table table-zebra'>
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Education</th>
            </tr>
          </thead>
          <tbody>
            {guides.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <img
                    className='rounded-full w-12 h-12'
                    src={user.image}
                    alt=''
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.number}</td>
                <td>{user.education}</td>
                <td>
                  <Link to={`/guideDetails/${user._id}`}>
                    <button className='bg-blue-600 text-white btn btn-sm'>
                      Details
                    </button>
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
