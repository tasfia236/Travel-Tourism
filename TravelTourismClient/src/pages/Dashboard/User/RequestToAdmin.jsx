import { useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const RequestToAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [requested, setRequested] = useState(false);

  const handleRequest = () => {
    const userRequest = {
      email: user.email,
      name: user.displayName
    };

    axiosSecure
      .post('/request-guide', { user: userRequest })
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: 'Success!',
            text: 'Your request has been sent to the admin.',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          setRequested(true);
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: 'Already Sent!',
          text: 'You have already requested to be a Tour Guide.',
          icon: 'warning',
          confirmButtonText: 'Ok'
        });
      });
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-sky-50 via-white to-blue-50 p-4 min-h-screen">
      <div className="bg-white/70 shadow-lg backdrop-blur-lg p-10 rounded-2xl w-full max-w-xl text-center animate-fadeIn">
        <h1 className="mb-6 font-bold text-sky-600 text-3xl">
          Request to be a Tour Guide
        </h1>

        {requested ? (
          <p className="font-medium text-gray-700 text-lg">
            ✅ Your request has been submitted. Please wait for admin approval.
          </p>
        ) : (
          <button
            onClick={handleRequest}
            className="bg-sky-600 hover:bg-sky-700 shadow-md px-6 py-3 rounded-lg font-semibold text-white transition duration-200"
          >
            Request to Admin
          </button>
        )}
      </div>
    </div>
  );
};

export default RequestToAdmin;
