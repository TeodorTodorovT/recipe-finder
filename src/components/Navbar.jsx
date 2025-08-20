import { NavLink } from 'react-router-dom';
import supabase from '../lib/supabaseClient';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const Navbar = () => {
    const { user } = useContext(AuthContext);

    return (
        <nav className="flex justify-center items-center gap-4 p-4 bg-background-primery-700 text-gray-400">
            <NavLink to="/" className={({isActive}) => isActive ? "text-white" : "hover:text-white"}>Home</NavLink>
            
            {user ? (
                <>
                    <NavLink to="/favorites" className={({isActive}) => isActive ? "text-white" : "hover:text-white"}>Favorites</NavLink>
                    <button onClick={() => supabase.auth.signOut()} className="cursor-pointer hover:text-white transition-colors">Logout</button>
                </>
            ) : (
                <NavLink to="/login" className={`${({isActive}) => isActive ? "text-white" : "hover:text-white"}`}>Login</NavLink>
            )}
        </nav>
    );
};

export default Navbar