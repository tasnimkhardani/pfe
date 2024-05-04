import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../redux/actions/authActions';
import Header from '../../Home/Components/header';
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8080/authenticate',
                {
                    email,
                    password
                },
            );
            if (response.data) {
                dispatch(loginSuccess(response.data));
                switch (response.data.user.role) {
                    case 'ADMIN':
                        navigate('/admin/dashboard');
                        break;
                    case 'CANDIDAT':
                        navigate('/etudiant/dashboard');
                        break;
                }
            }
        } catch (error) {
            console.log("🚀 ~ handleLogin ~ error:", error.response.data)
            setError(error.response.data)
        }
    };


    return (
        <div className='flex flex-col '>
           <header className="flex items-center justify-between px-10 border-1 border-b p-4">
            <Link to='/'>
                <h1 className='text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text'>Itech Data</h1>
            </Link>
            
        </header>
              <div className="bg-gray-100 min-h-screen flex items-center justify-between md:px-28  ">
            <img src="login-img.png" alt="" className="hidden md:block w-1/3" />
            <div className="m-2 max-w-md w-full space-y-8 p-8 shadow-md rounded-2xl bg-white">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Se connecter
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email </label>
                            <input id="email-address"
                                onChange={(e) => setEmail(e.target.value)}
                                name="email" type="text" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Mot de passe</label>
                            <input id="password" name="password" type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Mot de passe" />
                        </div>
                    </div>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Se connecter
                        </button>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Vous n'avez pas de compte ? <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Inscrivez-vous</Link>
                        </p>
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
}

export default Login;