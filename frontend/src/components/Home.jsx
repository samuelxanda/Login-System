import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("login_token");
    navigate('/login')
  }
  return (
    <div>
      Home{" "}
      <div>
        <button
          onClick={handleLogout}
          className="text-white bg-red-500 rounded p-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
