import redHeart from '../../../../assets/icons/red_hearts.png'
import heartOutline from '../../../../assets/icons/heart_outline.png'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import useAxiosPublic from '../../../../hooks/useAxiosPublic'
import useAuth from '../../../../hooks/useAuth'

const SinglePackage = ({ spot, refetch }) => {
  const {
    _id,
    spot_image,
    tour_type,
    trip_title,
    price,
    wish_email = []
  } = spot
  const axiosPublic = useAxiosPublic()
  const { user } = useAuth()

  const wishlistChange = id => {
    const isAlreadyInWishlist = wish_email.includes(user?.email)
    const newWishValue = isAlreadyInWishlist ? 0 : 1

    axiosPublic
      .patch(`/wishspots/${id}`, {
        wish: newWishValue,
        wish_email: user.email
      })
      .then(res => {
        if (res.data.modifiedCount > 0) {
          refetch?.()
          Swal.fire({
            title: 'Success',
            text: isAlreadyInWishlist
              ? 'Removed from Wishlist'
              : 'Added to Wishlist',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <div className='bg-white shadow-lg hover:shadow-2xl mx-auto rounded-2xl w-full max-w-sm overflow-hidden hover:scale-[1.02] transition'>
      <div className='relative'>
        <img
          src={spot_image}
          alt={trip_title}
          className='w-full h-48 object-cover'
        />
        <button
          onClick={() => wishlistChange(_id)}
          className='top-3 left-3 absolute bg-white/70 shadow backdrop-blur-sm p-2 rounded-full'
        >
          <img
            src={wish_email.includes(user?.email) ? redHeart : heartOutline}
            alt='wishlist'
            className='w-6 h-6'
          />
        </button>
      </div>
      <div className='flex flex-col justify-between p-5 h-[230px] text-center'>
        <div>
          <h3 className='font-bold text-sky-700 text-lg line-clamp-2'>
            {trip_title}
          </h3>
          <p className='mt-1 text-gray-500 text-sm'>{tour_type}</p>
          <p className='mt-2 font-semibold text-emerald-600 text-xl'>
            ${price}
          </p>
        </div>
        <Link to={`/details/${_id}`} className='mt-4'>
          <button className='bg-sky-600 hover:bg-sky-700 py-2 rounded-full w-full font-medium text-white transition'>
            View Package
          </button>
        </Link>
      </div>
    </div>
  )
}

export default SinglePackage
