import React, { useState, useEffect } from "react";
import axios from "axios";

const CreatePost = () => {
    const [region, setRegion] = useState("");
    const [formData, setFormData] = useState({
        softwareFolder: "",
        categoryFolder: "",
        materialFolder: "",
        title: "",
        caption: "",
        picture: null,
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const [folderOptions, setFolderOptions] = useState({
        softwareFolders: [],
        categoryFolders: [],
        materialFolders: [],
    });

    useEffect(() => {
        // Set folder options dynamically based on selected region
        if (region === "Việt Nam") {
            setFolderOptions({
                softwareFolders: ["Revit", "Auto CAD", "Sketch UP", "Tekla", "Archi CAD"],
                categoryFolders: ["Kiến trúc", "Kết cấu", "MEP"],
                materialFolders: [
                    "Mặt dựng và trần nhôm Austra Alu",
                    "Sơn trang trí Dulux",
                    "Tấm cách âm cách nhiệt Phương Nam panel",
                ],
            });
        } else if (region === "BIM-VietNam") {
            setFolderOptions({
                softwareFolders: [],
                categoryFolders: [],
                materialFolders: ["ISO-19650"],
            });
        } else {
            setFolderOptions({ softwareFolders: [], categoryFolders: [], materialFolders: [] });
        }
    }, [region]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, picture: e.target.files[0] });
    };

    const handlePostCreate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        const postData = new FormData();
        postData.append("region", region); // Include region in the request
        for (const key in formData) {
            postData.append(key, formData[key]);
        }

        try {
            const response = await axios.post("/api/posts/create/", postData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            setSuccess(true);
            setLoading(false);
            setFormData({
                softwareFolder: "",
                categoryFolder: "",
                materialFolder: "",
                title: "",
                caption: "",
                picture: null,
            });
            setRegion(""); // Reset region
        } catch (err) {
            setError("Failed to create post. Please try again.");
            setLoading(false);
        }
    };

    return (
        <section style={{ backgroundColor: "#eee" }}>
            <div className="container h-100" style={{ paddingBottom: "50px" }}>
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-7 col-xl-6">
                        <div className="card text-black" style={{ borderRadius: "25px" }}>
                            <div className="card-body p-md-5">
                                <h2 className="text-center h4 fw-bold mb-4">Create a Post</h2>

                                {error && <div className="alert alert-danger">{error}</div>}
                                {success && <div className="alert alert-success">Post created successfully!</div>}

                                <form onSubmit={handlePostCreate} className="mx-1 mx-md-4">
                                    {/* Region Selection */}
                                    <div className="d-flex flex-row mb-4">
                                        <i className="fas fa-globe fa-lg me-3 fa-fw"></i>
                                        <div className="form-outline flex-fill mb-0">
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="region"
                                                    value="Việt Nam"
                                                    checked={region === "Việt Nam"}
                                                    onChange={(e) => setRegion(e.target.value)}
                                                />
                                                Việt Nam
                                            </label>
                                            <label style={{ marginLeft: "10px" }}>
                                                <input
                                                    type="radio"
                                                    name="region"
                                                    value="BIM-VietNam"
                                                    checked={region === "BIM-VietNam"}
                                                    onChange={(e) => setRegion(e.target.value)}
                                                />
                                                BIM-VietNam
                                            </label>
                                        </div>
                                    </div>

                                    {/* Show additional fields for Việt Nam */}
                                    {region === "Việt Nam" && (
                                        <>
                                            <div className="d-flex flex-row mb-4">
                                                <i className="fas fa-laptop-code fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <select
                                                        name="softwareFolder"
                                                        className="form-control"
                                                        value={formData.softwareFolder}
                                                        onChange={handleInputChange}
                                                        required
                                                    >
                                                        <option value="">Select Software Folder</option>
                                                        {folderOptions.softwareFolders.map((folder) => (
                                                            <option key={folder} value={folder}>
                                                                {folder}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row mb-4">
                                                <i className="fas fa-sitemap fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <select
                                                        name="categoryFolder"
                                                        className="form-control"
                                                        value={formData.categoryFolder}
                                                        onChange={handleInputChange}
                                                        required
                                                    >
                                                        <option value="">Select Category Folder</option>
                                                        {folderOptions.categoryFolders.map((folder) => (
                                                            <option key={folder} value={folder}>
                                                                {folder}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {/* Show Material Folder */}
                                    {region && (
                                        <div className="d-flex flex-row mb-4">
                                            <i className="fas fa-boxes fa-lg me-3 fa-fw"></i>
                                            <div className="form-outline flex-fill mb-0">
                                                <select
                                                    name="materialFolder"
                                                    className="form-control"
                                                    value={formData.materialFolder}
                                                    onChange={handleInputChange}
                                                    required
                                                >
                                                    <option value="">Select Material Folder</option>
                                                    {folderOptions.materialFolders.map((folder) => (
                                                        <option key={folder} value={folder}>
                                                            {folder}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    )}

                                    {/* Title Input */}
                                    <div className="d-flex flex-row mb-4">
                                        <i className="fas fa-heading fa-lg me-3 fa-fw"></i>
                                        <div className="form-outline flex-fill mb-0">
                                            <input
                                                type="text"
                                                name="title"
                                                placeholder="Post Title"
                                                className="form-control"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Caption Input */}
                                    <div className="d-flex flex-row mb-4">
                                        <i className="fas fa-pencil-alt fa-lg me-3 fa-fw"></i>
                                        <div className="form-outline flex-fill mb-0">
                                            <textarea
                                                name="caption"
                                                placeholder="Post Caption"
                                                className="form-control"
                                                value={formData.caption}
                                                onChange={handleInputChange}
                                                rows="4"
                                                required
                                            ></textarea>
                                        </div>
                                    </div>

                                    {/* Picture Input */}
                                    <div className="d-flex flex-row mb-4">
                                        <i className="fas fa-image fa-lg me-3 fa-fw"></i>
                                        <div className="form-outline flex-fill mb-0">
                                            <input
                                                type="file"
                                                name="picture"
                                                className="form-control"
                                                onChange={handleFileChange}
                                                accept="image/*"
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                        <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                                            {loading ? "Creating..." : "Create Post"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreatePost;
