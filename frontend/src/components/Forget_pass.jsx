import React from 'react';

function ForgetPass() {
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
                                        <p className="text-center h4 fw-bold mb-5 mx-1 mx-md-4 mt-4">Lấy lại mật khẩu</p>
                                    </div>
                                </div>
                                <form className="mx-1 mx-md-4" method="POST" action="">
                                    {/* CSRF Token can be handled by adding it to headers in the request if using Axios or Fetch */}

                                    <div className="fw-bold d-flex flex-row justify-content-center mb-4">
                                        {/* Display error messages here, if using state to hold messages */}
                                        {/* You might need to use a state variable for messages */}
                                        {/* Example:
                    {messages && messages.map((message, index) => (
                      <div key={index} className="alert alert-danger" role="alert">
                        {message}
                      </div>
                    ))} */}
                                    </div>

                                    <div className="d-flex flex-row mb-4">
                                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                        <div className="form-outline flex-fill mb-0">
                                            <input
                                                type="text"
                                                id="email"
                                                placeholder="Email"
                                                className="form-control"
                                                name="email"
                                            />
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                        <button type="submit" className="btn btn-primary btn-lg">GỬI</button>
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

export default ForgetPass;
