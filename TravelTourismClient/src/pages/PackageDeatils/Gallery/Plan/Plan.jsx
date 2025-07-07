import { FaCalendarDay } from 'react-icons/fa'
import { BsDot } from 'react-icons/bs'
import PropTypes from 'prop-types'

const Plan = ({ tour_plan }) => {
  return (
    <div className='mx-auto px-4 py-10 w-full max-w-5xl'>
      <div className='space-y-6'>
        {tour_plan.map((day, index) => (
          <div
            key={index}
            className='flex gap-4 bg-white shadow-lg hover:shadow-xl p-6 border-sky-500 border-l-8 rounded-lg transition'
          >
            <div className='mt-1 text-sky-500 text-3xl'>
              <FaCalendarDay />
            </div>
            <div>
              <h3 className='mb-2 font-bold text-gray-800 text-xl md:text-2xl'>
                Day {day.day}: {day.title}
              </h3>
              <div className='flex items-start text-gray-700 text-base leading-relaxed'>
                <BsDot className='mt-1 text-xl' />
                <p>{day.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

Plan.propTypes = {
    tour_plan: PropTypes.object.isRequired
}

export default Plan
