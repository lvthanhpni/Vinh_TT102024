import React, { useState } from "react";

const Profile = () => {
    const [image, setImage] = useState("/static/Resources/Profile.jpg");

    const previewImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    return (
        <section style={{ backgroundColor: "#eee" }}>
            <div className="container" style={{ paddingBottom: 50, paddingTop: 30 }}>
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ borderRadius: 25 }}>
                            <div className="card-body">
                                <div className="d-flex justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 d-flex flex-column align-items-center">
                                        <img src="/static/Resources/Logo.png" className="img-fluid" alt="Logo" style={{ width: "25%" }} />
                                    </div>
                                </div>
                                <p className="text-center h4 fw-bold mb-5 mx-1 mx-md-4 mt-4">THÔNG TIN THÀNH VIÊN EOB CỦA TÔI</p>
                                <div className="row justify-content-between px-2">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-1 order-lg-2">
                                        <p><b style={{ paddingRight: 20 }}>Thành viên Star</b> Yêu cầu thăng hạng đang chờ duyệt</p>
                                        <div className="form-outline flex-fill mb-0">
                                            <label className="form-label" htmlFor="form3Example3c">Name</label>
                                            <input type="text" id="form3Example3c" className="form-control" name="uname" defaultValue="{user.username}" />
                                        </div>
                                        <div className="form-outline flex-fill mb-0">
                                            <label className="form-label" htmlFor="club">Đang là thành viên hội</label>
                                            <input type="text" id="club" className="form-control" name="club" />
                                        </div>
                                        <div className="form-outline flex-fill mb-0">
                                            <label className="form-label" htmlFor="phone">Điện thoại*</label>
                                            <input type="text" id="phone" className="form-control" name="phone" />
                                        </div>
                                        <div className="form-outline flex-fill mb-0">
                                            <label className="form-label" htmlFor="field">Lĩnh vực</label>
                                            <input type="text" id="field" className="form-control" name="field" />
                                        </div>
                                        <div className="form-outline flex-fill mb-0">
                                            <label className="form-label" htmlFor="email">Email</label>
                                            <input type="email" id="email" className="form-control" name="email" defaultValue="{user.email}" required />
                                        </div>
                                    </div>
                                    <div className="col-md-10 col-lg-5 col-xl-6 order-1 order-lg-2 mt-4">
                                        <div className="row pt-4">
                                            <label><b>Hình đại diện (W 350 x H 150 pixel)</b></label>
                                        </div>
                                        <div className="row pt-4 justify-content-center" style={{ width: "fit-content", position: "relative" }}>
                                            <img
                                                src={image}
                                                className="img-fluid rounded-circle"
                                                alt="PFP"
                                                id="profilePic"
                                                style={{ width: 120, height: 120, backgroundColor: "#EE1D47" }}
                                            />
                                            <img
                                                src="/static/Resources/Camera.png"
                                                alt="camera"
                                                className="position-absolute"
                                                style={{ width: 60, bottom: 10, right: 30, cursor: "pointer" }}
                                                onClick={() => document.getElementById("fileInput").click()}
                                            />
                                            <input
                                                type="file"
                                                id="fileInput"
                                                style={{ display: "none" }}
                                                accept="image/*"
                                                onChange={previewImage}
                                            />
                                        </div>
                                        <div className="row pt-4">
                                            <ul>
                                                <li>Điền đầy đủ thông tin để tham gia các hoạt động của EOB dành cho thành viên</li>
                                            </ul>
                                            <p>Tổng điểm: 0 (tải các family / tài liệu tính phí)</p>
                                            <p><b>Đổi mật khẩu</b></p>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center order-3 mt-5">
                                        <button type="submit" className="btn btn-primary">Cập nhật</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;