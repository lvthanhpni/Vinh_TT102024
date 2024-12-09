import React, { useState } from 'react';
import Recursive_folder from './Recursive_folder';

const FolderPage = () => {
    // Initial Folder Tree
    const [folders, setFolders] = useState([
        {
            name: "eob",
            subfolders: [
                {
                    name: "Việt Nam",
                    subfolders: [
                        {
                            name: "Revit",
                            subfolders: [
                                {
                                    name: "Vật liệu xây dựng",
                                    subfolders: [
                                        {
                                            name: "Mặt dựng và trần nhôm Austra Alu",
                                            subfolders: [

                                            ]
                                        },
                                        {
                                            name: "Sơn trang trí Dulux",
                                            subfolders: [

                                            ]
                                        },
                                        {
                                            name: "Tấm cách âm cách nhiệt Phương Nam panel",
                                            subfolders: [

                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: "Kiến trúc",
                                    subfolders: [

                                    ]
                                },
                                {
                                    name: "Kết cấu",
                                    subfolders: [

                                    ]
                                },
                                {
                                    name: "MEP",
                                    subfolders: [

                                    ]
                                }
                            ]
                        },
                        {
                            name: "Auto CAD",
                            subfolders: [
                                {
                                    name: "Vật liệu xây dựng",
                                    subfolders: [
                                        {
                                            name: "Mặt dựng và trần nhôm Austra Alu",
                                            subfolders: [

                                            ]
                                        },
                                        {
                                            name: "Sơn trang trí Dulux",
                                            subfolders: [

                                            ]
                                        },
                                        {
                                            name: "Tấm cách âm cách nhiệt Phương Nam panel",
                                            subfolders: [

                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: "Kiến trúc",
                                    subfolders: [

                                    ]
                                },
                                {
                                    name: "Kết cấu",
                                    subfolders: [

                                    ]
                                },
                                {
                                    name: "MEP",
                                    subfolders: [

                                    ]
                                }
                            ]
                        },
                        {
                            name: "Sketch UP",
                            subfolders: [
                                {
                                    name: "Vật liệu xây dựng",
                                    subfolders: [
                                        {
                                            name: "Mặt dựng và trần nhôm Austra Alu",
                                            subfolders: [

                                            ]
                                        },
                                        {
                                            name: "Sơn trang trí Dulux",
                                            subfolders: [

                                            ]
                                        },
                                        {
                                            name: "Tấm cách âm cách nhiệt Phương Nam panel",
                                            subfolders: [

                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: "Kiến trúc",
                                    subfolders: [

                                    ]
                                },
                                {
                                    name: "Kết cấu",
                                    subfolders: [

                                    ]
                                },
                                {
                                    name: "MEP",
                                    subfolders: [

                                    ]
                                }
                            ]
                        },
                        {
                            name: "Tekla",
                            subfolders: [
                                {
                                    name: "Vật liệu xây dựng",
                                    subfolders: [
                                        {
                                            name: "Mặt dựng và trần nhôm Austra Alu",
                                            subfolders: [

                                            ]
                                        },
                                        {
                                            name: "Sơn trang trí Dulux",
                                            subfolders: [

                                            ]
                                        },
                                        {
                                            name: "Tấm cách âm cách nhiệt Phương Nam panel",
                                            subfolders: [

                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: "Kiến trúc",
                                    subfolders: [

                                    ]
                                },
                                {
                                    name: "Kết cấu",
                                    subfolders: [

                                    ]
                                },
                                {
                                    name: "MEP",
                                    subfolders: [

                                    ]
                                }
                            ]
                        },
                        {
                            name: "Archi CAD",
                            subfolders: [
                                {
                                    name: "Vật liệu xây dựng",
                                    subfolders: [
                                        {
                                            name: "Mặt dựng và trần nhôm Austra Alu",
                                            subfolders: [

                                            ]
                                        },
                                        {
                                            name: "Sơn trang trí Dulux",
                                            subfolders: [

                                            ]
                                        },
                                        {
                                            name: "Tấm cách âm cách nhiệt Phương Nam panel",
                                            subfolders: [

                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: "Kiến trúc",
                                    subfolders: [

                                    ]
                                },
                                {
                                    name: "Kết cấu",
                                    subfolders: [

                                    ]
                                },
                                {
                                    name: "MEP",
                                    subfolders: [

                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    name: "BIM-VietNam ",
                    subfolders: [{
                        name: "Vật liệu xây dựng",
                        subfolders: [
                            {
                                name: "ISO-19650",
                                subfolders: [
                                    { name: "ISO-19650-AP01" },

                                ]
                            },
                        ]
                    }]
                }
            ]
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


    return (
        <div className="folder-page">
            {folders.map((folder, index) => (
                <Recursive_folder key={index} folder={folder} />
            ))}
        </div>
    );
};

export default FolderPage;
