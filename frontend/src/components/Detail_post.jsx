import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PostDetail() {
    const { id } = useParams(); // Get the post ID from the URL
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/api/posts/${id}`); // Fetch the post by ID
                setPost(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching post:', err);
                setError('Failed to load post.');
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return <div>Loading post...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h1 className="card-title">{post.title}</h1>
                    <p className="card-text">{post.caption}</p>
                    {post.picture && (
                        <img
                            src={post.picture}
                            alt={post.title}
                            className="img-fluid"
                            style={{ maxHeight: '500px', objectFit: 'cover' }}
                        />
                    )}
                    <p>{post.like_count} likes</p>
                </div>
            </div>
        </div>
    );
}

export default PostDetail;
