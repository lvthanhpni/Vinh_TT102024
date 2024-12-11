
import React, { useState } from 'react';
import Recursive_folder from './Recursive_folder';

// Function to generate software folder structure
function generateSoftwareFolders() {
    const softwareNames = ["Revit", "Auto CAD", "Sketch UP", "Tekla", "Archi CAD"];
    return softwareNames.map(name => ({
        name: name,
        subfolders: generateMaterialAndCategoryFolders()
    }));
}

// Function to generate material and category folders
function generateMaterialAndCategoryFolders() {
    const categories = ["Kiến trúc", "Kết cấu", "MEP"];
    return [
        {
            name: "Vật liệu xây dựng",
            subfolders: generateMaterialFolders()
        },
        ...categories.map(category => ({
            name: category,
            subfolders: []
        }))
    ];
}

// Function to generate year subfolders
function generateYearFolders(years) {
    return years.map(year => ({
        name: year.toString(),
        subfolders: []
    }));
}

// Function to generate material folders
function generateMaterialFolders() {
    const years = ["2024"]; // Extendable list of years
    return [
        {
            name: "Mặt dựng và trần nhôm Austra Alu",
            subfolders: generateYearFolders(years)
        },
        {
            name: "Sơn trang trí Dulux",
            subfolders: generateYearFolders(years)
        },
        {
            name: "Tấm cách âm cách nhiệt Phương Nam panel",
            subfolders: generateYearFolders(years)
        },
    ];
}


// Initial folder structure starting with EOB
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
                        name: "Vật liệu xây dựng",
                        subfolders: [
                            {
                                name: "ISO-19650",
                                subfolders: [
                                    { name: "ISO-19650-AP01" },
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

const FolderPage = () => {
    const [folders, setFolders] = useState(folderStructure);

    // Function to add a file to a folder
    const addFileToFolder = (path, fileName) => {
        const currentYear = new Date().getFullYear();

        const addFileRecursively = (folders, path) => {
            if (path.length === 0) {
                let yearFolder = folders.find(folder => folder.name === `${currentYear}`);
                if (!yearFolder) {
                    yearFolder = { name: `${currentYear}`, subfolders: [] };
                    folders.push(yearFolder);
                }
                yearFolder.subfolders.push({ name: fileName });
                return folders;
            }

            const [currentFolderName, ...remainingPath] = path;
            const folder = folders.find(f => f.name === currentFolderName);
            if (folder) {
                folder.subfolders = addFileRecursively(folder.subfolders, remainingPath);
            }
            return folders;
        };

        setFolders(prevFolders => [...addFileRecursively(prevFolders, path)]);
    };

    return (
        <div className="folder-page">
            {folders.map((folder, index) => (
                <Recursive_folder key={index} folder={folder} />
            ))}
        </div>
    );
};

export default FolderPage;
