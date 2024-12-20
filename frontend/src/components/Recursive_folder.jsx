import React, { useState } from 'react';

const Recursive_folder = ({ folder, onFolderClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleFolderClick = () => {
        toggleOpen(); // Toggle subfolder visibility
        if (onFolderClick) onFolderClick(folder.id); // Return the folder ID
    };

    return (
        <div className="folder" style={{ marginLeft: '20px' }}>
            <div
                className="folder-name"
                onClick={handleFolderClick}
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
                            onFolderClick={onFolderClick} // Pass the callback down
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Recursive_folder;
