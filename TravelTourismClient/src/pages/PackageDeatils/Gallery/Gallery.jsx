import '../../../assets/css/Gallery.css'
import PropTypes from 'prop-types'

const Gallery = ({ images }) => {
  return (
    <div className='gap-4 grid grid-cols-2 md:grid-cols-3 p-4'>
      {images.map((img, i) => (
        <div key={i} className='shadow-md rounded-lg overflow-hidden'>
          <img
            src={img}
            alt={`Spot ${i}`}
            className='w-full h-48 object-cover hover:scale-105 transition-transform duration-300'
          />
        </div>
      ))}
    </div>
  )
}

Gallery.propTypes = {
    images: PropTypes.array
}

export default Gallery
