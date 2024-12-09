
import React, { useState } from 'react';

const Recursive_folder = ({ folder }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    // Render only if the folder has subfolders (excluding files)
    if (!folder.subfolders) {
        return null;
    }

    return (
        <div className={`folder ${isOpen ? 'open' : ''}`} style={{ marginLeft: '20px' }}>
            <div
                className="folder-name"
                onClick={toggleOpen}
                style={{ cursor: 'pointer' }}
            >
                {isOpen ? '📂' : '📁'} {folder.name}
            </div>
            {isOpen && folder.subfolders && (
                <div className="subfolders">
                    {folder.subfolders.map((subfolder, index) => (
                        <Recursive_folder key={index} folder={subfolder} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Recursive_folder;
