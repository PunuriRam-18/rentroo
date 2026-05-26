import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {

        const fetchBookings = async () => {

            try {

                const token = localStorage.getItem('token');

                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/bookings/my`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setBookings(data);

            } catch (error) {

                console.log(error);
            }
        };

        fetchBookings();

    }, []);

    const today = new Date();

    const activeBookings = bookings.filter((booking) => {

        return new Date(booking.endDate) >= today;
    });

    const completedBookings = bookings.filter((booking) => {

        return new Date(booking.endDate) < today;
    });

    return (

        <div className="min-h-screen bg-[#0A0F1C] text-white py-10 px-6">

            <div className="max-w-7xl mx-auto">

                <h1 className="text-5xl font-bold mb-4">

                    Dashboard

                </h1>

                <p className="text-[#94A3B8] mb-12 text-lg">

                    Welcome back to RENTROO

                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-8 shadow-2xl">

                        <h2 className="text-[#94A3B8] text-lg mb-3">

                            Total Bookings

                        </h2>

                        <h1 className="text-5xl font-bold">

                            {bookings.length}

                        </h1>

                    </div>

                    <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-8 shadow-2xl">

                        <h2 className="text-[#94A3B8] text-lg mb-3">

                            Active Rentals

                        </h2>

                        <h1 className="text-5xl font-bold text-[#3B82F6]">

                            {activeBookings.length}

                        </h1>

                    </div>

                    <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-8 shadow-2xl">

                        <h2 className="text-[#94A3B8] text-lg mb-3">

                            Completed Rentals

                        </h2>

                        <h1 className="text-5xl font-bold text-green-400">

                            {completedBookings.length}

                        </h1>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;