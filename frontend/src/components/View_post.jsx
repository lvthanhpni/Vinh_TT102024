import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function ViewPost() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    const navigate = useNavigate(); // Initialize the navigation hook

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/posts/');
                console.log('Fetched Posts:', response.data);
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

    const handlePostClick = (postId) => {
        navigate(`/EOB/Library/${postId}`); // Redirect to the post detail page
    };

    const handleLikeToggle = async (postId, currentLikeStatus) => {
        try {
            const accessToken = localStorage.getItem('access_token');
            const response = await axios.post(
                `/api/posts/${postId}/like/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const updatedPosts = posts.map((post) =>
                post.id === postId
                    ? {
                        ...post,
                        like_count: currentLikeStatus ? post.like_count - 1 : post.like_count + 1,
                        is_liked: !currentLikeStatus,
                    }
                    : post
            );
            setPosts(updatedPosts);
        } catch (err) {
            console.error('Error liking/unliking post:', err);
            setError('Failed to update like status.');
        }
    };

    if (loading) {
        return <div>Loading Posts...</div>;
    }

    if (error) {
        return <div>{error}</div>;
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
                                <div
                                    key={post.id}
                                    className="col-lg-4 col-md-6 mb-4"
                                    onClick={() => handlePostClick(post.id)} // Attach the click handler here
                                    style={{ cursor: 'pointer' }} // Add pointer cursor for better UX
                                >
                                    <div
                                        className="card d-flex flex-column"
                                        style={{ borderRadius: '15px', minHeight: '400px', maxHeight: '400px' }}
                                    >
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title text-center">{post.title}</h5>
                                            <p className="card-text">{post.caption}</p>

                                            {post.picture && (
                                                <img
                                                    src={post.picture}
                                                    alt={post.title}
                                                    className="img-fluid mb-3"
                                                    style={{
                                                        maxHeight: '275px'
                                                    }}
                                                />
                                            )}

                                            {/* Spacer to push content above */}
                                            <div className="flex-grow-1"></div>

                                            <p className="text-muted text-center mt-auto">
                                                {post.like_count}{' '}
                                                <i
                                                    className={`bi bi-heart${post.is_liked ? '-fill' : ''} text-danger`}
                                                    onClick={() => handleLikeToggle(post.id, post.is_liked)}
                                                    style={{ cursor: 'pointer' }}
                                                ></i>
                                            </p>
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
