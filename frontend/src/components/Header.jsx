import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();  // Use the useNavigate hook instead of useHistory

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await fetch('/api/check-login', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setIsLoggedIn(true);
                    setUsername(data.username); // Set username from the backend response
                }
            } catch (error) {
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();
    }, []);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('authToken'); // Assuming you store the token in localStorage

            const response = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,  // Send the token in the Authorization header
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                setIsLoggedIn(false);
                setUsername('');
                localStorage.removeItem('authToken');  // Remove token from local storage
                navigate('/EOB/Login');  // Redirect to login page after logout
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };



    return (
        <nav className="sticky-nav" style={{ border: '1px solid black' }}>
            <div className="row text-white align-items-center" style={{ fontSize: '13px', paddingLeft: '30px', paddingRight: '30px', backgroundColor: '#1c2d5a' }}>
                <div className="res_remove col-6 d-flex align-items-center" style={{ textAlign: 'left' }}>
                    <div className="res_remove col-sm-3 p-1">
                        <Link to="/EOB" style={{ color: 'white' }}>Công trình tiêu biểu</Link>
                    </div>
                    <div className="res_remove col-sm-1 p-1">
                        <Link to="/EOB" style={{ color: 'white' }}>Tin Tức</Link>
                    </div>
                </div>

                <div className="black_nav col-6 d-flex justify-content-end align-items-center" style={{ textAlign: 'right' }}>
                    {!isLoggedIn ? (
                        <>
                            <div className="col-sm-3 p-1">
                                <Link to="/EOB/Member" style={{ color: 'white' }}>Đăng Ký Thành Viên</Link>
                            </div>

                            <div className="col-sm-2 p-1">
                                <Link to="/EOB/VLXD" style={{ color: 'white' }}>VLXD Đăng Ký</Link>
                            </div>

                            <div className="col-sm-2 p-1">
                                <Link to="/EOB/Login" style={{ color: 'white' }}>Đăng Nhập</Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="col-sm-3 p-1">
                                <Link to="/EOB/Member" style={{ color: 'white' }}>{username}</Link>
                            </div>

                            <div className="col-sm-3 p-1">
                                <button
                                    onClick={handleLogout}
                                    style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    )}

                    <div className="col-sm-2 p-1 dropdown">
                        <button type="button" className="btn dropdown-toggle text-white w-100" style={{ backgroundColor: '#1c2d5a' }}>
                            <img src="/static/Resources/Vie.png" alt="Viet flag" /> Vi
                        </button>
                    </div>
                </div>
            </div>

            <div className="row bg-white text-dark align-items-center" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="white_nav col-sm-1 p-3" style={{ marginLeft: '20px' }}>
                    <Link to="/EOB/">
                        <img src="/static/Resources/Logo.png" alt="EOB logo" width="120" height="60" />
                    </Link>
                </div>

                <div className="lib_model res_remove col-sm-2 p-4 dropdown" style={{ textAlign: 'right' }}>
                    <button className="dropdown-toggle text-dark" style={{ textDecoration: 'none', background: 'none', border: 'none' }} id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        <b>THƯ VIỆN MODEL</b>
                    </button>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="/EOB/Library">Tất cả thư viện</Link></li>
                        <li><Link className="dropdown-item" to="/EOB/Folder">Thư viện EOB</Link></li>
                        <li><Link className="dropdown-item" to="#">Thư viện VLXD</Link></li>
                    </ul>
                </div>

                <form className="white_nav col-sm-3 p-4" style={{ marginLeft: 'auto' }}>
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Tìm kiếm" style={{ borderRadius: '25px 0 0 25px', border: '2px solid lightgray' }} />
                        <span className="input-group-text" style={{ borderRadius: '0 25px 25px 0', border: '2px solid lightgray' }}>
                            <i className="bi bi-search"></i>
                        </span>
                    </div>
                </form>
            </div>
        </nav>
    );
};

export default Header;
