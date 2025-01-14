import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link, useNavigate } from "react-router-dom";
import Confetti from 'react-confetti';

const Booking = ({ guides, user, spot }) => {

    const [startDate, setStartDate] = useState(new Date());
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const [bookingCount, setBookingCount] = useState(0);
    const [showCongratulations, setShowCongratulations] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (bookingCount > 3) {
            setShowCongratulations(true);
        }
    }, [bookingCount]);

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }

        const form = e.target;
        const tourist_name = form.tourist_name.value;
        const tourist_email = form.tourist_email.value;
        const tourist_image = form.tourist_image.value;
        const price = form.price.value;
        const date = form.date.value;
        const guide_data = JSON.parse(form.guide.value);
        const status = 'In Review';
        const package_name = spot.trip_title;

        const BookTour = {
            package_name,
            tourist_name,
            tourist_email,
            tourist_image,
            price,
            date,
            guide_name: guide_data.name,
            email: guide_data.email,
            status
        };

        axiosPublic.post('/booking', BookTour)
            .then(res => {
                if (res.data.insertedId) {
                    setBookingCount((prevCount) => prevCount + 1);
                    setShowModal(true); // Show modal on successful booking
                    form.reset();
                }
            })
            .catch(error => {
                console.error(error);
            })
    };

    return (
        <div className="bg-base-200 p-4 min-h-screen">
            <div className="">
                <div className="bg-base-100 shadow-2xl card">
                    <form onSubmit={handleBooking} className="card-body">
                        <div className="gap-4 grid grid-cols-2">
                            <div>
                                <label htmlFor="tourist_name" className="block mb-2">Tourist Name</label>
                                <input disabled type="text" id="tourist_name" name="tourist_name" defaultValue={user?.displayName} className="px-3 py-2 border rounded-md w-full" />
                            </div>
                            <div>
                                <label htmlFor="tourist_email" className="block mb-2">Tourist Email</label>
                                <input disabled type="text" id="tourist_email" name="tourist_email" defaultValue={user?.email} className="px-3 py-2 border rounded-md w-full" required />
                            </div>
                            <div>
                                <label htmlFor="tourist_image" className="block mb-2">Tourist Image URL</label>
                                <input disabled type="text" id="tourist_image" name="tourist_image" defaultValue={user?.photoURL} className="px-3 py-2 border rounded-md w-full" required />
                            </div>
                            <div>
                                <label htmlFor="guide" className="block mb-2">Tour Guide Email:</label>
                                <select id="guide" name="guide" className="px-3 py-2 border rounded-md w-full">
                                    <option>Select Tour Guide</option>
                                    {guides?.map((guide, index) => (
                                        <option key={index} value={JSON.stringify({ name: guide.name, email: guide.email })}>
                                            {guide.name} ({guide.email})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="price" className="block mb-2">Price</label>
                                <input type="text" id="price" name="price" className="px-3 py-2 border rounded-md w-full" required />
                            </div>

                            <div>
                                <label htmlFor="date" className="block mb-2">Date:</label>
                                <DatePicker id="date" name="date" selected={startDate} onChange={(date) => setStartDate(date)} className="px-3 py-2 border rounded-md w-full" />
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Book Now!</button>
                        </div>
                    </form>
                    {showCongratulations && (
                        <div className="flex justify-center items-center mt-4">
                            <Confetti />
                            <div className="border-green-500 bg-green-100 mx-auto p-4 border-l-4 w-full max-w-sm text-green-700">
                                <p className="font-bold">Congratulations!</p>
                                <p>You've booked more than 3 times. You qualify for a discount.</p>
                                <button className="bg-blue-500 hover:bg-blue-600 mt-2 px-3 py-1 rounded text-white focus:outline-none">
                                    Apply Discount
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {showModal && (
                <dialog id="my_modal_5" className="modal-bottom modal sm:modal-middle" open>
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Confirm Your Booking!</h3>
                        <Link to='/dashboard/mybooking'><button className="btn btn-accent">My Booking Page</button></Link>
                        <div className="modal-action">
                            <button onClick={() => setShowModal(false)} className="btn">Close</button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default Booking;
