import React, { useState, useEffect } from 'react';
import Recursive_folder from './Recursive_folder';
import axios from 'axios';

// Function to generate software folder structure
function generateSoftwareFolders() {
    const softwareNames = ["Revit", "Auto CAD", "Sketch UP", "Tekla", "Archi CAD"];
    return softwareNames.map((name, index) => ({
        id: `software-${index}`, // Ensure unique IDs
        name: name,
        subfolders: generateMaterialAndCategoryFolders()
    }));
}

function generateMaterialAndCategoryFolders() {
    const categories = ["Kiến trúc", "Kết cấu", "MEP"];
    return [
        {
            id: "material-1",
            name: "Vật liệu xây dựng",
            subfolders: generateMaterialFolders()
        },
        ...categories.map((category, index) => ({
            id: `category-${index + 1}`, // Ensure unique IDs
            name: category,
            subfolders: []
        }))
    ];
}

function generateMaterialFolders() {
    return [
        {
            id: "material-alu",
            name: "Mặt dựng và trần nhôm Austra Alu",
            subfolders: []
        },
        {
            id: "material-dulux",
            name: "Sơn trang trí Dulux",
            subfolders: []
        },
        {
            id: "material-panel",
            name: "Tấm cách âm cách nhiệt Phương Nam panel",
            subfolders: []
        },
    ];
}

const folderStructure = [
    {
        name: "EOB",
        subfolders: [
            {
                name: "Việt Nam",
                subfolders: generateSoftwareFolders()
            },
            {
                name: "BIM-VietNam",
                subfolders: [
                    {
                        id: "bim-iso",
                        name: "ISO-19650",
                        subfolders: [
                            { id: "iso-ap01", name: "ISO-19650-AP01", subfolders: [] }
                        ]
                    }
                ]
            }
        ]
    }
];

const FolderPage = ({ onFolderSelect }) => {
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const response = await axios.get('/api/folders/'); // Fetch folders from backend
                setFolders(response.data); // Populate folder data
            } catch (err) {
                setError('Failed to load folders.');
                console.error('Error fetching folders:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFolders();
    }, []);

    const handleFolderClick = (id) => {
        console.log(`Selected Folder ID: ${id}`); // Log folder ID
        onFolderSelect(id); // Send folder ID to parent
    };

    if (loading) {
        return <div>Loading folders...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="folder-page">
            {folders.map((folder, index) => (
                <Recursive_folder
                    key={index}
                    folder={folder}
                    onFolderClick={handleFolderClick}
                />
            ))}
        </div>
    );
};

export default FolderPage;
