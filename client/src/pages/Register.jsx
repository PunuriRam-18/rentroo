import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const submitHandler = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/register`,
                {
                    name,
                    email,
                    password
                }
            );

            toast.success('Registration Successful');

            navigate('/login');

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message || 'Registration Failed'
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen bg-[#0A0F1C] flex justify-center items-center px-6 relative overflow-hidden">

            <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl top-[-120px] right-[-100px]"></div>

            <div className="absolute w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl bottom-[-120px] left-[-100px]"></div>

            <form
                onSubmit={submitHandler}
                className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-3xl shadow-2xl"
            >

                <h1 className="text-5xl font-bold text-center text-white mb-3">

                    Create Account

                </h1>

                <p className="text-[#94A3B8] text-center mb-10 leading-7">

                    Join RENTROO and start your premium driving experience

                </p>

                <div className="space-y-5">

                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#111827] border border-[#374151] text-white p-4 rounded-2xl outline-none focus:border-[#3B82F6] transition"
                    />

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
                        loading ? 'Creating Account...' : 'Register'
                    }

                </button>

                <p className="text-center text-[#94A3B8] mt-8">

                    Already have an account?

                    <Link
                        to="/login"
                        className="ml-2 text-[#3B82F6] font-semibold hover:underline"
                    >
                        Login
                    </Link>

                </p>

            </form>

        </div>
    );
}

export default Register;