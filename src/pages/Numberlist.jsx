import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';


const base_API_URL = 'https://philosophical-amity-mgcenter-8000e7e0.koyeb.app';

const NumbersList = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const token = localStorage.getItem('userToken').access;

                const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI2NjAzNDcyLCJpYXQiOjE3MjYwMDM0NzIsImp0aSI6IjQ4Mzk0NzdjYWUxYjQ0ZTFhNTBlZDIxY2NiYjlmZmY2IiwidXNlcl9pZCI6NDAsImVtYWlsIjoiZm9wYXI3Njg1NEBrb25ldGFzLmNvbSJ9.4NvdeUqAamBgzGC6mJQK2PsdrjyccSy3r0f0JGPHrzE"
                if (!token) {
                    throw new Error('No access token found');
                    // return <div className="loading">Loading...</div>;
                    
                }

                const response = await axios.get(`${base_API_URL}/api/numbers/list/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                setData(response.data);
            } catch (err) {
                if (err.response) {
                    const status = err.response.status;
                    if (status === 401) {
                        setError('Unauthorized: Token is invalid or expired');
                    } else if (status === 429) {
                        setError('Too Many Requests: Try again later.');
                    } else {
                        setError('An error occurred. Please try again.');
                    }
                } else {
                    setError('An error occurred. Please try again----.');
                }
            }
             finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="numbers-list">
            {data && data.success ? (
                <ul>
                    {data.countries_list.map((country) => (
                        <li key={country.id} className="country-item">
                            <span className="country-icon">{country.country_icon}</span>
                            <span className="country-name">{country.name}</span>
                            <span className="country-code">{country.country_code}</span>
                            <span className="amount">{country.amount} numbers available</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>No data available</div>
            )}
        </div>
    );
};

export default NumbersList;