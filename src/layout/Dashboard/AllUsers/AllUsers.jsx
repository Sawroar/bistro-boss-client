import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../../../Hooks/useAxios';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllUsers = () => {
  const axios = useAxios()
  const { data: users = [], refetch } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axios.get('/users');
      return res.data
    }
  })
  const handleMakeAdmin = (user) => {
    axios.patch(`/users/admin/${user._id}`)
      .then(res => {
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
          refetch()
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is Admin Now`,
            showConfirmButton: false,
            timer: 1500
          });
        }


      })
  }
  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })
    .then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/users/${user._id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch()
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",

              });
            }
          })
      }
    });

  }

  return (
    <div>
      <div className='flex justify-evenly'>
        <h2>All USers:</h2>
        <h2>Total  USers:{users.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => <tr key={user._id}>
              <th>{index + 1}</th>
              <td>{user.name} <p>{user.photoURL} </p></td>
              <td>{user.email}</td>
              <td>
                {user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost bg-orange-500 text-white text-2xl "><FaUsers></FaUsers></button>
                }
              </td>
              <td>

                <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost text-red-600 text-2xl "><FaTrashAlt></FaTrashAlt></button>

              </td>

            </tr>)}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;