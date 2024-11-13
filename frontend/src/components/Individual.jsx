import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Individual() {
    const [individuals, setIndividuals] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/individuals/')
            .then(response => {
                setIndividuals(response.data);
            })
            .catch(error => {
                console.error('Error fetching individuals:', error);
            });
    }, []);

    return (
        <div>
            <h1>Individuals List</h1>
            <ul>
                {individuals.map(individual => (
                    <li key={individual.id}>
                        <p>Name: {individual.full_name}</p>
                        <p>Email: {individual.email}</p>
                        <p>Phone: {individual.phone}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Individual;
