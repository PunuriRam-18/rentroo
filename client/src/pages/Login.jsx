import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const submitHandler = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                {
                    email,
                    password
                }
            );

            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);

            toast.success('Login Successful');

            navigate('/cars');

        } catch (error) {

            console.log(error);

            toast.error('Login Failed');

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen bg-[#0A0F1C] flex justify-center items-center px-6 relative overflow-hidden">

            <div className="absolute w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl top-[-100px] left-[-100px]"></div>

            <div className="absolute w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl bottom-[-100px] right-[-100px]"></div>

            <form
                onSubmit={submitHandler}
                className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-3xl shadow-2xl"
            >

                <h1 className="text-5xl font-bold text-center text-white mb-3">

                    Welcome Back

                </h1>

                <p className="text-[#94A3B8] text-center mb-10 leading-7">

                    Login to continue your premium driving experience

                </p>

                <div className="space-y-5">

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#111827] border border-[#374151] text-white p-4 rounded-2xl outline-none focus:border-[#3B82F6] transition"
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#111827] border border-[#374151] text-white p-4 rounded-2xl outline-none focus:border-[#3B82F6] transition"
                    />

                </div>

                <button
                    type="submit"
                    className="w-full mt-8 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white py-4 rounded-2xl font-semibold hover:scale-[1.02] transition duration-300 shadow-lg shadow-blue-500/20"
                >

                    {
                        loading ? 'Logging in...' : 'Login'
                    }

                </button>

                <p className="text-center text-[#94A3B8] mt-8">

                    Don’t have an account?

                    <Link
                        to="/register"
                        className="ml-2 text-[#3B82F6] font-semibold hover:underline"
                    >
                        Register
                    </Link>

                </p>

            </form>

        </div>
    );
}

export default Login;