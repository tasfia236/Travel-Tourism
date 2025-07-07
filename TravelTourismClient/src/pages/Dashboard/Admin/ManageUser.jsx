import Swal from 'sweetalert2';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useState } from 'react';
import Select from 'react-select';

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: users = [], refetch: refetchUsers } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  });

  const { data: requests = [] } = useQuery({
    queryKey: ['requests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/request-guide');
      return res.data;
    }
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetchUsers();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${user.name} is now an Admin!`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  };

  const handleMakeTourGuide = (user) => {
    axiosSecure.patch(`/users/guide/${user._id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetchUsers();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${user.name} is now a Tour Guide!`,
            showConfirmButton: false,
            timer: 1500
          });
        } else if (res.data.message) {
          Swal.fire({
            position: 'top-end',
            icon: 'info',
            title: res.data.message,
            showConfirmButton: true
          });
        }
      })
      .catch(error => console.error(error));
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetchUsers();
            Swal.fire('Deleted!', 'User has been removed.', 'success');
          }
        });
      }
    });
  };

  const filteredUsers = users.filter((user) => {
    if (!selectedRole) return true;
    return user.role?.toLowerCase() === selectedRole.value.toLowerCase();
  });

  const searchedUsers = filteredUsers.filter((user) => {
    const term = searchTerm.toLowerCase();
    return user.name?.toLowerCase().includes(term) || user.email?.toLowerCase().includes(term);
  });

  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'tourGuide', label: 'Tour Guide' },
    { value: 'user', label: 'User' }
  ];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentManageUser = searchedUsers.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(searchedUsers.length / itemsPerPage);

  return (
    <div className="bg-gradient-to-r from-sky-50 to-white p-6 min-h-screen">
      <h2 className="mb-6 font-bold text-sky-600 text-4xl text-center">Manage Users <span className="text-gray-500 text-base">({users.length})</span></h2>

      <div className="flex md:flex-row flex-col justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search by Name or Email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 w-full md:w-1/2"
        />

        <div className="w-full md:w-1/3">
          <Select
            options={roleOptions}
            value={selectedRole}
            onChange={setSelectedRole}
            placeholder="🎯 Filter by Role"
            isClearable
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
      </div>

      <div className="bg-white shadow-md rounded-2xl overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-sky-100 text-sky-700">
            <tr className="text-left">
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Admin</th>
              <th className="p-3">Tour Guide</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentManageUser.map((user, index) => (
              <tr key={user._id} className="hover:bg-blue-50 transition-all duration-200">
                <td className="p-3">{startIndex + index + 1}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  {user.role === 'admin' ? (
                    <span className="font-semibold text-green-600">Admin</span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="bg-gradient-to-r from-sky-400 to-sky-600 text-white btn btn-xs"
                      title="Make Admin"
                    >
                      <FaUsers />
                    </button>
                  )}
                </td>
                <td className="p-3">
                  {user.role === 'tourGuide' ? (
                    <span className="font-semibold text-emerald-600">Tour Guide</span>
                  ) : (
                    requests.some(r => r.email === user.email) ? (
                      <button
                        onClick={() => handleMakeTourGuide(user)}
                        className="bg-gradient-to-r from-sky-400 to-blue-600 text-white btn btn-xs"
                        title="Approve Tour Guide"
                      >
                        <FaUsers />
                      </button>
                    ) : (
                      <span className="text-gray-400">Not Requested</span>
                    )
                  )}
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="bg-red-100 hover:bg-red-200 text-red-600 btn btn-sm"
                    title="Delete User"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 border rounded-md ${currentPage === i + 1
              ? 'bg-sky-500 text-white'
              : 'bg-white text-sky-600 border-sky-300'
              } hover:bg-sky-100`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManageUser;
