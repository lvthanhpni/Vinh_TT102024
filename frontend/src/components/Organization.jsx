import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Organization() {
    const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/organizations/')
            .then(response => {
                setOrganizations(response.data);
            })
            .catch(error => {
                console.error('Error fetching organizations:', error);
            });
    }, []);

    return (
        <div>
            <h1>Organizations List</h1>
            <ul>
                {organizations.map(organization => (
                    <li key={organization.id}>
                        <p>Company Name: {organization.company_name}</p>
                        <p>Tax Number: {organization.tax_num}</p>
                        <p>Phone: {organization.phone}</p>
                        <p>Email: {organization.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Organization;
