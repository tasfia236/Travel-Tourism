import PropTypes from 'prop-types'

const AllGuides = ({ guides }) => {
  return (
    <div className='px-4 py-10 overflow-x-auto'>
      <table className='table bg-white shadow rounded-lg w-full overflow-hidden text-sm'>
        <thead className='bg-sky-100 text-sky-800'>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {guides.map((user, index) => (
            <tr key={user._id} className='hover:bg-sky-50 transition'>
              <td>{index + 1}</td>
              <td>
                <img
                  className='rounded-full w-10 h-10 object-cover'
                  src={user.image}
                  alt={user.name}
                />
              </td>
              <td className='font-semibold'>{user.name}</td>
              <td className='text-gray-600'>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

AllGuides.propTypes = {
  guides: PropTypes.object.isRequired
}

export default AllGuides
