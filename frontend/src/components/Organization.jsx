import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const Organization = () => {
    const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/organizations/')
            .then(response => {
                setOrganizations(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the organizations!", error);
            });
    }, []);

    return (
        <div className="page-container">
            <h2 className="page-title">Organizations</h2>
            <ul>
                {organizations.map(org => (
                    <li className="list-item" key={org.id}>
                        <p><strong>Company Name:</strong> {org.company_name}</p>
                        <p><strong>Tax Number:</strong> {org.tax_num}</p>
                        <p><strong>Phone:</strong> {org.phone}</p>
                        <p><strong>Email:</strong> {org.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Organization;
