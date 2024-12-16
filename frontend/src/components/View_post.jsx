import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ViewPost() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    const navigate = useNavigate();


    const updatePosts = (postId, isLiked, Refresh) => {
        const updatedPosts = posts.map((post) =>
            post.id === postId
                ? {
                    ...post,
                    like_count: isLiked
                        ? post.like_count + 1
                        : post.like_count - 1,
                    is_liked: isLiked,
                }
                : post
        );

        if (!Refresh)
            setPosts(updatedPosts);
    };

    const handleLikeToggle = async (postId, Refresh) => {
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

            // Use the updatePosts function here
            updatePosts(postId, response.data.is_liked, Refresh);
        } catch (err) {
            console.error('Error toggling like status:', err);
            setError('Failed to update like status.');
        }
    };


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/posts/');
                const fetchedPosts = response.data;

                // Fetch the is_liked state for each post
                const updatedPosts = await Promise.all(
                    fetchedPosts.map(async (post) => {
                        try {
                            const accessToken = localStorage.getItem('access_token');
                            const likeResponse = await axios.get(`/api/posts/${post.id}/check-like/`, {
                                headers: {
                                    Authorization: `Bearer ${accessToken}`,
                                },
                            });

                            // Calculate the full folder path
                            const fullPath = calculateFolderPath(post.folder);

                            return { ...post, is_liked: likeResponse.data.is_liked, folder_path: fullPath };
                        } catch (err) {
                            console.error(`Error checking like status for post ${post.id}:`, err);
                            return post; // Return post without modifying is_liked if API call fails
                        }
                    })
                );

                setPosts(updatedPosts);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching posts:', err);
                setError('Failed to load posts.');
                setLoading(false);
            }
        };

        const calculateFolderPath = (folder) => {
            let path = '';
            let current = folder;

            while (current) {
                path = `${current.name}/${path}`;
                current = current.parent;
            }

            return path.replace(/\/$/, ''); // Remove trailing slash
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
        navigate(`/EOB/Library/${postId}`);
    };

    if (loading) {
        return <div>Loading Posts...</div>;
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
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div
                                        className="card d-flex flex-column"
                                        style={{ borderRadius: '15px', minHeight: '400px', maxHeight: '400px' }}
                                    >
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title text-center" onClick={() => handlePostClick(post.id)}><b>{post.title}</b></h5>
                                            <p className="card-text" onClick={() => handlePostClick(post.id)}>{post.caption}</p>

                                            {post.picture && (
                                                <img
                                                    onClick={() => handlePostClick(post.id)}
                                                    src={post.picture}
                                                    alt={post.title}
                                                    className="img-fluid mb-3"
                                                    style={{
                                                        maxHeight: '275px'
                                                    }}
                                                />
                                            )}

                                            <div className="flex-grow-1"></div>

                                            <p className="text-muted text-center">
                                                Folder Path: {post.folder_path}
                                            </p>

                                            <p className="text-muted text-center mt-auto">
                                                {post.like_count}{' '}
                                                <i
                                                    className={`bi bi-heart${post.is_liked ? '-fill' : ''} text-danger`}
                                                    onClick={() => handleLikeToggle(post.id, false)}
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
