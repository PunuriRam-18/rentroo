import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const role = localStorage.getItem('role');

    const logoutHandler = () => {

        localStorage.removeItem('token');

        localStorage.removeItem('role');

        toast.success('Logout Successful');

        navigate('/');
    };

    return (

        <nav className="bg-[#111827] border-b border-[#1F2937] px-8 py-4 sticky top-0 z-50 backdrop-blur-lg">

            <div className="max-w-7xl mx-auto flex justify-between items-center">

                <Link
                    to="/"
                    className="text-4xl font-bold tracking-wide text-white"
                >
                    RENTROO
                </Link>

                <div className="flex items-center gap-3">

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
                        role === 'admin' && (

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

            </div>

        </nav>
    );
}

export default Navbar;