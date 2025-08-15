import { NavLink } from 'react-router-dom';



const Navbar = () => {
    return (
        <nav className="flex justify-center items-center gap-4 p-4 bg-background-primery-700 text-gray-400">
            <NavLink to="/" className={({isActive}) => isActive ? "text-white" : "hover:text-white"}>Home</NavLink>
            <NavLink to="/favorites" className={({isActive}) => isActive ? "text-white" : "hover:text-white"}>Favorites</NavLink>
        </nav>
    );
};

export default Navbar