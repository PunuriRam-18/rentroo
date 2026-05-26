import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cars from './pages/Cars';
import Bookings from './pages/Bookings';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
function Layout() {

    const location = useLocation();

    const hideNavbar =
        location.pathname === '/login' ||
        location.pathname === '/register';

    return (

        <>

            {
                !hideNavbar && <Navbar />
            }

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

<Route
    path="/cars"
    element={
        <ProtectedRoute>
            <Cars />
        </ProtectedRoute>
    }
/>

<Route
    path="/bookings"
    element={
        <ProtectedRoute>
            <Bookings />
        </ProtectedRoute>
    }
/>
<Route
    path="/dashboard"
    element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    }
/>
<Route
    path="/admin"
    element={
        <ProtectedRoute>
            <Admin />
        </ProtectedRoute>
    }
/>
            </Routes>

        </>
    );
}

function App() {

    return (

        <BrowserRouter>

            <Layout />

        </BrowserRouter>
    );
}

export default App;