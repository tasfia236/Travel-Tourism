import redHeart from '../../assets/icons/red_hearts.png'
import heartOutline from '../../assets/icons/heart_outline.png'
import useAxiosPublic from '../../hooks/useAxiosPublic'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import PropTypes from 'prop-types'

const PackageCard = ({ spot, refetch }) => {
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
    if (!user || !user.email) {
      Swal.fire({
        icon: 'warning',
        title: 'Please login to use wishlist!',
        confirmButtonText: 'Login'
      })
      return
    }

    const isAlreadyInWishlist = wish_email.includes(user.email)
    const newWishValue = isAlreadyInWishlist ? 0 : 1

    axiosPublic
      .patch(`/wishspots/${id}`, {
        wish: newWishValue,
        wish_email: user.email
      })
      .then(res => {
        if (res.data.modifiedCount > 0) {
          refetch()
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
    <div className='group relative flex flex-col justify-between bg-white/40 shadow-md hover:shadow-2xl backdrop-blur-xl border border-white/20 rounded-2xl w-[90%] h-full overflow-hidden hover:scale-[1.02] transition-all duration-300'>
      {/* Image */}
      <div className='relative'>
        <img
          src={spot_image}
          alt='Spot'
          className='rounded-t-2xl w-full h-[200px] object-cover'
        />
        <button
          onClick={() => wishlistChange(_id)}
          className='top-3 left-3 absolute bg-white/60 backdrop-blur-sm p-2 rounded-full hover:scale-110 transition'
        >
          <img
            src={wish_email.includes(user?.email) ? redHeart : heartOutline}
            className='w-6 h-6'
            alt='wishlist'
          />
        </button>
      </div>

      {/* Card Body */}
      <div className='flex flex-col flex-grow justify-between p-5 text-center'>
        <h2 className='font-bold text-sky-700 text-xl line-clamp-2'>
          {trip_title}
        </h2>
        <p className='mt-1 text-gray-600'>{tour_type}</p>
        <p className='mt-2 font-semibold text-emerald-600'>Price: ${price}</p>

        <Link to={`/details/${_id}`}>
          <button className='bg-sky-600 hover:bg-sky-700 mt-4 px-5 py-2 rounded-full text-white transition-all duration-300'>
            View Package
          </button>
        </Link>
      </div>
    </div>
  )
}

PackageCard.propTypes = {
  spot: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    spot_image: PropTypes.string.isRequired,
    tour_type: PropTypes.string.isRequired,
    trip_title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    wish_email: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  refetch: PropTypes.func.isRequired
}

export default PackageCard
