// Recursive_folder.jsx
import React, { useState } from 'react';

const Recursive_folder = ({ folder, onFolderClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleFolderClick = () => {
        toggleOpen();
        if (onFolderClick) onFolderClick(folder.id);
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
                    {folder.subfolders.map((subfolder) => (
                        <Recursive_folder
                            key={subfolder.id}
                            folder={subfolder}
                            onFolderClick={onFolderClick}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Recursive_folder;
