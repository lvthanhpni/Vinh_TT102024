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

    const handlePostCreate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('caption', caption);
        formData.append('picture', picture);

        // Add folder path based on the location selection
        if (location === 'Việt Nam') {
            if (!software || !category || !material) {
                setError('Please select Software, Category, and Material for Việt Nam location.');
                setLoading(false);
                return;
            }
            formData.append('folder', `Việt Nam/${software}/${category}/${material}`);
        } else if (location === 'BIM-VietNam') {
            formData.append('folder', 'BIM-VietNam/Vật liệu xây dựng/ISO-19650/ISO-19650-AP01');
        } else {
            setError('Please select a valid location.');
            setLoading(false);
            return;
        }

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
            setError('Failed to create post.');
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
                                                <option value="Việt Nam">Việt Nam</option>
                                                <option value="BIM-VietNam">BIM-VietNam</option>
                                            </select>
                                        </div>
                                    </div>

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
                                                        <option value="Revit">Revit</option>
                                                        <option value="Auto CAD">Auto CAD</option>
                                                        <option value="Sketch UP">Sketch UP</option>
                                                        <option value="Tekla">Tekla</option>
                                                        <option value="Archi CAD">Archi CAD</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Category Dropdown */}
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
                                                        <option value="Kiến trúc">Kiến trúc</option>
                                                        <option value="Kết cấu">Kết cấu</option>
                                                        <option value="MEP">MEP</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Material Dropdown */}
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
                                                        <option value="Mặt dựng và trần nhôm Austra Alu">Mặt dựng và trần nhôm Austra Alu</option>
                                                        <option value="Sơn trang trí Dulux">Sơn trang trí Dulux</option>
                                                        <option value="Tấm cách âm cách nhiệt Phương Nam panel">Tấm cách âm cách nhiệt Phương Nam panel</option>
                                                    </select>
                                                </div>
                                            </div>
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
