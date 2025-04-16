'use client';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const ManageUser = () => {

  const [userList, setUserList] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/getall`);
    console.table(res.data);
    setUserList(res.data);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/delete/${id}`);
    console.log(res.data);
    fetchUsers();
    toast.success("User Deleted Successfully");
  };


  return (
    <div>

      <div className='container mx-auto py-8'>
        <h1 className='text-center font-bold text-3xl'>Manage Users</h1>

        <table className='w-full mt-10 border border-gray-300'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='p-2'>ID</th>
              <th className='p-2'>Name</th>
              <th className='p-2'>Email</th>
              <th className='p-2'>City</th>
              <th className='p-2'>Created At</th>
              <th className='p-2' colSpan={2}></th>
            </tr>
          </thead>
          <tbody className=''>
            {
              userList.map((user, index) => {
                return <tr key={user._id} className='border border-gray-300'>
                  <td className='p-2'>{user._id}</td>
                  <td className='p-2'>{user.name}</td>
                  <td className='p-2'>{user.email}</td>
                  <td className='p-2'>{user.city}</td>
                  <td className='p-2'>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className='p-2'>
                    
                    <Link href={'/update-user/'+user._id} className='p-2 bg-blue-500 text-white rounded'>
                      <IconPencil />
                    </Link>
                  </td>
                  <td className='p-2'>
                    <button className='p-2 bg-red-500 text-white rounded' onClick={() => {
                      deleteUser(user._id)
                    }}>
                      <IconTrash />
                    </button>
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default ManageUser;