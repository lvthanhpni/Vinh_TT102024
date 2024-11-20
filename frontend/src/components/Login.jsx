import React, { useState } from 'react';
import axios from 'axios';
import { useCheckLogin } from '../ultility/Ulties';

function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const { checkLoginStatus } = useCheckLogin(); // assuming useCheckLogin returns checkLoginStatus

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make both the login and check-login requests
            const [loginResponse, checkLoginResponse] = await Promise.all([
                axios.post('/api/login', {
                    uname: username,
                    pass: password,
                    checkbox: rememberMe,
                }),
                axios.get('/api/check-login'),  // Assuming the check-login request is a GET request
            ]);

            // Handle login response
            if (loginResponse.data.success) {
                // Store tokens in localStorage
                const accessToken = loginResponse.data.access;
                const refreshToken = loginResponse.data.refresh;

                localStorage.setItem('access_token', accessToken);
                localStorage.setItem('refresh_token', refreshToken);

                console.log('Login successful!');
                console.log('Access Token:', accessToken);
            } else {
                // Handle unsuccessful login
                setError('Login failed. User does not exist or is unauthorized.');
                return;
            }

            // Handle check-login response
            if (checkLoginResponse.data.loggedIn) {
                console.log('User is already logged in.');
            } else {
                console.log('User is not logged in.');
            }

        } catch (error) {
            // Handle errors
            console.error('Error:', error.response?.data || error.message);
            setError('An error occurred while logging in.');
        }
    };
    return (
        <section style={{ backgroundColor: '#eee' }}>
            <div className="container h-100" style={{ paddingBottom: '50px' }}>
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-7 col-xl-6">
                        <div className="card text-black" style={{ borderRadius: '25px' }}>
                            <div className="card-body p-md-5">
                                <div className="d-flex justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 d-flex flex-column align-items-center">
                                        <img
                                            src="/static/Resources/Logo.png"
                                            className="img-fluid"
                                            alt="Logo"
                                            style={{ width: '50%' }}
                                        />
                                        <p className="text-center h4 fw-bold mb-5 mx-1 mx-md-4 mt-4">ĐĂNG NHẬP</p>
                                    </div>
                                </div>

                                {error && <div className="alert alert-danger">{error}</div>}

                                <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
                                    {/* Social Login buttons */}
                                    <div className="d-flex flex-row mb-4">
                                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                        <div
                                            className="form-outline flex-fill mb-0"
                                            style={{
                                                textAlign: 'center',
                                                border: '1px solid #ced4da',
                                                padding: '10px',
                                                borderRadius: '.25rem',
                                                color: '#6c757d',
                                            }}
                                        >
                                            <img
                                                className="img-fluid"
                                                src="/static/Resources/GG.png"
                                                width="5%"
                                                height="5%"
                                                alt="Google logo"
                                                style={{ marginRight: '20px' }}
                                            />
                                            <a href="/accounts/google/login/?next=/" style={{ color: 'black' }}>
                                                Đăng nhập bằng Google
                                            </a>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-row mb-4">
                                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                        <div
                                            className="form-outline flex-fill mb-0"
                                            style={{
                                                textAlign: 'center',
                                                border: '1px solid #ced4da',
                                                padding: '10px',
                                                borderRadius: '.25rem',
                                                color: '#6c757d',
                                            }}
                                        >
                                            <img
                                                className="img-fluid"
                                                src="/static/Resources/FB.png"
                                                width="5%"
                                                height="5%"
                                                alt="Facebook logo"
                                                style={{ marginRight: '20px' }}
                                            />
                                            <a href="/accounts/facebook/login/?next=/" style={{ color: 'black' }}>
                                                Đăng nhập bằng Facebook
                                            </a>
                                        </div>
                                    </div>

                                    {/* Username Input */}
                                    <div className="d-flex flex-row mb-4">
                                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                        <div className="form-outline flex-fill mb-0">
                                            <input
                                                type="text"
                                                id="login_uname"
                                                placeholder="Tên đăng nhập"
                                                className="form-control"
                                                name="uname"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    {/* Password Input */}
                                    <div className="d-flex flex-row mb-4">
                                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                        <div className="form-outline flex-fill mb-0 position-relative">
                                            <input
                                                type={passwordVisible ? 'text' : 'password'}
                                                id="login_pass"
                                                placeholder="Mật khẩu"
                                                className="form-control"
                                                name="pass"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <i
                                                className={`bi ${passwordVisible ? 'bi-eye' : 'bi-eye-slash'}`}
                                                onClick={togglePasswordVisibility}
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    right: '10px',
                                                    transform: 'translateY(-50%)',
                                                    cursor: 'pointer',
                                                }}
                                            ></i>
                                        </div>
                                    </div>

                                    {/* Remember Me Checkbox */}
                                    <div className="form-check d-flex justify-content-between mb-5">
                                        <div className="d-flex align-items-center">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                                id="form2Example3c"
                                                name="checkbox"
                                            />
                                            <label className="form-check-label" htmlFor="form2Example3c">
                                                Nhớ mật khẩu
                                            </label>
                                        </div>

                                        <label className="form-check-label" htmlFor="form2Example3c">
                                            <a href="/password-reset" style={{ color: 'black' }}>
                                                Quên mật khẩu
                                            </a>
                                        </label>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                        <button type="submit" className="btn btn-primary btn-lg">
                                            Đăng nhập
                                        </button>
                                    </div>

                                    {/* Register Link */}
                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                        <a href="/EOB/VLXD" style={{ color: '#6c757d' }}>Đăng ký</a>
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

export default Login;
