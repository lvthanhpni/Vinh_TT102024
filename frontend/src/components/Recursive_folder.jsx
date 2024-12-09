import React, { useState } from 'react';

const Recursive_folder = ({ folder }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className={`folder ${isOpen ? 'open' : ''}`} style={{ marginLeft: '20px' }}>
            <div
                className="folder-name"
                onClick={toggleOpen}
                style={{ cursor: folder.subfolders ? 'pointer' : 'default' }}
            >
                {folder.subfolders ? (isOpen ? '📂' : '📁') : '📄'} {folder.name}
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
