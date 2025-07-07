import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const TouristStories = () => {
  const { isPending, isError, error, data: stories } = useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      const res = await fetch('https://travel-tourism-seven.vercel.app/stories');
      return res.json();
    }
  });

  if (isPending) {
    return (
      <div className="flex justify-center py-10">
        <span className="text-sky-600 text-2xl loading loading-spinner"></span>
      </div>
    );
  }

  if (isError) {
    return <p className="mt-10 font-medium text-red-600 text-center">{error.message}</p>;
  }

  return (
    <div className="bg-white mx-auto p-20 text-center">
      <h2 className="bg-clip-text bg-gradient-to-r from-sky-600 to-emerald-500 mb-12 font-extrabold text-transparent text-3xl lg:text-4xl uppercase tracking-wide">
        Tourist Stories
      </h2>

      <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
        {stories?.slice(0, 4).map((story) => (
          <Link
            to={`/story/${story._id}`}
            key={story._id}
            className="bg-white/80 shadow-md hover:shadow-xl backdrop-blur-lg p-6 border border-sky-100 hover:border-sky-400 rounded-2xl text-left transition-transform hover:-translate-y-1 duration-300"
          >
            <h3 className="mb-3 font-bold text-sky-700 text-2xl">{story.title}</h3>
            <p className="text-gray-700 text-sm line-clamp-4 leading-relaxed">{story.content}</p>
            <span className="inline-block mt-4 font-medium text-sky-600 text-sm hover:underline">
              Read more →
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <Link
          to="/all-stories"
          className="inline-block hover:bg-sky-600 px-6 py-3 border border-sky-600 rounded-full font-semibold text-sky-700 hover:text-white tracking-wide transition duration-300"
        >
          View All Stories
        </Link>
      </div>
    </div>
  );
};

export default TouristStories;
