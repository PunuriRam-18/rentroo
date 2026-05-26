import { Link } from 'react-router-dom';

function Home() {

    return (

        <div className="min-h-screen bg-[#0A0F1C] text-white flex items-center justify-center px-6">

            <div className="max-w-5xl mx-auto text-center">

                <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-8">

                    Drive Beyond
                    <br />

                    <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">

                        The Ordinary

                    </span>

                </h1>

                <p className="text-xl text-[#94A3B8] leading-9 max-w-3xl mx-auto mb-12">

                    Experience premium car rentals with seamless booking,
                    luxury vehicles, secure payments,
                    and unmatched driving comfort.

                </p>

                <div className="flex flex-col md:flex-row justify-center gap-6">

                    <Link
                        to="/cars"
                        className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] px-10 py-5 rounded-2xl text-lg font-semibold hover:scale-105 transition duration-300 shadow-lg shadow-blue-500/20"
                    >
                        Explore Cars
                    </Link>

                    <Link
                        to="/register"
                        className="border border-[#374151] px-10 py-5 rounded-2xl text-lg hover:bg-white hover:text-black transition duration-300"
                    >
                        Get Started
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Home;