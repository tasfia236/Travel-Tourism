import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';

const AllStories = () => {

    const { isPending, isError, error, data: stories } = useQuery({
        queryKey: ['stories'],
        queryFn: async () => {
            const res = await fetch('https://travel-tourism-seven.vercel.app/allstories');
            return res.json();
        }
    })
    // console.log(stories);

    if (isPending) {
        return <span className="text-primary loading loading-spinner"></span>
    }

    if (isError) {
        return <p>{error.message}</p>
    }

    return (
        <div className="m-5 mx-auto py-12 text-center">
            <h2 className="py-10 font-black text-4xl text-sky-600">Tourist Stories</h2>
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {stories.map(story => (
                    <Link to={`/story/${story._id}`} key={story._id} className="shadow-md hover:shadow-lg border border-blue-600 rounded-lg transition duration-300 overflow-hidden">
                        <div className="p-4">
                            <h3 className="mb-2 font-bold text-2xl text-teal-800">{story.title}</h3>
                            <p className="text-gray-700">{story.content}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AllStories;
