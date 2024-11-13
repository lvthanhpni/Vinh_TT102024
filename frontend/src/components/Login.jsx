import React, { useState } from 'react';

function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
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

                                <form className="mx-1 mx-md-4" method="POST" action="">
                                    <div className="fw-bold d-flex flex-row justify-content-center mb-4">
                                        {/* Error messages can be rendered here, using state or props */}
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
                                                src="/static/Resources/GG.png"
                                                width="5%"
                                                height="5%"
                                                alt="Google logo"
                                                style={{ marginRight: '20px' }}
                                            />
                                            <a href="/accounts/google/login/?next=/" name="google" style={{ color: 'black' }}>
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
                                            <a href="/accounts/facebook/login/?next=/" name="facebook" style={{ color: 'black' }}>
                                                Đăng nhập bằng Facebook
                                            </a>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-row mb-4">
                                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                        <div className="form-outline flex-fill mb-0">
                                            <input type="text" id="login_uname" placeholder="Tên đăng nhập" className="form-control" name="uname" />
                                        </div>
                                    </div>

                                    <div className="d-flex flex-row mb-4">
                                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                        <div className="form-outline flex-fill mb-0 position-relative">
                                            <input
                                                type={passwordVisible ? 'text' : 'password'}
                                                id="login_pass"
                                                placeholder="Mật khẩu"
                                                className="form-control"
                                                name="pass"
                                            />
                                            <i
                                                className={`bi ${passwordVisible ? 'bi-eye' : 'bi-eye-slash'}`}
                                                onClick={togglePasswordVisibility}
                                                style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
                                            ></i>
                                        </div>
                                    </div>

                                    <div className="form-check d-flex justify-content-between mb-5">
                                        <div className="d-flex align-items-center">
                                            <input
                                                className="form-check-input"
                                                style={{ borderWidth: '2px', borderColor: 'black', marginRight: '5px' }}
                                                type="checkbox"
                                                value="True"
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

                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                        <button type="submit" className="btn btn-primary btn-lg">Đăng nhập</button>
                                    </div>

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
