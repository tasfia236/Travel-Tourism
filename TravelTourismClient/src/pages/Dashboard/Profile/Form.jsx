import Swal from 'sweetalert2'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import PropTypes from 'prop-types'

const Form = ({ profile, refetch }) => {
  const axiosSecure = useAxiosSecure()
  const data = profile[0] || {}

  const updateProfile = e => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const email = form.email.value
    const image = form.photoURL.value
    const oldpass = form.oldpass.value
    const newpass = form.newpass.value

    const updateInfo = { name, email, image, newpass }

    if (oldpass === data?.password) {
      axiosSecure
        .patch(`/users/tourGuide/${data?._id}`, updateInfo)
        .then(res => {
          if (res.data.modifiedCount > 0) {
            refetch()
            Swal.fire({
              icon: 'success',
              title: `Updated ${data?.name}'s Profile!`,
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Incorrect Password',
        text: 'Old password is incorrect'
      })
    }
  }

  return (
    <div className='mx-auto mt-3 px-6 max-w-5xl'>
      <h2 className='mb-12 font-bold text-sky-600 text-3xl text-center'>
        {data?.role} Profile Update Form
      </h2>

      <form
        onSubmit={updateProfile}
        className='space-y-6 bg-white/60 shadow-xl backdrop-blur-xl p-8 border border-white/30 rounded-2xl'
      >
        <div className='gap-6 grid grid-cols-1 md:grid-cols-2'>
          <div>
            <label className='font-semibold text-sky-700 label'>Name</label>
            <input
              type='text'
              name='name'
              defaultValue={data?.name}
              className='input-bordered w-full input'
            />
          </div>
          <div>
            <label className='font-semibold text-sky-700 label'>Email</label>
            <input
              type='email'
              name='email'
              defaultValue={data?.email}
              className='input-bordered w-full input'
            />
          </div>
          <div>
            <label className='font-semibold text-sky-700 label'>
              Image URL
            </label>
            <input
              type='text'
              name='photoURL'
              defaultValue={data?.image}
              className='input-bordered w-full input'
            />
          </div>
          <div>
            <label className='font-semibold text-sky-700 label'>
              Old Password
            </label>
            <input
              type='password'
              name='oldpass'
              className='input-bordered w-full input'
              required
            />
          </div>
          <div>
            <label className='font-semibold text-sky-700 label'>
              New Password
            </label>
            <input
              type='password'
              name='newpass'
              defaultValue={data?.password}
              className='input-bordered w-full input'
            />
          </div>
        </div>

        <div className='text-center'>
          <button className='bg-gradient-to-r from-sky-500 hover:from-blue-600 via-cyan-500 to-blue-600 hover:to-cyan-500 shadow-lg px-6 py-3 rounded-xl w-full max-w-sm font-semibold text-white transition-all duration-300'>
            Update Profile
          </button>
        </div>
      </form>
    </div>
  )
}

Form.propTypes = {
  profile: PropTypes.array.isRequired,
  refetch: PropTypes.func.isRequired
}

export default Form
