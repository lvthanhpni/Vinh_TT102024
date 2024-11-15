import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VLXD() {
    const [vlxds, setVlxds] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/vlxd/')
            .then(response => {
                setVlxds(response.data);
            })
            .catch(error => {
                console.error('Error fetching VLXD data:', error);
            });
    }, []);

    return (
        <div>
            <h1>VLXD List</h1>
            <ul>
                {vlxds.map(vlxd => (
                    <li key={vlxd.id}>
                        <p>Company Name: {vlxd.company_name}</p>
                        <p>Job: {vlxd.job}</p>
                        <p>Phone: {vlxd.phone}</p>
                        <p>Email: {vlxd.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default VLXD;
