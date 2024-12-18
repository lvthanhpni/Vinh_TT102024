import React, { useState } from 'react';
import Recursive_folder from './Recursive_folder';

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
        id: "root-eob",
        name: "EOB",
        subfolders: [
            {
                id: "root-vn",
                name: "Việt Nam",
                subfolders: generateSoftwareFolders()
            },
            {
                id: "root-bim",
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
    const [folders, setFolders] = useState(folderStructure);

    const handleFolderClick = (id) => {
        console.log(`Selected Folder ID: ${id}`); // Ensure correct folder ID is logged
        onFolderSelect(id); // Pass the folder ID to the parent
    };

    return (
        <div className="folder-page">
            {folders.map((folder, index) => (
                <Recursive_folder
                    key={index}
                    folder={folder}
                    parentPath="" // Root level has no parent path
                    onFolderClick={handleFolderClick}
                />
            ))}
        </div>
    );
};

export default FolderPage;
