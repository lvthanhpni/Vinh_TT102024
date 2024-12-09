import React, { useState } from 'react';
import Recursive_folder from './Test';

const FolderPage = () => {
    // Initial Folder Tree
    const [folders, setFolders] = useState([
        {
            name: "eob",
            subfolders: [
                {
                    name: "Việt Nam",
                    subfolders: [],
                },
            ],
        },
    ]);

    // Function to Add File
    const addFileToFolder = (path, fileName) => {
        const currentYear = new Date().getFullYear();

        const addFileRecursively = (folders, path) => {
            if (path.length === 0) {
                // Check if the year folder exists
                let yearFolder = folders.find((folder) => folder.name === `${currentYear}`);
                if (!yearFolder) {
                    // If not, create it
                    yearFolder = { name: `${currentYear}`, subfolders: [] };
                    folders.push(yearFolder);
                }
                // Add the file to the year folder
                yearFolder.subfolders.push({ name: fileName });
                return folders;
            }

            const [currentFolderName, ...remainingPath] = path;
            const folder = folders.find((f) => f.name === currentFolderName);
            if (folder) {
                folder.subfolders = addFileRecursively(folder.subfolders, remainingPath);
            }
            return folders;
        };

        setFolders((prevFolders) => [...addFileRecursively(prevFolders, path)]);
    };

    // Example Usage of Add File
    const handleAddFile = () => {
        addFileToFolder(["eob", "Việt Nam"], "example-file.txt");
    };

    return (
        <div className="folder-page">
            <h1>Folder Tree</h1>
            <button onClick={handleAddFile}>Add File</button>
            {folders.map((folder, index) => (
                <Recursive_folder key={index} folder={folder} />
            ))}
        </div>
    );
};

export default FolderPage;
