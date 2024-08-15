import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import Navbar from '../pages/Navbar';  

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    const fetchProducts = async () => {
        try {
            const url = "https://deploy-mern-login-signup-api.vercel.app/auth/products";
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                },
            };
            const response = await fetch(url, headers);
            const result = await response.json();
            console.log(result);
            setProducts(result);
        } catch (err) {
            handleError(err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div style={{ marginTop: '60px' }}> {/* Add margin to avoid content overlap with navbar */}
            <Navbar loggedInUser={loggedInUser} />
            <div style={{ padding: '20px' }}>
                <h1>Welcome {loggedInUser}</h1>
                <div>
                    {products.length > 0 && products.map((item, index) => (
                        <ul key={index}>
                            <span>{item.name} : {item.price}</span>
                        </ul>
                    ))}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Home;
