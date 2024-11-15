import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const VLXD = () => {
    const [vlxdCompanies, setVlxdCompanies] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/vlxd/')
            .then(response => {
                setVlxdCompanies(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the VLXD companies!", error);
            });
    }, []);

    return (
        <div className="page-container">
            <h2 className="page-title">VLXD Companies</h2>
            <ul>
                {vlxdCompanies.map(vlxd => (
                    <li className="list-item" key={vlxd.id}>
                        <p><strong>Company Name:</strong> {vlxd.company_name}</p>
                        <p><strong>Phone:</strong> {vlxd.phone}</p>
                        <p><strong>Email:</strong> {vlxd.email}</p>
                        <p><strong>Job:</strong> {vlxd.job}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VLXD;
