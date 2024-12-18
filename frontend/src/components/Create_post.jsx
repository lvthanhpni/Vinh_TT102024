import React, { useState } from 'react';
import axios from 'axios';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [picture, setPicture] = useState(null);
    const [location, setLocation] = useState('');
    const [software, setSoftware] = useState('');
    const [category, setCategory] = useState('');
    const [material, setMaterial] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Predefined options
    const locations = ['Việt Nam', 'BIM-VietNam'];
    const validMaterials = [
        'Mặt dựng và trần nhôm Austra Alu',
        'Sơn trang trí Dulux',
        'Tấm cách âm cách nhiệt Phương Nam panel',
    ];
    const validCategories = ['Kiến trúc', 'Kết cấu', 'MEP'];
    const validSoftware = ['Revit', 'Auto CAD', 'Sketch UP', 'Tekla', 'Archi CAD'];

    const handlePostCreate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('caption', caption);
        if (picture) {
            formData.append('picture', picture);
        }

        // Validate folder path based on fixed hierarchy
        let folderPath = '';
        if (location === 'Việt Nam') {
            if (!validSoftware.includes(software) || !validCategories.includes(category)) {
                setError('Invalid selection for Software or Category.');
                setLoading(false);
                return;
            }
            if (category === 'Kiến trúc' && !validMaterials.includes(material)) {
                setError('Invalid selection for Material.');
                setLoading(false);
                return;
            }
            folderPath = category === 'Kiến trúc'
                ? `EOB/Việt Nam/${software}/Vật liệu xây dựng/${material}`
                : `EOB/Việt Nam/${software}/${category}`;
        } else if (location === 'BIM-VietNam') {
            folderPath = 'EOB/BIM-VietNam/ISO-19650/ISO-19650-AP01';
        } else {
            setError('Please select a valid location.');
            setLoading(false);
            return;
        }

        formData.append('folder', folderPath);

        try {
            const response = await axios.post('/api/posts/create/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            console.log('Post created successfully:', response.data);
            setSuccess(true);
        } catch (err) {
            console.error('Error creating post:', err.response?.data || err.message);
            setError(err.response?.data?.error || 'Failed to create post.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section style={{ backgroundColor: '#eee' }}>
            <div className="container h-100" style={{ paddingBottom: '50px' }}>
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-7 col-xl-6">
                        <div className="card text-black" style={{ borderRadius: '25px' }}>
                            <div className="card-body p-md-5">
                                <h2 className="text-center h4 fw-bold mb-4">Create a Post</h2>

                                {error && <div className="alert alert-danger">{error}</div>}
                                {success && <div className="alert alert-success">Post created successfully!</div>}

                                <form onSubmit={handlePostCreate} className="mx-1 mx-md-4">
                                    {/* Title Input */}
                                    <div className="d-flex flex-row mb-4">
                                        <i className="fas fa-heading fa-lg me-3 fa-fw"></i>
                                        <div className="form-outline flex-fill mb-0">
                                            <input
                                                type="text"
                                                id="post_title"
                                                placeholder="Post Title"
                                                className="form-control"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Caption Input */}
                                    <div className="d-flex flex-row mb-4">
                                        <i className="fas fa-pencil-alt fa-lg me-3 fa-fw"></i>
                                        <div className="form-outline flex-fill mb-0">
                                            <textarea
                                                id="post_caption"
                                                placeholder="Post Caption"
                                                className="form-control"
                                                value={caption}
                                                onChange={(e) => setCaption(e.target.value)}
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
                                                id="post_picture"
                                                className="form-control"
                                                onChange={(e) => setPicture(e.target.files[0])}
                                                accept="image/*"
                                            />
                                        </div>
                                    </div>

                                    {/* Location Dropdown */}
                                    <div className="d-flex flex-row mb-4">
                                        <i className="fas fa-map-marker-alt fa-lg me-3 fa-fw"></i>
                                        <div className="form-outline flex-fill mb-0">
                                            <select
                                                id="post_location"
                                                className="form-control"
                                                value={location}
                                                onChange={(e) => setLocation(e.target.value)}
                                                required
                                            >
                                                <option value="">Select Location</option>
                                                {locations.map((loc) => (
                                                    <option key={loc} value={loc}>
                                                        {loc}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Conditional Dropdowns */}
                                    {location === 'Việt Nam' && (
                                        <>
                                            {/* Software Dropdown */}
                                            <div className="d-flex flex-row mb-4">
                                                <i className="fas fa-tools fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <select
                                                        id="post_software"
                                                        className="form-control"
                                                        value={software}
                                                        onChange={(e) => setSoftware(e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select Software</option>
                                                        {validSoftware.map((soft) => (
                                                            <option key={soft} value={soft}>
                                                                {soft}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Category Dropdown */}
                                            {software && (
                                                <div className="d-flex flex-row mb-4">
                                                    <i className="fas fa-th-large fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <select
                                                            id="post_category"
                                                            className="form-control"
                                                            value={category}
                                                            onChange={(e) => setCategory(e.target.value)}
                                                            required
                                                        >
                                                            <option value="">Select Category</option>
                                                            {validCategories.map((cat) => (
                                                                <option key={cat} value={cat}>
                                                                    {cat}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Material Dropdown */}
                                            {category === 'Kiến trúc' && (
                                                <div className="d-flex flex-row mb-4">
                                                    <i className="fas fa-cubes fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <select
                                                            id="post_material"
                                                            className="form-control"
                                                            value={material}
                                                            onChange={(e) => setMaterial(e.target.value)}
                                                            required
                                                        >
                                                            <option value="">Select Material</option>
                                                            {validMaterials.map((mat) => (
                                                                <option key={mat} value={mat}>
                                                                    {mat}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {/* Submit Button */}
                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                        <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                                            {loading ? 'Creating...' : 'Create Post'}
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
}

export default CreatePost;
