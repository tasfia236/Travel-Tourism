import React, { useState } from 'react';
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

        axiosSecure.post('/request-guide', { user: userRequest })
            .then(res => {
                // console.log(res.data);
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
            .catch(error => {
                console.error(error);
                Swal.fire({
                    title: 'Warning!',
                    text: 'Your Already requested to be a Tour Guide',
                    icon: 'warning',
                    confirmButtonText: 'Ok'
                });
            })
    };

    return (
        <div className="mx-auto mt-8 container">
            <h1 className="mb-4 font-bold text-3xl">Request to Admin</h1>
            {requested ? (
                <p>Your request to be a tour guide has been sent. Please wait for admin approval.</p>
            ) : (
                <button onClick={handleRequest} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white focus:outline-none">
                    Request to be a Tour Guide
                </button>
            )}
        </div>
    );
};

export default RequestToAdmin;
