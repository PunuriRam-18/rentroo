import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Bookings() {

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

    const cancelBooking = async (bookingId) => {

        try {

            const token = localStorage.getItem('token');

            const { data } = await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success(data.message);

            setBookings(
                bookings.filter(
                    (booking) => booking._id !== bookingId
                )
            );

        } catch (error) {

            console.log(error);

            toast.error('Cancel Failed');
        }
    };

    return (

        <div className="min-h-screen bg-[#0A0F1C] text-white py-10 px-6">

            <div className="max-w-7xl mx-auto">

                <h1 className="text-5xl font-bold text-center mb-12">

                    My Bookings

                </h1>

                {
                    bookings.length === 0 ? (

                        <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-12 text-center">

                            <h2 className="text-3xl font-semibold text-[#94A3B8]">

                                No Bookings Found

                            </h2>

                        </div>

                    ) : (

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                            {
                                bookings.map((booking) => (

                                    <div
                                        key={booking._id}
                                        className="bg-[#111827] border border-[#1F2937] rounded-3xl p-5 shadow-2xl hover:-translate-y-2 hover:shadow-blue-500/10 transition duration-300 flex flex-col"
                                    >

                                        <img
                                            src={booking.car.image}
                                            alt={booking.car.name}
                                            className="w-full h-56 object-cover rounded-2xl mb-5"
                                        />

                                        <h2 className="text-3xl font-bold mb-5">

                                            {booking.car.name}

                                        </h2>

                                        <div className="space-y-3 mb-6">

                                            <p className="text-[#94A3B8]">

                                                <span className="text-white font-semibold">
                                                    Brand:
                                                </span>{' '}

                                                {booking.car.brand}

                                            </p>

                                            <p className="text-[#94A3B8]">

                                                <span className="text-white font-semibold">
                                                    Start:
                                                </span>{' '}

                                                {
                                                    new Date(
                                                        booking.startDate
                                                    ).toLocaleDateString()
                                                }

                                            </p>

                                            <p className="text-[#94A3B8]">

                                                <span className="text-white font-semibold">
                                                    End:
                                                </span>{' '}

                                                {
                                                    new Date(
                                                        booking.endDate
                                                    ).toLocaleDateString()
                                                }

                                            </p>

                                        </div>

                                        <button
                                            onClick={() => cancelBooking(booking._id)}
                                            className="mt-auto w-full bg-gradient-to-r from-red-500 to-red-600 py-4 rounded-2xl font-semibold hover:scale-[1.02] transition duration-300"
                                        >
                                            Cancel Booking
                                        </button>

                                    </div>
                                ))
                            }

                        </div>
                    )
                }

            </div>

        </div>
    );
}

export default Bookings;