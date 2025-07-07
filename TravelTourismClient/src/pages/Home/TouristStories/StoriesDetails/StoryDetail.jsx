import { useLoaderData } from 'react-router-dom';
import { FacebookShareButton, WhatsappShareButton } from 'react-share';
import { motion } from 'framer-motion';

const StoryDetail = () => {
  const story = useLoaderData();
  const { imageUrl, title, content, author, date } = story;
  const shareUrl = window.location.href;

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-[#dff9fb] via-[#ffffff] to-[#c7ecee] px-4 py-20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-white/40 shadow-xl backdrop-blur-lg p-8 md:p-14 border border-white/30 rounded-3xl w-full max-w-4xl text-center"
      >
        {/* Image */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="shadow-lg mb-8 border border-white rounded-xl w-full max-h-[450px] object-cover"
          />
        )}

        {/* Title */}
        <h1 className="bg-clip-text bg-gradient-to-r from-[#22a6b3] to-[#30336b] drop-shadow mb-6 font-extrabold text-transparent text-4xl md:text-5xl uppercase tracking-wide">
          {title}
        </h1>

        {/* Content */}
        <p className="mb-10 text-gray-800 text-lg text-left leading-loose whitespace-pre-wrap">
          {content}
        </p>

        {/* Meta Info */}
        <div className="flex md:flex-row flex-col justify-between gap-4 mb-12 text-gray-600 text-sm text-left">
          <p>
            <span className="font-semibold text-gray-800">Author:</span> {author}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Date:</span> {date}
          </p>
        </div>

        {/* Share Buttons */}
        <div className="flex flex-wrap justify-center gap-6">
          <FacebookShareButton url={shareUrl} quote={title}>
            <button className="bg-blue-600 hover:bg-blue-700 shadow-md px-6 py-2 rounded-full text-white transition-all duration-300 neon-btn">
              Share on Facebook
            </button>
          </FacebookShareButton>

          <WhatsappShareButton url={shareUrl} title={title}>
            <button className="bg-green-600 hover:bg-green-700 shadow-md px-6 py-2 rounded-full text-white transition-all duration-300 neon-btn">
              Share on WhatsApp
            </button>
          </WhatsappShareButton>
        </div>
      </motion.div>
    </div>
  );
};

export default StoryDetail;
