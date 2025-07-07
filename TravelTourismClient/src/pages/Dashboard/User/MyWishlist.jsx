import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyWishlist = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await axiosSecure.get(`/wishlist/${user?.email}`);
      setWishlistItems(response.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const handleDelete = async (id) => {
    const result = await axiosPublic.delete(`/wish/${id}`);
    if (result.data.deletedCount > 0) {
      Swal.fire({
        icon: 'success',
        title: 'Removed!',
        text: 'Wishlist item has been deleted.',
        timer: 1500,
        showConfirmButton: false,
        position: 'top-end',
      });
      fetchWishlist();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Could not delete wishlist item.',
      });
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentWishLists = wishlistItems.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(wishlistItems.length / itemsPerPage);

  return (
    <div className="bg-gradient-to-r from-sky-50 via-white to-blue-50 p-6 min-h-screen">
      <h1 className="mb-10 font-bold text-sky-600 text-4xl text-center animate-fadeIn">
        My Wishlist ({wishlistItems.length})
      </h1>

      <div className="bg-white/70 shadow-xl backdrop-blur mx-auto p-6 rounded-2xl max-w-6xl overflow-x-auto">
        <table className="w-full text-sm md:text-base table-auto">
          <thead className="bg-sky-100 text-sky-700">
            <tr>
              <th className="p-3 text-left">Trip Title</th>
              <th className="p-3 text-left">Tour Type</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentWishLists.map((item) => (
              <tr key={item._id} className="hover:bg-sky-50 border-b transition-all duration-200">
                <td className="p-3">{item.trip_title}</td>
                <td className="p-3">{item.tour_type}</td>
                <td className="p-3">${item.price}</td>
                <td className="flex md:flex-row flex-col justify-start items-center space-x-3 p-3">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 hover:bg-red-600 rounded text-white btn btn-sm"
                  >
                    Delete
                  </button>
                  <Link to={`/details/${item._id}`}>
                    <button className="bg-sky-500 hover:bg-sky-600 rounded text-white btn btn-sm">
                      Visit Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-md border ${
                  currentPage === i + 1
                    ? 'bg-sky-600 text-white border-sky-600'
                    : 'bg-white border-sky-300 text-sky-600 hover:bg-sky-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWishlist;
