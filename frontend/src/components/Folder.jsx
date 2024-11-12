import React, { useState } from 'react';
import '../App.css';

const Folder = () => {
    const [openFolders, setOpenFolders] = useState({});

    const toggleFolder = (indexPath) => {
        // Toggle the open state of the folder at the given index path
        setOpenFolders((prevOpenFolders) => ({
            ...prevOpenFolders,
            [indexPath]: !prevOpenFolders[indexPath],
        }));
    };

    const renderFolders = (folders, parentIndex = '') => {
        return folders.map((folder, index) => {
            const indexPath = parentIndex ? `${parentIndex}-${index}` : `${index}`;
            const isOpen = openFolders[indexPath] || false;

            return (
                <div key={indexPath} className={`folder ${isOpen ? 'open' : ''}`}>
                    <div
                        className="folder-name"
                        onClick={() => toggleFolder(indexPath)}
                    >
                        {folder.name}
                    </div>
                    {folder.subfolders && folder.subfolders.length > 0 && isOpen && (
                        <div className="subfolders">
                            {renderFolders(folder.subfolders, indexPath)}
                        </div>
                    )}
                </div>
            );
        });
    };
    const folders = [
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
                                                { name: "2017" },
                                                { name: "2018" },
                                                { name: "2019" },
                                                { name: "2020" },
                                                { name: "2021" },
                                                { name: "2022" },
                                            ]
                                        },
                                        {
                                            name: "Sơn trang trí Dulux",
                                            subfolders: [
                                                { name: "2016" },
                                                { name: "2017" },
                                                { name: "2018" },
                                                { name: "2019" },
                                                { name: "2020" },
                                                { name: "2021" },
                                                { name: "2022" },
                                                { name: "2023" },
                                            ]
                                        },
                                        {
                                            name: "Tấm cách âm cách nhiệt Phương Nam panel",
                                            subfolders: [
                                                { name: "2017" },
                                                { name: "2018" },
                                                { name: "2019" },
                                                { name: "2020" },
                                                { name: "2021" },
                                                { name: "2022" },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: "Kiến trúc",
                                    subfolders: [
                                        { name: "2018" },
                                        { name: "2019" },
                                        { name: "2020" },
                                        { name: "2021" },
                                        { name: "2022" },
                                        { name: "2023" },
                                    ]
                                },
                                {
                                    name: "Kết cấu",
                                    subfolders: [
                                        { name: "2018" },
                                        { name: "2019" },
                                        { name: "2020" },
                                        { name: "2021" },
                                        { name: "2022" },
                                        { name: "2023" },
                                    ]
                                },
                                {
                                    name: "MEP",
                                    subfolders: [
                                        { name: "2018" },
                                        { name: "2019" },
                                        { name: "2020" },
                                        { name: "2021" },
                                        { name: "2022" },
                                        { name: "2023" },
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
                                                { name: "2017" },
                                                { name: "2018" },
                                                { name: "2019" },
                                                { name: "2020" },
                                                { name: "2021" },
                                                { name: "2022" },
                                            ]
                                        },
                                        {
                                            name: "Sơn trang trí Dulux",
                                            subfolders: [
                                                { name: "2016" },
                                                { name: "2017" },
                                                { name: "2018" },
                                                { name: "2019" },
                                                { name: "2020" },
                                                { name: "2021" },
                                                { name: "2022" },
                                                { name: "2023" },
                                            ]
                                        },
                                        {
                                            name: "Tấm cách âm cách nhiệt Phương Nam panel",
                                            subfolders: [
                                                { name: "2017" },
                                                { name: "2018" },
                                                { name: "2019" },
                                                { name: "2020" },
                                                { name: "2021" },
                                                { name: "2022" },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: "Kiến trúc",
                                    subfolders: [
                                        { name: "2018" },
                                        { name: "2019" },
                                        { name: "2020" },
                                        { name: "2021" },
                                        { name: "2022" },
                                        { name: "2023" },
                                    ]
                                },
                                {
                                    name: "Kết cấu",
                                    subfolders: [
                                        { name: "2018" },
                                        { name: "2019" },
                                        { name: "2020" },
                                        { name: "2021" },
                                        { name: "2022" },
                                        { name: "2023" },
                                    ]
                                },
                                {
                                    name: "MEP",
                                    subfolders: [
                                        { name: "2018" },
                                        { name: "2019" },
                                        { name: "2020" },
                                        { name: "2021" },
                                        { name: "2022" },
                                        { name: "2023" },
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
                                                { name: "2017" },
                                                { name: "2018" },
                                                { name: "2019" },
                                                { name: "2020" },
                                                { name: "2021" },
                                                { name: "2022" },
                                            ]
                                        },
                                        {
                                            name: "Sơn trang trí Dulux",
                                            subfolders: [
                                                { name: "2016" },
                                                { name: "2017" },
                                                { name: "2018" },
                                                { name: "2019" },
                                                { name: "2020" },
                                                { name: "2021" },
                                                { name: "2022" },
                                                { name: "2023" },
                                            ]
                                        },
                                        {
                                            name: "Tấm cách âm cách nhiệt Phương Nam panel",
                                            subfolders: [
                                                { name: "2017" },
                                                { name: "2018" },
                                                { name: "2019" },
                                                { name: "2020" },
                                                { name: "2021" },
                                                { name: "2022" },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: "Kiến trúc",
                                    subfolders: [
                                        { name: "2018" },
                                        { name: "2019" },
                                        { name: "2020" },
                                        { name: "2021" },
                                        { name: "2022" },
                                        { name: "2023" },
                                    ]
                                },
                                {
                                    name: "Kết cấu",
                                    subfolders: [
                                        { name: "2018" },
                                        { name: "2019" },
                                        { name: "2020" },
                                        { name: "2021" },
                                        { name: "2022" },
                                        { name: "2023" },
                                    ]
                                },
                                {
                                    name: "MEP",
                                    subfolders: [
                                        { name: "2018" },
                                        { name: "2019" },
                                        { name: "2020" },
                                        { name: "2021" },
                                        { name: "2022" },
                                        { name: "2023" },
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
                                                { name: "2017" },
                                                { name: "2018" },
                                                { name: "2019" },
                                                { name: "2020" },
                                                { name: "2021" },
                                                { name: "2022" },
                                            ]
                                        },
                                        {
                                            name: "Sơn trang trí Dulux",
                                            subfolders: [
                                                { name: "2016" },
                                                { name: "2017" },
                                                { name: "2018" },
                                                { name: "2019" },
                                                { name: "2020" },
                                                { name: "2021" },
                                                { name: "2022" },
                                                { name: "2023" },
                                            ]
                                        },
                                        {
                                            name: "Tấm cách âm cách nhiệt Phương Nam panel",
                                            subfolders: [
                                                { name: "2017" },
                                                { name: "2018" },
                                                { name: "2019" },
                                                { name: "2020" },
                                                { name: "2021" },
                                                { name: "2022" },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: "Kiến trúc",
                                    subfolders: [
                                        { name: "2018" },
                                        { name: "2019" },
                                        { name: "2020" },
                                        { name: "2021" },
                                        { name: "2022" },
                                        { name: "2023" },
                                    ]
                                },
                                {
                                    name: "Kết cấu",
                                    subfolders: [
                                        { name: "2018" },
                                        { name: "2019" },
                                        { name: "2020" },
                                        { name: "2021" },
                                        { name: "2022" },
                                        { name: "2023" },
                                    ]
                                },
                                {
                                    name: "MEP",
                                    subfolders: [
                                        { name: "2018" },
                                        { name: "2019" },
                                        { name: "2020" },
                                        { name: "2021" },
                                        { name: "2022" },
                                        { name: "2023" },
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
                                                { name: "2017" },
                                                { name: "2018" },
                                                { name: "2019" },
                                                { name: "2020" },
                                                { name: "2021" },
                                                { name: "2022" },
                                            ]
                                        },
                                        {
                                            name: "Sơn trang trí Dulux",
                                            subfolders: [
                                                { name: "2016" },
                                                { name: "2017" },
                                                { name: "2018" },
                                                { name: "2019" },
                                                { name: "2020" },
                                                { name: "2021" },
                                                { name: "2022" },
                                                { name: "2023" },
                                            ]
                                        },
                                        {
                                            name: "Tấm cách âm cách nhiệt Phương Nam panel",
                                            subfolders: [
                                                { name: "2017" },
                                                { name: "2018" },
                                                { name: "2019" },
                                                { name: "2020" },
                                                { name: "2021" },
                                                { name: "2022" },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: "Kiến trúc",
                                    subfolders: [
                                        { name: "2018" },
                                        { name: "2019" },
                                        { name: "2020" },
                                        { name: "2021" },
                                        { name: "2022" },
                                        { name: "2023" },
                                    ]
                                },
                                {
                                    name: "Kết cấu",
                                    subfolders: [
                                        { name: "2018" },
                                        { name: "2019" },
                                        { name: "2020" },
                                        { name: "2021" },
                                        { name: "2022" },
                                        { name: "2023" },
                                    ]
                                },
                                {
                                    name: "MEP",
                                    subfolders: [
                                        { name: "2018" },
                                        { name: "2019" },
                                        { name: "2020" },
                                        { name: "2021" },
                                        { name: "2022" },
                                        { name: "2023" },
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
        }
    ]





    return (
        <div className="folder-tree" >
            {renderFolders(folders)}
        </div >
    );
};

export default Folder;
