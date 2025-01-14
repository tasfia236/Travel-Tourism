
import { useLoaderData } from 'react-router-dom';

const GuideDetails = () => {
    const guide = useLoaderData();

    const { name, email, image, number, education, skill, work } = guide;
    // console.log(guide);


    return (
        <div className="px-4 pt-16 pb-12 text-center">
            {guide.image && <img src={image} alt={name} className="shadow-md mx-auto mb-10 rounded-full w-36 md:w-48 lg:w-72 h-36 md:h-48 lg:h-72" />}
            <h2 className="p-2 font-bold text-2xl text-teal-800 md:text-3xl">{name}</h2>
            <p className="mb-2 text-gray-700 text-sm md:text-base"><span className='font-bold'>Email:</span>   {email}</p>
            <p className="mb-2 text-gray-700 text-sm md:text-base"><span className='font-bold'>Contact Number:</span> {number}</p>
            <p className="mb-4 text-gray-700 text-sm md:text-base"><span className='font-bold'>Education:</span> {education}</p>
            <div>
            <p className="mb-2 font-bold text-base text-gray-700">Skills:</p>
            <p className="mb-4 text-gray-700 text-sm md:text-base" >{skill}</p>
            </div>
            <div className="mx-auto max-w-2xl text-left">
            <p className="mb-2 font-bold text-base text-gray-700">Work Experience:</p>
            <p className="mb-4 text-gray-700 text-sm md:text-base" >{work}</p>
            </div>
        </div>
    );
};

export default GuideDetails;