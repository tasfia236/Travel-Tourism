import { useLoaderData } from 'react-router-dom'

const GuideDetails = () => {
  const guide = useLoaderData()
  const { name, email, image, number, education, skill, work } = guide

  return (
    <div className='mx-auto px-6 pt-20 pb-12 max-w-4xl text-center'>
      <img
        src={image}
        alt={name}
        className='shadow-lg mx-auto mb-6 border-4 border-sky-200 rounded-full w-36 md:w-48 lg:w-60 h-36 md:h-48 lg:h-60'
      />
      <h2 className='font-bold text-sky-700 text-2xl'>{name}</h2>
      <p className='mt-2 text-gray-600'>📧 {email}</p>
      <p className='text-gray-600'>📱 {number}</p>
      <p className='mb-6 text-gray-600'>🎓 {education}</p>

      <div className='space-y-4 mt-6 text-left'>
        <div>
          <h3 className='font-semibold text-sky-700 text-lg'>Skills</h3>
          <p className='text-gray-700'>{skill}</p>
        </div>
        <div>
          <h3 className='font-semibold text-sky-700 text-lg'>Work Experience</h3>
          <p className='text-gray-700'>{work}</p>
        </div>
      </div>
    </div>
  )
}

export default GuideDetails
