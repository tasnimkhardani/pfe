import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserCircleIcon } from 'lucide-react'; // Import the icon you want to use

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth?.user?.user);
    const isLoggedIn = !!user; // Checks if the user object exists

    const handleProfileClick = () => {
        if (user) {
            switch (user.role) {
                case 'ADMIN':
                    navigate('/admin/dashboard');
                    break;
                case 'CANDIDAT':
                    navigate('/etudiant/dashboard');
                    break;
                default:
                    navigate('/');
            }
        }
    };

    return (
        <header className="flex items-center justify-between px-10 border-1 border-b p-4">

            <div className='flex items-center  gap-20'>
                <Link to='/'>
                    <h1 className='text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text'>Itech Data</h1>
                </Link>
                <Link to='/stage'>
                    <h1 className='text-md font-normal '>Stage</h1>
                </Link>
            </div>
            {isLoggedIn ? (
                <button onClick={handleProfileClick} >
                    <UserCircleIcon className="size-8" /> {/* Adjust size and styling as needed */}
                </button>
            ) : (
                <Link to="/login">Login</Link>
            )}
        </header>
    );
}

export default Header;
