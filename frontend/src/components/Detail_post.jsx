import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isLiked, setIsLiked] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/api/posts/${id}`);
                const postData = response.data;
                setPost(postData);

                const accessToken = localStorage.getItem('access_token');
                if (accessToken) {
                    setIsAuthenticated(true);
                    const likeResponse = await axios.get(`/api/posts/${postData.id}/check-like/`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    setIsLiked(likeResponse.data.is_liked);
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching post:', err);
                setError('Failed to load post.');
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleLikeToggle = async () => {
        if (!isAuthenticated) return;

        try {
            const accessToken = localStorage.getItem('access_token');
            const response = await axios.post(
                `/api/posts/${id}/like/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            setIsLiked(response.data.is_liked);
            setPost((prevPost) => ({
                ...prevPost,
                like_count: response.data.is_liked
                    ? prevPost.like_count + 1
                    : prevPost.like_count - 1,
            }));
        } catch (err) {
            console.error('Error toggling like status:', err);
            setError('Failed to update like status.');
        }
    };

    if (loading) {
        return <div>Loading post...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container" style={{ padding: '20px' }}>
            <div className="card" style={{ borderRadius: '15px' }}>
                <div className="card-body">
                    <h1 className="card-title text-center"><b>{post.title}</b></h1>
                    <p className="card-text text-center">{post.caption}</p>
                    {post.picture && (
                        <img
                            src={post.picture}
                            alt={post.title}
                            className="img-fluid mb-3"
                            style={{ maxHeight: '400px', objectFit: 'cover', display: 'block', margin: '0 auto' }}
                        />
                    )}
                    <div className="text-center mt-3">
                        <p className="text-muted">
                            {post.like_count}{' '}
                            <i
                                className={`bi bi-heart${isLiked ? '-fill' : ''} text-danger`}
                                onClick={handleLikeToggle}
                                style={{ cursor: isAuthenticated ? 'pointer' : 'default', fontSize: '24px' }}
                            ></i>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostDetail;
