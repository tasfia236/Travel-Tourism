import VideoPlayer from './VideoPlayer'

const Overview = () => {
  return (
    <div className='mx-auto px-4 md:px-16 lg:px-32 py-10 max-w-6xl'>
      <h2 className='mb-4 font-extrabold text-sky-600 text-3xl text-center'>Welcome to Your Travel Companion</h2>
      <p className='mb-10 text-gray-700 text-md text-center'>
        Your ultimate tourism and travel guide to inspire, inform, and help you plan your dream trips around the world.
      </p>
      <VideoPlayer />
    </div>
  )
}

export default Overview