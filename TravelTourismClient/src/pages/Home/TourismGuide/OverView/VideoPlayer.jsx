import video from '../../../../assets/Video.mp4'

const VideoPlayer = () => {
  return (
    <div className='flex justify-center items-center'>
      <video
        controls
        className='shadow-lg border border-sky-200 rounded-xl w-full max-w-2xl'
      >
        <source src={video} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default VideoPlayer