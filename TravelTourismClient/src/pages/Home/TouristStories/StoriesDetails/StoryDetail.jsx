
import { useLoaderData } from 'react-router-dom';
import { FacebookShareButton } from 'react-share'; // Assuming react-share package is installed

const StoryDetail = () => {

    const story = useLoaderData();

    const { imageUrl, title, content, author, date } = story;
    // console.log(story);

    const shareUrl = window.location.href;

    return (
        <div className="p-32 text-center">
            {story.imageUrl && <img src={imageUrl} alt={title} className="shadow-md mb-4 rounded-lg w-full" />}
            <h2 className="p-4 font-bold text-3xl text-teal-800">{title}</h2>
            <p className="mb-4 text-base text-gray-700">{content}</p>
            <p className="mb-4 text-base text-gray-700"><span className='font-bold'>Author Name:</span> {author}</p>
            <p className="mb-4 text-base text-gray-700"><span className='font-bold'>Post Date:</span> {date}</p>
            <div className="bg-blue-600 text-white btn" >
                <FacebookShareButton url={shareUrl} className="bg-blue-600 hover:bg-blue-700 shadow-md px-4 py-2 rounded-md text-white transition duration-300">
                    Share on Facebook
                </FacebookShareButton>
            </div>
        </div>
    );
};

export default StoryDetail;
