import React from 'react'
import { useEffect,useState } from 'react';
import { useParams,Link } from 'react-router-dom'
import api from '../../api/api';

export default function Read() {
    const {id} = useParams();

    const [Value, setValue] = useState([]);

    useEffect(() =>{
        api.get("/users/"+id)
        .then((res) =>{
            console.log(res.data.result[0]);
           setValue(res.data.result[0])           
        })
    },[id])
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='border-1 rounded p-3'>
            <h2>Username: {Value.Username}</h2>
            <h3>Email: { Value.Email }</h3>
            <div className='p-2 m-2 space-x-3'>
<Link to="/" className='bg-blue-500 p-1 rounded text-white'>Back</Link>
        <Link to="/update" className='bg-yellow-500 p-1 rounded text-white'>Update</Link>

</div>
        </div>

     
    </div>



  )
}
