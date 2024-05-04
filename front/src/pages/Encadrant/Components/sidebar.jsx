import React from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/actions/authActions';
import { DiScrum } from "react-icons/di";

const Sidebar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="hidden md:flex md:flex-col md:w-64 bg-gray-900 text-gray-200 overflow-hidden">
      <div className='flex flex-col h-full justify-between p-4'>
        <div>
          <h1 className='text-3xl text-center font-bold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text p-4'>
            Itech Data
          </h1>
          <div className="flex items-center justify-center flex-col gap-4 p-8">
            <img src="/images/user.jpg" alt="user" className='h-16 w-16 rounded-full' />
            <div className='text-center'>
              <span className="block text-2xl capitalize font-bold">Samir</span>
              <span className="block text-xs capitalize font-medium">Encadrant</span>
            </div>
          </div>
          <ul>
            <NavLink to="/encadrant/stage/1" className="ml-4 text-sm font-medium">
              <li className="flex items-center gap-1 text-blue-500 hover:text-blue-700 cursor-pointer p-2 rounded-md">
                <DiScrum className="text-lg" />
                Stage Mern
              </li>
            </NavLink>
          </ul>
          <ul>
            <NavLink to="/encadrant/stage/2" className="ml-4 text-sm font-medium">
              <li className="flex items-center gap-1 text-blue-500 hover:text-blue-700 cursor-pointer p-2 rounded-md">
                <DiScrum className="text-lg" />
                Stage Devops
              </li>
            </NavLink>
          </ul>
        </div>
        <div>
          <Link to="/" onClick={handleLogout} className="flex items-center justify-start text-blue-500 hover:text-blue-700 cursor-pointer p-2 rounded-md w-full">
            <AiOutlineLogout className="text-lg" />
            <span className="ml-4 text-sm font-medium">Logout</span>
          </Link>
      
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
