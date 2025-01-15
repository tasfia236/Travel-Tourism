import { useLoaderData } from 'react-router-dom'
import { FacebookShareButton, WhatsappShareButton } from 'react-share' // Assuming react-share package is installed

const StoryDetail = () => {
  const story = useLoaderData()

  const { imageUrl, title, content, author, date } = story
  // console.log(story);

  const shareUrl = window.location.href

  return (
    <div className='p-32 text-center'>
      {story.imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className='shadow-md mb-4 rounded-lg w-full'
        />
      )}
      <h2 className='p-4 font-bold text-3xl text-teal-800'>{title}</h2>
      <p className='mb-4 text-base text-gray-700'>{content}</p>
      <p className='mb-4 text-base text-gray-700'>
        <span className='font-bold'>Author Name:</span> {author}
      </p>
      <p className='mb-4 text-base text-gray-700'>
        <span className='font-bold'>Post Date:</span> {date}
      </p>
      <div className='flex justify-center items-center gap-3'>
        <div className='bg-blue-600 shadow-md px-5 rounded-md text-white'>
          <FacebookShareButton
            url={`www.facbook.com`}
            className='bg-blue-600 hover:bg-blue-700 text-white transition duration-300 btn'
          >
            Share on Facebook
          </FacebookShareButton>
        </div>
        <div className='bg-green-600 shadow-md px-5 rounded-md text-white'>
          <WhatsappShareButton
            url={`www.whatsapp.com`}
            className='bg-green-600 hover:bg-green-700 text-white transition duration-300 btn'
          >
            Share on WhatsApp
          </WhatsappShareButton>
        </div>
      </div>
    </div>
  )
}

export default StoryDetail
