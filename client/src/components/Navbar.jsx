import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

import { HiMenu, HiX } from 'react-icons/hi';

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const [menuOpen, setMenuOpen] = useState(false);

    const [user, setUser] = useState(null);

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                if (!token) return;

                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_URL}/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setUser(data);

            } catch (error) {

                console.log(error);
            }
        };

        fetchProfile();

    }, [token]);

    const logoutHandler = () => {

        localStorage.removeItem('token');

        toast.success('Logout Successful');

        navigate('/');

        window.location.reload();
    };

    return (

        <nav className="bg-[#111827]/95 border-b border-[#1F2937] sticky top-0 z-50 backdrop-blur-lg">

            <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">

                <Link
                    to="/"
                    className="text-3xl md:text-4xl font-bold tracking-wide text-white"
                >
                    RENTROO
                </Link>

                {/* Desktop Menu */}

                <div className="hidden md:flex items-center gap-3">

                    {
                        token && (

                            <Link
                                to="/dashboard"
                                className="h-12 flex items-center px-5 rounded-2xl text-[#94A3B8] hover:text-white hover:bg-white/5 transition duration-300"
                            >
                                Dashboard
                            </Link>
                        )
                    }

                    <Link
                        to="/cars"
                        className="h-12 flex items-center px-5 rounded-2xl text-[#94A3B8] hover:text-white hover:bg-white/5 transition duration-300"
                    >
                        Cars
                    </Link>

                    {
                        token && (

                            <Link
                                to="/bookings"
                                className="h-12 flex items-center px-5 rounded-2xl text-[#94A3B8] hover:text-white hover:bg-white/5 transition duration-300"
                            >
                                Bookings
                            </Link>
                        )
                    }

                    {
                        user?.isAdmin && (

                            <Link
                                to="/admin"
                                className="h-12 flex items-center px-5 rounded-2xl text-[#94A3B8] hover:text-white hover:bg-white/5 transition duration-300"
                            >
                                Admin
                            </Link>
                        )
                    }

                    {
                        token ? (

                            <button
                                onClick={logoutHandler}
                                className="h-12 flex items-center bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] px-6 rounded-2xl font-semibold text-white hover:scale-105 transition duration-300 shadow-lg shadow-blue-500/20"
                            >
                                Logout
                            </button>

                        ) : (

                            <>

                                <Link
                                    to="/login"
                                    className="h-12 flex items-center px-5 rounded-2xl text-[#94A3B8] hover:text-white hover:bg-white/5 transition duration-300"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="h-12 flex items-center bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] px-6 rounded-2xl font-semibold text-white hover:scale-105 transition duration-300 shadow-lg shadow-blue-500/20"
                                >
                                    Register
                                </Link>

                            </>

                        )
                    }

                </div>

                {/* Mobile Menu Button */}

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-white text-4xl"
                >
                    {
                        menuOpen ? <HiX /> : <HiMenu />
                    }
                </button>

            </div>

            {/* Mobile Menu */}

            {
                menuOpen && (

                    <div className="md:hidden bg-[#111827] border-t border-[#1F2937] px-5 py-5 space-y-4 flex flex-col">

                        {
                            token && (

                                <Link
                                    to="/dashboard"
                                    onClick={() => setMenuOpen(false)}
                                    className="text-[#94A3B8] hover:text-white transition"
                                >
                                    Dashboard
                                </Link>
                            )
                        }

                        <Link
                            to="/cars"
                            onClick={() => setMenuOpen(false)}
                            className="text-[#94A3B8] hover:text-white transition"
                        >
                            Cars
                        </Link>

                        {
                            token && (

                                <Link
                                    to="/bookings"
                                    onClick={() => setMenuOpen(false)}
                                    className="text-[#94A3B8] hover:text-white transition"
                                >
                                    Bookings
                                </Link>
                            )
                        }

                        {
                            user?.isAdmin && (

                                <Link
                                    to="/admin"
                                    onClick={() => setMenuOpen(false)}
                                    className="text-[#94A3B8] hover:text-white transition"
                                >
                                    Admin
                                </Link>
                            )
                        }

                        {
                            token ? (

                                <button
                                    onClick={logoutHandler}
                                    className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] py-3 rounded-2xl font-semibold text-white"
                                >
                                    Logout
                                </button>

                            ) : (

                                <>

                                    <Link
                                        to="/login"
                                        onClick={() => setMenuOpen(false)}
                                        className="text-[#94A3B8] hover:text-white transition"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        to="/register"
                                        onClick={() => setMenuOpen(false)}
                                        className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] py-3 rounded-2xl text-center font-semibold text-white"
                                    >
                                        Register
                                    </Link>

                                </>

                            )
                        }

                    </div>
                )
            }

        </nav>
    );
}

export default Navbar;