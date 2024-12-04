import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewPost() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/posts/'); // Fetch all posts
                setPosts(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching posts:', err);
                setError('Failed to load posts.');
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Calculate the posts for the current page
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = posts.slice(startIndex, endIndex);

    const handleNextPage = () => {
        if (endIndex < posts.length) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    if (loading) {
        return (
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-7 col-xl-6">
                        <div className="card text-black" style={{ borderRadius: '25px' }}>
                            <div className="card-body p-md-5">
                                <h2 className="text-center h4 fw-bold mb-4">Loading Posts...</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-7 col-xl-6">
                        <div className="card text-black" style={{ borderRadius: '25px' }}>
                            <div className="card-body p-md-5">
                                <h2 className="text-center h4 fw-bold mb-4">{error}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingBottom: '50px', paddingTop: '0', paddingLeft: '0' }}>
            <div className="col-lg-12">
                <div className="card-body p-md-5">
                    {currentPosts.length > 0 ? (
                        <div className="row">
                            {currentPosts.map((post) => (
                                <div key={post.id} className="col-lg-4 col-md-6 mb-4">
                                    <div className="card" style={{ borderRadius: '15px', minHeight: '300px' }}>
                                        <div className="card-body">
                                            <h5 className="card-title">{post.title}</h5>
                                            <p className="card-text">{post.caption}</p>

                                            {post.picture && (
                                                <img
                                                    src={post.picture}
                                                    alt={post.title}
                                                    className="img-fluid mb-3"
                                                    style={{ borderRadius: '15px' }}
                                                />
                                            )}

                                            <p className="text-muted">Posted by: {post.name}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center">No posts available</p>
                    )}
                    {/* Pagination Controls */}
                    <div className="d-flex justify-content-center mt-4">
                        <button
                            className="btn btn-light me-2"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            &lt;
                        </button>
                        <button className="btn btn-secondary" disabled>
                            {currentPage}
                        </button>
                        <button
                            className="btn btn-light ms-2"
                            onClick={handleNextPage}
                            disabled={endIndex >= posts.length}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewPost;
