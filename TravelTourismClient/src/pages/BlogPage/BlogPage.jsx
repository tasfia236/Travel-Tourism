
const blogs = [
  {
    id: 1,
    title: 'Top 10 Places to Visit in Asia',
    date: 'July 7, 2025',
    author: 'Travel Explorer',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
    description:
      'Discover the breathtaking landscapes, cultural landmarks, and culinary adventures that await you across Asia.',
  },
  {
    id: 2,
    title: 'Why You Should Travel Solo at Least Once',
    date: 'July 4, 2025',
    author: 'Wander Woman',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    description:
      'Solo travel opens your mind and helps you discover who you really are. Here’s how to make the most of it.',
  },
  {
    id: 3,
    title: 'Budget Travel: Explore More with Less',
    date: 'June 25, 2025',
    author: 'Globe Trotter',
    image: 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=800&q=80',
    description:
      'Travel doesn’t have to break the bank. Here’s a guide to saving money while still having unforgettable adventures.',
  },
];


const BlogPage = () => {
  return (
    <div className='bg-gradient-to-b from-sky-50 via-white to-blue-100 px-6 py-20 min-h-screen'>
      <div className='mx-auto max-w-7xl'>
        <h1 className='mb-12 font-extrabold text-sky-600 text-4xl text-center'>
          Travel Blog
        </h1>

        <div className='gap-8 grid md:grid-cols-2 lg:grid-cols-3'>
          {blogs.map(blog => (
            <div
              key={blog.id}
              className='bg-white shadow-lg hover:shadow-xl rounded-2xl overflow-hidden transition duration-300'
            >
              <img
                src={blog.image}
                alt={blog.title}
                className='w-full h-48 object-cover'
              />
              <div className='p-5'>
                <h2 className='font-bold text-sky-700 hover:text-sky-900 text-xl transition'>
                  {blog.title}
                </h2>
                <p className='mt-1 text-gray-500 text-sm'>
                  {blog.date} • by {blog.author}
                </p>
                <p className='mt-3 text-gray-700 line-clamp-3'>
                  {blog.description}
                </p>
                <button className='inline-block bg-sky-500 hover:bg-sky-600 shadow-md mt-4 px-4 py-2 rounded-full font-semibold text-white text-sm transition'>
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogPage
