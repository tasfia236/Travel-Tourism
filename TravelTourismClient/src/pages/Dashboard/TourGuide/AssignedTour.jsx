import { useQuery } from "@tanstack/react-query";
import { FaCheck } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";

const AssignedTour = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: users = [], refetch } = useQuery({
    queryKey: ["assignedTours"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assigned?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  const handleAccept = (user) => {
    axiosSecure.patch(`/users/bookingAccept/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.tourist_name} is Accepted!`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  };

  const handleReject = (user) => {
    axiosSecure.patch(`/users/bookingReject/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.tourist_name} is Rejected!`,
          showConfirmButton: false,
          timer: 1500
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

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBookings = users.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <div className="bg-gradient-to-r from-sky-50 via-white to-blue-50 p-6 min-h-screen">
      <h2 className="mb-8 font-bold text-sky-600 text-4xl text-center animate-fadeIn">
        Assigned Tours ({users.length})
      </h2>

      <div className="bg-white shadow-xl rounded-2xl overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-sky-100 text-sky-700 text-left">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Package Name</th>
              <th className="p-3">Tourist Name</th>
              <th className="p-3">Tour Date</th>
              <th className="p-3">Price</th>
              <th className="p-3">Accept</th>
              <th className="p-3">Reject</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.map((user, index) => (
              <tr key={user._id} className="hover:bg-blue-50 transition-all duration-150">
                <td className="p-3 font-medium">{startIndex + index + 1}</td>
                <td className="p-3">{user.package_name}</td>
                <td className="p-3">{user.tourist_name}</td>
                <td className="p-3">{user.date}</td>
                <td className="p-3">${user.price}</td>
                <td className="p-3">
                  {user.status === "Accepted" ? (
                    <span className="font-semibold text-green-600">Accepted</span>
                  ) : (
                    <button
                      onClick={() => handleAccept(user)}
                      className="bg-gradient-to-r from-sky-400 to-sky-600 text-white btn btn-xs"
                      title="Accept Tour"
                    >
                      <FaCheck />
                    </button>
                  )}
                </td>
                <td className="p-3">
                  {user.status === "Rejected" ? (
                    <span className="font-semibold text-red-600">Rejected</span>
                  ) : (
                    <button
                      onClick={() => handleReject(user)}
                      className="bg-gradient-to-r from-red-400 to-red-600 text-white btn btn-xs"
                      title="Reject Tour"
                    >
                      <RxCross2 />
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
                  ? "bg-sky-500 text-white border-sky-500"
                  : "bg-white border-sky-300 text-sky-600 hover:bg-sky-100"
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

export default AssignedTour;
