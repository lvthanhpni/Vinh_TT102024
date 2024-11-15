import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const Individual = () => {
    const [individuals, setIndividuals] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/individuals/')
            .then(response => {
                setIndividuals(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the individuals!", error);
            });
    }, []);

    return (
        <div className="page-container">
            <h2 className="page-title">Individuals</h2>
            <ul>
                {individuals.map(ind => (
                    <li className="list-item" key={ind.id}>
                        <p><strong>Name:</strong> {ind.full_name}</p>
                        <p><strong>Phone:</strong> {ind.phone}</p>
                        <p><strong>Email:</strong> {ind.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Individual;
