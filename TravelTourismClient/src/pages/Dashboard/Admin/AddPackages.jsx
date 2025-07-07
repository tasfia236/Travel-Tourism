import { useState } from 'react';
import Swal from 'sweetalert2';
import { FaPlus, FaTrash, FaPlaneDeparture } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AddTourForm = () => {
  const axiosSecure = useAxiosSecure();
  const [images, setGalleryImages] = useState(['']);
  const [tour_plan, setTourPlan] = useState([{ day: '', title: '', description: '' }]);

  const handleGalleryImageChange = (index, event) => {
    const values = [...images];
    values[index] = event.target.value;
    setGalleryImages(values);
  };

  const handleTourPlanChange = (index, event) => {
    const values = [...tour_plan];
    values[index][event.target.name] = event.target.value;
    setTourPlan(values);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const spot_image = form.profileImage.value;
    const tour_type = form.type.value;
    const trip_title = form.triptitle.value;
    const price = form.price.value;
    const description = form.tourdescription.value;

    const newTour = {
      spot_image,
      tour_type,
      trip_title,
      price,
      description,
      images,
      tour_plan,
      wishlist: 0
    };

    axiosSecure.post('/tours', newTour)
      .then(res => {
        if (res.data.insertedId) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Tour added successfully!',
            showConfirmButton: false,
            timer: 1500
          });
          form.reset();
          setGalleryImages(['']);
          setTourPlan([{ day: '', title: '', description: '' }]);
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="bg-gradient-to-r from-sky-50 via-blue-50 to-white p-8 min-h-screen">
      <h1 className="mb-8 font-black text-sky-600 text-3xl text-center animate-fadeIn">Add New Tour</h1>
      <form onSubmit={handleFormSubmit} className="space-y-6 bg-white/50 shadow-2xl backdrop-blur-md mx-auto p-8 rounded-2xl max-w-4xl">
        
        {/* Basic Inputs */}
        <input name="profileImage" type="text" placeholder="Spot Image URL" className="input-bordered w-full input" />
        <input name="type" type="text" placeholder="Tour Type" className="input-bordered w-full input" />
        <input name="triptitle" type="text" placeholder="Trip Title" className="input-bordered w-full input" />
        <input name="price" type="number" placeholder="Price" className="input-bordered w-full input" required />
        <textarea name="tourdescription" placeholder="Description" className="textarea-bordered w-full textarea" />

        {/* Gallery Section */}
        <div>
          <label className="font-semibold text-sky-600 label-text">Gallery Images</label>
          {images.map((image, index) => (
            <div key={index} className="flex items-center gap-2 my-2">
              <input
                type="text"
                value={image}
                onChange={(e) => handleGalleryImageChange(index, e)}
                className="flex-1 input-bordered input"
              />
              <button type="button" onClick={() => setGalleryImages(images.filter((_, i) => i !== index))}
                className="bg-red-500 hover:bg-red-600 shadow-md text-white btn btn-sm">
                <FaTrash />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => setGalleryImages([...images, ''])}
            className="bg-gradient-to-r from-sky-400 to-blue-600 shadow-md mt-2 text-white hover:scale-105 duration-300 btn">
            <FaPlus className="mr-2" /> Add Image
          </button>
        </div>

        {/* Tour Plan Section */}
        <div>
          <label className="font-semibold text-sky-600 label-text">Tour Plan</label>
          {tour_plan.map((plan, index) => (
            <div key={index} className="gap-4 grid grid-cols-1 md:grid-cols-3 mb-4">
              <input name="day" value={plan.day} placeholder="Day" onChange={(e) => handleTourPlanChange(index, e)} className="input-bordered input" />
              <input name="title" value={plan.title} placeholder="Title" onChange={(e) => handleTourPlanChange(index, e)} className="input-bordered input" />
              <input name="description" value={plan.description} placeholder="Description" onChange={(e) => handleTourPlanChange(index, e)} className="input-bordered input" />
              <button type="button" onClick={() => setTourPlan(tour_plan.filter((_, i) => i !== index))}
                className="md:col-span-3 bg-red-500 hover:bg-red-600 shadow mt-2 text-white btn btn-sm">
                <FaTrash className="mr-2" /> Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => setTourPlan([...tour_plan, { day: '', title: '', description: '' }])}
            className="bg-gradient-to-r from-green-400 to-emerald-500 shadow-md text-white hover:scale-105 duration-300 btn">
            <FaPlus className="mr-2" /> Add Day Plan
          </button>
        </div>

        {/* Submit Button */}
        <button type="submit"
          className="bg-gradient-to-r from-sky-600 to-blue-700 shadow-md py-3 w-full text-white text-lg hover:scale-105 duration-300 btn">
          <FaPlaneDeparture className="mr-2" /> Submit Tour
        </button>
      </form>
    </div>
  );
};

export default AddTourForm;
