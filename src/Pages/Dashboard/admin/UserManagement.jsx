import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { FaPenNib, FaUser, FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Spinner from '../../../components/Spinner/Spinner';

const UserManagement = () => {
    const axiosSecure=useAxiosSecure()
    const {data:users=[], isLoading:usersLoading, refetch}=useQuery({
        queryKey:["users"],
        queryFn:async()=>{
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })
    if(usersLoading){
        return <Spinner/>
    }
    console.log(users);

    const handleUserRole = (user, role) => {
    const userRoleInfo = { role: role };
    axiosSecure.patch(`/users/${user._id}/role`, userRoleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: `${user.displayName} is marked as ${role}`,
          icon: "success",
        });
      }
    });
  };

  const handleMakeAdmin = (user) => {
    handleUserRole(user, "admin");
  };
  const handleMakeUser = (user) => {
    handleUserRole(user, "user");
  };
  const handleMakeCreator = (user) => {
    handleUserRole(user, "creator");
  };

    return (
        <div>
      <h3 className="text-3xl font-bold text-center text-purple-500">
        Manage All Users
      </h3>
      <div className="overflow-x-auto border-2 border-purple-200 rounded-3xl my-5 min-h-screen">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>User image</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>User Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  {" "}
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={user.photoURL}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className='flex flex-col md:flex-row lg:flex-row items-center gap-2 lg:gap-6 '>
                      <button
                        onClick={() => handleMakeUser(user)}
                        className="btn rounded-full bg-green-200 text-green-700"
                      ><FaUser /> User
                      </button>  
                      <button
                        onClick={() => handleMakeCreator(user)}
                        className="btn rounded-full bg-purple-200 text-purple-700"
                      ><FaPenNib /> Creator
                      </button>  
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn rounded-full bg-blue-200 text-blue-700"
                      ><FaUserShield /> Admin
                      </button>  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default UserManagement;