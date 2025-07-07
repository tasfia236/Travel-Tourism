import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const AllStories = () => {
  const { isPending, isError, error, data: stories } = useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      const res = await fetch('https://travel-tourism-server-six.vercel.app/allstories');
      return res.json();
    }
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="text-sky-600 text-2xl loading loading-spinner"></span>
      </div>
    );
  }

  if (isError) {
    return <p className="mt-10 font-semibold text-red-600 text-center">{error.message}</p>;
  }

  return (
    <div className="mx-auto px-6 lg:px-12 py-20 max-w-7xl text-center">
      <h2 className="bg-clip-text bg-gradient-to-r from-sky-600 to-teal-500 drop-shadow-md mb-12 font-black text-transparent text-3xl lg:text-5xl uppercase tracking-wide">
        Tourist Stories
      </h2>

      <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {stories.map(story => (
          <Link
            to={`/story/${story._id}`}
            key={story._id}
            className="group bg-white/80 shadow-md hover:shadow-2xl backdrop-blur-xl border border-sky-200 rounded-2xl overflow-hidden transition-all hover:-translate-y-1 duration-300"
          >
            <div className="flex flex-col justify-between p-6 h-full">
              <h3 className="font-extrabold text-sky-700 group-hover:text-sky-900 text-2xl transition-colors duration-300">
                {story.title}
              </h3>
              <p className="mt-4 text-gray-700 text-sm line-clamp-5 leading-relaxed">
                {story.content}
              </p>
              <span className="inline-block mt-6 font-medium text-sky-600 text-sm text-right group-hover:underline">
                Read more →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllStories;
