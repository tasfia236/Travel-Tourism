import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { FreeMode, Pagination } from 'swiper/modules'
import { Link } from 'react-router-dom'

import '../../../assets/tourtype.css'
import { Autoplay } from 'swiper/modules'
import sports from '../../../assets/tpes/sports.jpeg'
import desert from '../../../assets/tpes/Desert.jpeg'
import walking from '../../../assets/tpes/walkinng.jpeg'
import hiking from '../../../assets/tpes/hiking.jpeg'
import air from '../../../assets/tpes/air rides.jpeg'
import historical from '../../../assets/tpes/historical.jpeg'
import wildlife from '../../../assets/tpes/wildlife.jpeg'

const types = [
  { name: 'Sports', img: sports },
  { name: 'WildLife', img: wildlife },
  { name: 'Walking', img: walking },
  { name: 'Air Rides', img: air },
  { name: 'Desert', img: desert },
  { name: 'Hiking', img: hiking },
  { name: 'Historical', img: historical }
]

const TourType = () => {
  return (
    <div className='bg-gradient-to-br from-[#e0f7fa] to-[#f0f4ff] px-6 md:px-16 py-20 w-full text-center'>
      <h1 className='bg-clip-text bg-gradient-to-r from-sky-600 to-emerald-500 drop-shadow-md mb-12 font-extrabold text-transparent text-2xl lg:text-3xl uppercase tracking-wide'>
        Discover Your Adventure
      </h1>

      <Swiper
        autoplay={{ delay: 3000 }}
        slidesPerView={1.5}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 }
        }}
        spaceBetween={25}
        freeMode
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination, Autoplay]}
        className='mx-auto max-w-7xl'
      >
        {types.map(({ name, img }) => (
          <SwiperSlide key={name}>
            <Link to={`/tourtype/${name.toLowerCase()}`}>
              <div className='group relative shadow-2xl backdrop-blur-lg rounded-3xl overflow-hidden hover:scale-[1.03] transition-transform duration-300'>
                <img
                  src={img}
                  alt={name}
                  className='group-hover:brightness-75 w-full h-60 object-cover transition-all duration-300'
                />
                <div className='absolute inset-0 flex justify-center items-center bg-black/30 group-hover:bg-black/50 rounded-3xl transition-colors duration-300'>
                  <h2 className='drop-shadow-lg font-extrabold text-white text-2xl lg:text-3xl uppercase tracking-wider'>
                    {name}
                  </h2>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default TourType
