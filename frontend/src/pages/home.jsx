import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useSnackbar } from 'notistack';

const Home = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleLogout = async () => { // Corrected function name to camelCase
        try {
            await axios.post('http://localhost:5000/logout');
            enqueueSnackbar('Logout successful', { variant: 'success' });
            // Removed 'res.status(200).send('Logout successful')' as it's not applicable in a React component
            navigate('/');
        } catch (error) {
            console.error(error); // Changed console.log to console.error for error messages
            // Removed 'res.status(400).send('Logout failed')' as it's not applicable in a React component
            enqueueSnackbar('Logout failed', { variant: 'error' });
            alert("Logout failed");
        }
    };

    return (
        <div>
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <h1>Home</h1>
                <p>This is the home page.</p>

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>LOGOUT</button>
            </div>
        </div>
    );
}

export default Home;
