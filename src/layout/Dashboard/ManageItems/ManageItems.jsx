import React from 'react';
import SectionTitle from '../../../componenets/SectionTitle/sectionTitle';
import useMenu from '../../../Hooks/useMenu';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxios from '../../../Hooks/useAxios';
import { Link } from 'react-router-dom';

const ManageItems = () => {
    const [menu,loading,refetch] = useMenu();
    const axioxSecure =useAxios()
    const handleDeleteitem= (item)=>{
        Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then(async(result) => {
  if (result.isConfirmed) {
    const res= await axioxSecure.delete(`/menu/${item._id}`)
    console.log(res.data)
    if(res.data.deletedCount>0){
       refetch()
  Swal.fire({
      title: "Deleted!",
      text: `${item.name} has been deleted.`,
      icon: "success"
    });
    }
  
  }
});
    }

    return (
        <div>
            <SectionTitle heading={'Manage All  Items'} subHeding={'Hurry Up'}></SectionTitle>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr className='space-y-6'>
                                <th> # </th>
                                <th>Image</th>
                                <th>Icon Name</th>
                                <th>Price</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu.map((item, index) => <tr key={item._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={item.image}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                          
                                        </div>
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>{item.price}</td>
                                  <td>
                                    <Link to={`/dashboard/updateItem/${item._id}`}>
                                    <button className="btn btn-sm btn-ghost bg-orange-500">
                                        <FaEdit className=' text-white'></FaEdit>
                                    </button></Link>
                                  </td>
                                    <th>
                                     <button onClick={()=>handleDeleteitem(item)} className="btn btn-ghost text-red-600 text-2xl "><FaTrashAlt></FaTrashAlt></button>
                                    </th>
                                </tr>)
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;