import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

const SingleTypePackage = ({ spot }) => {
  const { _id, spot_image, tour_type, trip_title, price } = spot

  return (
    <div className='bg-white/20 shadow-xl backdrop-blur-md border border-white/30 rounded-2xl w-80 hover:scale-105 transition-all duration-300'>
      <figure className='px-5 pt-5'>
        <img
          src={spot_image}
          alt='Spot'
          className='rounded-xl w-[310px] h-[200px] object-cover hover:scale-105 transition-transform duration-300'
        />
      </figure>
      <div className='text-center card-body'>
        <h2 className='font-bold text-slate-800 text-lg'>{trip_title}</h2>
        <p className='text-gray-500 text-sm italic'>{tour_type}</p>
        <p className='font-semibold text-emerald-600 text-md'>
          Price: ${price}
        </p>
        <div className='mt-4'>
          <Link to={`/details/${_id}`}>
            <button className='bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-full text-white btn'>
              View Package
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

SingleTypePackage.propTypes = {
  spot: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    spot_image: PropTypes.string.isRequired,
    tour_type: PropTypes.string.isRequired,
    trip_title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired
  }).isRequired
};

export default SingleTypePackage
