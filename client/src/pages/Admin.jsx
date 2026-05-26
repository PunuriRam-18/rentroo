import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Admin() {

    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [pricePerDay, setPricePerDay] = useState('');
    const [fuelType, setFuelType] = useState('');
    const [seats, setSeats] = useState('');
    const [image, setImage] = useState(null);

    const [cars, setCars] = useState([]);
    const [editId, setEditId] = useState(null);

    useEffect(() => {

        fetchCars();

    }, []);

    const fetchCars = async () => {

        try {

            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/cars`
            );

            setCars(data);

        } catch (error) {

            console.log(error);
        }
    };

    const submitHandler = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem('token');

            const formData = new FormData();

            formData.append('name', name);
            formData.append('brand', brand);
            formData.append('pricePerDay', pricePerDay);
            formData.append('fuelType', fuelType);
            formData.append('seats', seats);

            if (image) {

                formData.append('image', image);
            }

            let data;

            if (editId) {

                const response = await axios.put(
                    `${import.meta.env.VITE_API_URL}/api/cars/${editId}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );

                data = response.data;

            } else {

                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/cars`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );

                data = response.data;
            }

            toast.success(data.message);

            fetchCars();

            setName('');
            setBrand('');
            setPricePerDay('');
            setFuelType('');
            setSeats('');
            setImage(null);

            setEditId(null);

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message || 'Action Failed'
            );
        }
    };

    const deleteHandler = async (id) => {

        try {

            const token = localStorage.getItem('token');

            const { data } = await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/cars/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success(data.message);

            fetchCars();

        } catch (error) {

            console.log(error);

            toast.error('Delete Failed');
        }
    };

    const editHandler = (car) => {

        setEditId(car._id);

        setName(car.name);
        setBrand(car.brand);
        setPricePerDay(car.pricePerDay);
        setFuelType(car.fuelType);
        setSeats(car.seats);
    };

    return (

        <div className="min-h-screen bg-[#0A0F1C] text-white py-10 px-6">

            <div className="max-w-7xl mx-auto">

                <h1 className="text-5xl font-bold mb-10 text-center">

                    Admin Panel

                </h1>

                <form
                    onSubmit={submitHandler}
                    className="bg-[#111827] border border-[#1F2937] rounded-3xl p-8 shadow-2xl space-y-5"
                >

                    <input
                        type="text"
                        placeholder="Car Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#0A0F1C] border border-[#374151] p-4 rounded-2xl outline-none focus:border-[#3B82F6]"
                    />

                    <input
                        type="text"
                        placeholder="Brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="w-full bg-[#0A0F1C] border border-[#374151] p-4 rounded-2xl outline-none focus:border-[#3B82F6]"
                    />

                    <input
                        type="number"
                        placeholder="Price Per Day"
                        value={pricePerDay}
                        onChange={(e) => setPricePerDay(e.target.value)}
                        className="w-full bg-[#0A0F1C] border border-[#374151] p-4 rounded-2xl outline-none focus:border-[#3B82F6]"
                    />

                    <input
                        type="text"
                        placeholder="Fuel Type"
                        value={fuelType}
                        onChange={(e) => setFuelType(e.target.value)}
                        className="w-full bg-[#0A0F1C] border border-[#374151] p-4 rounded-2xl outline-none focus:border-[#3B82F6]"
                    />

                    <input
                        type="number"
                        placeholder="Seats"
                        value={seats}
                        onChange={(e) => setSeats(e.target.value)}
                        className="w-full bg-[#0A0F1C] border border-[#374151] p-4 rounded-2xl outline-none focus:border-[#3B82F6]"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full bg-[#0A0F1C] border border-[#374151] p-4 rounded-2xl outline-none"
                    />

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] py-4 rounded-2xl font-semibold hover:scale-[1.02] transition duration-300"
                    >
                        {
                            editId ? 'Update Car' : 'Add Car'
                        }
                    </button>

                </form>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

                    {
                        cars.map((car) => (

                            <div
                                key={car._id}
                                className="bg-[#111827] border border-[#1F2937] rounded-3xl p-5 shadow-xl"
                            >

                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-52 object-cover rounded-2xl mb-4"
                                />

                                <h2 className="text-2xl font-bold mb-3">

                                    {car.name}

                                </h2>

                                <div className="space-y-2 mb-5">

                                    <p className="text-[#94A3B8]">
                                        Brand: {car.brand}
                                    </p>

                                    <p className="text-[#94A3B8]">
                                        Fuel: {car.fuelType}
                                    </p>

                                    <p className="text-[#94A3B8]">
                                        Seats: {car.seats}
                                    </p>

                                    <p className="text-[#94A3B8]">
                                        ₹{car.pricePerDay}/day
                                    </p>

                                </div>

                                <button
                                    onClick={() => editHandler(car)}
                                    className="w-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] py-3 rounded-2xl font-semibold mb-3 transition duration-300"
                                >
                                    Edit Car
                                </button>

                                <button
                                    onClick={() => deleteHandler(car._id)}
                                    className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-2xl font-semibold transition duration-300"
                                >
                                    Delete Car
                                </button>

                            </div>
                        ))
                    }

                </div>

            </div>

        </div>
    );
}

export default Admin;