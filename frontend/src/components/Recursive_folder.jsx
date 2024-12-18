import React, { useState } from 'react';

const Recursive_folder = ({ folder, parentPath, onFolderClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle folder open state
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    // Handle click on the folder name
    const handleFolderClick = () => {
        const fullPath = parentPath ? `${parentPath}/${folder.id}` : folder.id; // Build full path
        onFolderClick(folder.id); // Pass folder ID to parent
        console.log(`Selected Folder ID: ${folder.id}`); // Log folder ID
    };

    return (
        <div className="folder" style={{ marginLeft: '20px' }}>
            <div
                className="folder-name"
                onClick={() => {
                    toggleOpen(); // Toggle folder visibility
                    handleFolderClick(); // Log folder ID
                }}
                style={{ cursor: 'pointer' }}
            >
                {isOpen ? '📂' : '📁'} {folder.name}
            </div>
            {isOpen && folder.subfolders && (
                <div className="subfolders">
                    {folder.subfolders.map((subfolder, index) => (
                        <Recursive_folder
                            key={index}
                            folder={subfolder}
                            parentPath={folder.id} // Pass the current folder ID as the parent path
                            onFolderClick={onFolderClick}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Recursive_folder;
