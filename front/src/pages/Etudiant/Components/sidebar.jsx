import React from 'react';
import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import { Link } from 'react-router-dom'; // Correcting import for Link
import { useDispatch,useSelector } from 'react-redux';
import { logout } from '../../../redux/actions/authActions';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user.user);
  console.log("🚀 ~ Sidebar ~ user:", user)


  const handleLogout = () => {
      dispatch(logout());
  };

  return (
    <div className="fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-gray-200">
      <div className="p-5 flex items-center justify-between">
        <span className="text-xl font-semibold text-white">Dashboard</span>
      </div>
      <ul className="mt-6">
        <li className="flex items-center text-blue-500 hover:text-blue-700 cursor-pointer p-2 rounded-md">
          <AiOutlineUser className="text-lg" />
          <NavLink to="/admin/dashboard" className="ml-4 text-sm font-medium">Dashboard</NavLink>
        </li>
      </ul>
      <div className="absolute bottom-0 w-full p-5">
        <div className="flex items-center justify-between bg-gray-800 p-3 rounded-md">
          <AiOutlineUser className="text-lg text-blue-500 hover:text-blue-700 cursor-pointer" />
          <div className="flex-1 ml-4">
            <span className="block text-sm font-medium">{user.nom}</span>
          </div>
          <Link to="/" onClick={handleLogout} className="flex items-center text-blue-500 hover:text-blue-700 cursor-pointer p-2 rounded-md">
            <AiOutlineLogout className="text-lg" />
            <span className="ml-4 text-sm font-medium">Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
