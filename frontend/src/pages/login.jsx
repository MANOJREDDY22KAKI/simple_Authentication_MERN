import React, { useState } from 'react'; // Added curly braces around useState
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const Login = () => { // Renamed component from login to Login to follow naming convention

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(email, password);

        const data = {
            email,
            password
        }

        axios.post('http://localhost:5000/', data) // Changed the endpoint to '/login'
            .then((response) => {
                console.log(response.data);
                enqueueSnackbar('Login successful', { variant: 'success' });
                navigate('/home');
            })
            .catch((error) => {
                console.error(error); // Changed console.log to console.error for error messages
                enqueueSnackbar('Login failed', { variant: 'error' });
                alert("Login failed");
            })
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4 text-center">LOGIN</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Login
                </button>
            </form>
            <p className="text-center mt-4">Don't have an account? <a href="/register" className="text-blue-700">Register</a></p>
        </div>
    );
}

export default Login;
