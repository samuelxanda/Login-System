import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("login_token");
    navigate("/login");
  };

  const handleLogout2 = () => {
    localStorage.removeItem("user__token");
    navigate("/login2");
  };


  const [Values, setValues] = useState([]);

  useEffect(() => {
    api.get("/users")
    .then((res)=>{
      setValues(res.data.result)
    })
  })


  const handleDelete = (id) =>{
    api.delete("/delete/"+id)
    .then(() =>{
      alert("User Deleted Succesfully")
    })
  }

  

  if (Values.length === 0) {
    return <> 
    <div> <button
          onClick={handleLogout2}
          className="text-white bg-red-500 rounded p-2"
        >
          Logout
        </button>  No User Exist</div> </>
  }
  return (
    <div>
      Home{" "}
      <div className="flex gap-x-3">
        <button
          onClick={handleLogout2}
          className="text-white bg-red-500 rounded p-2"
        >
          Logout
        </button>

        <button
          onClick={handleLogout2}
          className="text-white bg-red-500 rounded p-2"
        >
          Logout2
        </button>
        <hr />
      </div>
      <div>
        <h2 className="text-xl underline">All users</h2>

        <div>
          <table>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Action</th>
            <tbody>
            {Values.map((user, index) =>(
  <tr key={user.user_id}>
                <td>{index + 1}</td>
                <td>{user.Username}</td>
                <td>{user.Email}</td>
                <td className="space-x-2">
                  <Link to={`/read/${user.user_id}`}className="bg-blue-500/40 px-2 rounded">view</Link>
                  <Link to={`/update/${user.user_id}`} className="bg-yellow-500/40 px-2 rounded text-white-500">
                    Update
                  </Link>
                  <button onClick={() => handleDelete(user.user_id)} className="bg-red-500/40 px-2 rounded">
                    Delete
                  </button>
                </td>
              </tr>
))}
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
