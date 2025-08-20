import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import supabase from '../lib/supabaseClient';


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            console.error(error);
            alert(error.message);
        }

        if (data && !error) {
            navigate('/');
        }
    };

    return (
        <div className="bg-background-primery h-screen flex items-center justify-center">
            <div className="bg-background-primery-600 p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-white">
                    Create an account
                </h1>
                <form className="flex flex-col gap-4">
                    <input
                        className="bg-background-primery-500 p-2 rounded-md text-white placeholder:text-white"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="bg-background-primery-500 p-2 rounded-md text-white placeholder:text-white"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className="bg-background-primery-700 p-2 rounded-md text-white hover:bg-background-primery-800 transition-colors font-bold cursor-pointer"
                        type="submit"
                        onClick={handleRegister}
                    >
                        Register
                    </button>
                </form>
                <p className="text-white text-center mt-4">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
