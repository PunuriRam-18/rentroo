import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Cars() {

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('');
    const [brandFilter, setBrandFilter] = useState('');
    const [fuelFilter, setFuelFilter] = useState('');

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const filteredCars = cars.filter((car) => {

        return (

            car.name.toLowerCase().includes(
                search.toLowerCase()
            ) &&

            car.brand.toLowerCase().includes(
                brandFilter.toLowerCase()
            ) &&

            car.fuelType.toLowerCase().includes(
                fuelFilter.toLowerCase()
            )
        );
    });

    useEffect(() => {

        const fetchCars = async () => {

            try {

                setLoading(true);

                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/cars`
                );

                setCars(data);

                setLoading(false);

            } catch (error) {

                console.log(error);

                setLoading(false);

                toast.error('Failed to Load Cars');
            }
        };

        fetchCars();

    }, []);

    const bookCar = async (carId) => {

        if (!startDate || !endDate) {

            return toast.error('Select Booking Dates');
        }

        if (startDate > endDate) {

            return toast.error('Invalid Date Selection');
        }

        try {

            const token = localStorage.getItem('token');

            if (!token) {

                toast.error('Please Login First');

                return window.location.href = '/login';
            }

            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/bookings`,
                {
                    car: carId,
                    startDate,
                    endDate
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success(data.message);

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message || 'Booking Failed'
            );
        }
    };

    return (

        <div className="min-h-screen bg-[#0A0F1C] text-white py-10 px-6">

            <div className="max-w-7xl mx-auto">

                <h1 className="text-5xl font-bold text-center mb-12">

                    Premium Cars

                </h1>

                <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-6 mb-10 shadow-2xl">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                        <input
                            type="text"
                            placeholder="Search Cars..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-[#0A0F1C] border border-[#374151] text-white p-4 rounded-2xl outline-none focus:border-[#3B82F6]"
                        />

                        <input
                            type="text"
                            placeholder="Filter Brand..."
                            value={brandFilter}
                            onChange={(e) => setBrandFilter(e.target.value)}
                            className="bg-[#0A0F1C] border border-[#374151] text-white p-4 rounded-2xl outline-none focus:border-[#3B82F6]"
                        />

                        <input
                            type="text"
                            placeholder="Filter Fuel Type..."
                            value={fuelFilter}
                            onChange={(e) => setFuelFilter(e.target.value)}
                            className="bg-[#0A0F1C] border border-[#374151] text-white p-4 rounded-2xl outline-none focus:border-[#3B82F6]"
                        />

                    </div>

                </div>

                <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-8 mb-14 shadow-2xl">

                    <h2 className="text-3xl font-bold mb-8 text-center">

                        Select Booking Dates

                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="flex flex-col">

                            <label className="mb-3 text-[#94A3B8] font-medium">

                                Start Date

                            </label>

                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="bg-[#0A0F1C] border border-[#374151] text-white p-4 rounded-2xl outline-none focus:border-[#3B82F6]"
                            />

                        </div>

                        <div className="flex flex-col">

                            <label className="mb-3 text-[#94A3B8] font-medium">

                                End Date

                            </label>

                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="bg-[#0A0F1C] border border-[#374151] text-white p-4 rounded-2xl outline-none focus:border-[#3B82F6]"
                            />

                        </div>

                    </div>

                </div>

                {
                    loading ? (

                        <div className="flex justify-center items-center py-20">

                            <div className="w-16 h-16 border-4 border-[#3B82F6] border-t-transparent rounded-full animate-spin"></div>

                        </div>

                    ) : (

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                            {
                                filteredCars.map((car) => (

                                    <div
                                        key={car._id}
                                        className="bg-[#111827] border border-[#1F2937] rounded-3xl p-5 shadow-2xl hover:-translate-y-2 hover:shadow-blue-500/10 transition duration-300 flex flex-col"
                                    >

                                        <img
                                            src={car.image}
                                            alt={car.name}
                                            className="w-full h-56 object-cover rounded-2xl mb-5"
                                        />

                                        <h2 className="text-3xl font-bold mb-5">

                                            {car.name}

                                        </h2>

                                        <div className="space-y-3 mb-6">

                                            <p className="text-[#94A3B8]">

                                                <span className="text-white font-semibold">
                                                    Brand:
                                                </span>{' '}

                                                {car.brand}

                                            </p>

                                            <p className="text-[#94A3B8]">

                                                <span className="text-white font-semibold">
                                                    Price:
                                                </span>{' '}

                                                ₹{car.pricePerDay}/day

                                            </p>

                                            <p className="text-[#94A3B8]">

                                                <span className="text-white font-semibold">
                                                    Fuel:
                                                </span>{' '}

                                                {car.fuelType}

                                            </p>

                                            <p className="text-[#94A3B8]">

                                                <span className="text-white font-semibold">
                                                    Seats:
                                                </span>{' '}

                                                {car.seats}

                                            </p>

                                        </div>

                                        <button
                                            onClick={() => bookCar(car._id)}
                                            className="mt-auto w-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] py-4 rounded-2xl font-semibold hover:scale-[1.02] transition duration-300"
                                        >
                                            Book Now
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

export default Cars;