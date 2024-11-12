import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className="sticky-nav" style={{ border: '1px solid black' }}>
            <div className="row bg-dark text-white align-items-center" style={{ fontSize: '13px', paddingLeft: '30px', paddingRight: '30px' }}>
                <div className="res_remove col-6 d-flex align-items-center" style={{ textAlign: 'left' }}>
                    <div className="res_remove col-sm-3 p-1">
                        <Link to="/EOB" style={{ color: 'white' }}>Công trình tiêu biểu</Link>
                    </div>
                    <div className="res_remove col-sm-1 p-1">
                        <Link to="/EOB" style={{ color: 'white' }}>Tin Tức</Link>
                    </div>
                </div>
                <div className="black_nav col-6 d-flex justify-content-end align-items-center" style={{ textAlign: 'right' }}>
                    <>
                        <div className="col-sm-3 p-1">
                            <Link to="/EOB/Member" style={{ color: 'white' }}>Thông tin tài khoản</Link>
                        </div>
                        <div className="col-sm-2 p-1">
                            <Link to="/EOB/Logout" style={{ color: 'white' }}>Đăng xuất</Link>
                        </div>
                        <div className="col-sm-2 p-1 dropdown">
                            <button type="button" className="btn dropdown-toggle bg-dark text-white w-100">
                                <img src="/static/Resources/PNP.png" alt="Phương Nam Panel" width="110" height="40" />
                            </button>
                        </div>
                    </>

                </div>
            </div>

            <div className="row bg-white text-dark align-items-center" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="white_nav col-sm-1 p-3" style={{ marginLeft: '20px' }}>
                    <Link to="/EOB/">
                        ABC
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