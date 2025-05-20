import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';

export default function Update() {

    const {id} = useParams();
    const navigate = useNavigate();

    const [Value, setValue] = useState({
      Username:"",
      Email:""
    });

    useEffect(() =>{
      api.get("/users/"+id)
      .then((res) =>{
        console.log(res.data.result[0]);
        setValue(res.data.result[0])           
      })
    },[id])
    
    const handlechange = (e) =>{
          setValue({
            ...Value,
            [e.target.name]: e.target.value
          })
        }
        const handleUpdate =async (e) =>{
          e.preventDefault();
          try {
           const response = await axios.put("http://localhost:2000/update/"+id, Value);

           if (response) {
            alert("Data Updated")
            navigate("/")
           }
          
          } catch (error) {
            console.log(error);
            
          }
        }
    

  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600'>
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
         <form onSubmit={handleUpdate}  className="space-y-6">
          <div>
            <h2 className='text-2xl font-semibold uppercase text-center text-gray-700'>Update User data</h2>
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              name="Username"
              value={Value.Username}
              onChange={handlechange}
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              name="Email"
              value={Value.Email}
              onChange={handlechange}
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          <div className='flex justify-start gap-3'>
          <button
            type="submit"
            className=" bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            Save
          </button>
          <Link to="/" className='bg-red-500 text-white py-2 px-4 rounded-md'>Cancel</Link>
          </div>
        </form>
      </div>
       
    </div>
  )
}
