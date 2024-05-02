import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return ( 
        <header className="flex items-center justify-between px-10 border-1 border-b p-4">
            <Link to='/'>
                <h1 className='text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text'>Itech Data</h1>
            </Link>
            
            <Link to="/login">Login</Link>
        </header>
     );
}
 
export default Header;