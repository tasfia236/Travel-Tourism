import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Swal from 'sweetalert2';

const MyBooking = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: users = [], refetch } = useQuery({
    queryKey: ['my-booking'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/booking/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  const handleCancel = (booking) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This booking will be cancelled!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/booking/cancel/${booking._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `Booking for ${booking.package_name} cancelled!`,
              showConfirmButton: false,
              timer: 1500
            });
          }
        });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="text-sky-600 loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBookings = users.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <div className="bg-gradient-to-r from-sky-50 via-white to-blue-50 p-6 min-h-screen">
      <h2 className="mb-8 font-bold text-sky-600 text-4xl text-center animate-fadeIn">
        My Bookings ({users.length})
      </h2>

      <div className="bg-white shadow-lg p-4 rounded-2xl overflow-x-auto">
        <table className="w-full text-sm md:text-base table-auto">
          <thead className="bg-sky-100 text-sky-700">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Package</th>
              <th className="p-3 text-left">Tour Guide</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.map((booking, index) => (
              <tr
                key={booking._id}
                className="hover:bg-sky-50 border-b transition-all duration-200"
              >
                <td className="p-3 font-semibold">{startIndex + index + 1}</td>
                <td className="p-3">{booking.package_name}</td>
                <td className="p-3">{booking.guide_name || 'Not Assigned'}</td>
                <td className="p-3">{booking.date}</td>
                <td className="p-3">${booking.price}</td>
                <td className="p-3 font-semibold">
                  <span
                    className={`px-2 py-1 rounded ${
                      booking.status === 'Accepted'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="p-3">
                  {booking.status === 'Accepted' ? (
                    <button className="bg-green-500 hover:bg-green-600 text-white btn btn-sm">
                      Pay
                    </button>
                  ) : (
                    <button
                      onClick={() => handleCancel(booking)}
                      className="bg-red-500 hover:bg-red-600 text-white btn btn-sm"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-md border ${
                currentPage === i + 1
                  ? 'bg-sky-500 text-white border-sky-500'
                  : 'bg-white border-sky-300 text-sky-600 hover:bg-sky-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooking;
