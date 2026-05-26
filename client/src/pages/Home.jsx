import { Link } from 'react-router-dom';

function Home() {

    return (

        <div className="min-h-screen bg-[#0A0F1C] text-white overflow-hidden">

            {/* Hero Section */}

            <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}

                    <div>

                        <p className="text-[#3B82F6] uppercase tracking-[5px] mb-5 text-sm font-semibold">

                            Premium Car Rentals

                        </p>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-8">

                            Drive Beyond
                            <br />

                            <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">

                                The Ordinary

                            </span>

                        </h1>

                        <p className="text-lg md:text-xl text-[#94A3B8] leading-8 mb-10 max-w-2xl">

                            Experience luxury car rentals with seamless booking,
                            premium vehicles, secure reservations,
                            and unmatched driving comfort.

                        </p>

                        <div className="flex flex-col sm:flex-row gap-5">

                            <Link
                                to="/cars"
                                className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] px-10 py-5 rounded-2xl text-lg font-semibold hover:scale-105 transition duration-300 shadow-lg shadow-blue-500/20 text-center"
                            >
                                Explore Cars
                            </Link>

                            <Link
                                to="/register"
                                className="border border-[#374151] px-10 py-5 rounded-2xl text-lg hover:bg-white hover:text-black transition duration-300 text-center"
                            >
                                Get Started
                            </Link>

                        </div>

                    </div>

                    {/* Right Card */}

                    <div className="relative">

                        <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] blur-3xl opacity-20 rounded-full"></div>

                        <div className="relative bg-[#111827] border border-[#1F2937] rounded-3xl p-8 shadow-2xl">

                            <img
                                src="https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop"
                                alt="Luxury Car"
                                className="w-full h-[300px] md:h-[400px] object-cover rounded-3xl"
                            />

                            <div className="grid grid-cols-3 gap-5 mt-8 text-center">

                                <div>

                                    <h2 className="text-3xl font-bold text-white">

                                        500+

                                    </h2>

                                    <p className="text-[#94A3B8] mt-2 text-sm">

                                        Premium Cars

                                    </p>

                                </div>

                                <div>

                                    <h2 className="text-3xl font-bold text-white">

                                        24/7

                                    </h2>

                                    <p className="text-[#94A3B8] mt-2 text-sm">

                                        Support

                                    </p>

                                </div>

                                <div>

                                    <h2 className="text-3xl font-bold text-white">

                                        10K+

                                    </h2>

                                    <p className="text-[#94A3B8] mt-2 text-sm">

                                        Customers

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* Why Choose Us */}

            <div className="max-w-7xl mx-auto px-6 pb-20">

                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">

                    Why Choose RENTROO

                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-8 hover:-translate-y-2 transition duration-300">

                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] flex items-center justify-center text-3xl mb-6">

                            🚘

                        </div>

                        <h3 className="text-2xl font-bold mb-4">

                            Luxury Fleet

                        </h3>

                        <p className="text-[#94A3B8] leading-8">

                            Choose from premium luxury vehicles
                            designed for comfort, style, and performance.

                        </p>

                    </div>

                    <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-8 hover:-translate-y-2 transition duration-300">

                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] flex items-center justify-center text-3xl mb-6">

                            🔒

                        </div>

                        <h3 className="text-2xl font-bold mb-4">

                            Secure Booking

                        </h3>

                        <p className="text-[#94A3B8] leading-8">

                            Fast and secure booking system
                            with trusted authentication and smooth experience.

                        </p>

                    </div>

                    <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-8 hover:-translate-y-2 transition duration-300">

                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] flex items-center justify-center text-3xl mb-6">

                            ⚡

                        </div>

                        <h3 className="text-2xl font-bold mb-4">

                            Instant Access

                        </h3>

                        <p className="text-[#94A3B8] leading-8">

                            Book cars instantly anytime,
                            anywhere with a seamless user experience.

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Home;