import React from 'react';

const HomePage = () => {
    return (
        <>
            {/* Carousel */}
            <div id="carousel" className="carousel slide" data-bs-ride="carousel">
                {/* Indicators/dots */}
                <div className="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#carousel"
                        data-bs-slide-to="0"
                        className="active"
                        style={{ backgroundColor: 'black', height: '16px', width: '16px', borderRadius: '50%' }}
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carousel"
                        data-bs-slide-to="1"
                        style={{ backgroundColor: 'black', height: '16px', width: '16px', borderRadius: '50%' }}
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carousel"
                        data-bs-slide-to="2"
                        style={{ backgroundColor: 'black', height: '16px', width: '16px', borderRadius: '50%' }}
                    ></button>
                </div>

                {/* The slideshow/carousel */}
                <div className="row" style={{ height: '700px' }}>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="container mt-3">
                                <img
                                    src="/static/Resources/Model.png"
                                    alt="Model"
                                    className="mx-auto d-block"
                                    style={{ width: '75%' }}
                                />
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="container mt-3 text-center">
                                <img
                                    src="/static/Resources/Star.png"
                                    alt="Star"
                                    className="mx-auto d-block"
                                    style={{ width: '60%', maxWidth: '100%' }}
                                />
                                <button type="button" className="btn btn-primary">
                                    <a href="/EOB/Member" style={{ color: 'white' }}>
                                        Đăng ký
                                    </a>
                                </button>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="container mt-3 text-center">
                                <img
                                    src="/static/Resources/Product.png"
                                    alt="Product"
                                    className="mx-auto d-block"
                                    style={{ width: '60%', maxWidth: '100%' }}
                                />
                                <button type="button" className="btn btn-primary">
                                    <a href="/EOB/VLXD" style={{ color: 'white' }}>
                                        Đăng ký
                                    </a>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Các công ty */}
            <div className="row res_comp" style={{ backgroundColor: '#f0f0f0' }}>
                <div className="homepage-carousel-container">
                    <div id="homepage-carousel" className="owl-carousel owl-theme">
                        <div className="item">
                            <a href="https://australu.com/">
                                <img
                                    src="/static/Resources/Austra.png"
                                    alt="Austraalu"
                                    width="170"
                                    height="70"
                                />
                            </a>
                        </div>
                        <div className="item">
                            <a href="https://www.dulux.vn/">
                                <img
                                    src="/static/Resources/Dulux.png"
                                    alt="Dulux"
                                    width="110"
                                    height="40"
                                />
                            </a>
                        </div>
                        <div className="item">
                            <a href="https://phuongnampanel.com/">
                                <img
                                    src="/static/Resources/PNP.png"
                                    alt="Phương Nam Panel"
                                    width="110"
                                    height="40"
                                />
                            </a>
                        </div>
                        <div className="item">
                            <a href="https://australu.com/">
                                <img
                                    src="/static/Resources/Austra.png"
                                    alt="Austraalu"
                                    width="170"
                                    height="70"
                                />
                            </a>
                        </div>
                        <div className="item">
                            <a href="https://www.dulux.vn/">
                                <img
                                    src="/static/Resources/Dulux.png"
                                    alt="Dulux"
                                    width="110"
                                    height="40"
                                />
                            </a>
                        </div>
                        <div className="item">
                            <a href="https://phuongnampanel.com/">
                                <img
                                    src="/static/Resources/PNP.png"
                                    alt="Phương Nam Panel"
                                    width="110"
                                    height="40"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bốn tấm hình */}
            <div
                className="res_post container-fluid"
                style={{ padding: '75px 100px 0 200px' }}
            >
                <div className="row" style={{ paddingBottom: '50px' }}>
                    {/* Tấm hình đầu tiên */}
                    <div className="col d-flex justify-content-center align-items-stretch">
                        <div
                            className="row w-100"
                            style={{
                                border: '2px solid lightgray',
                                padding: '20px 10px',
                                marginRight: '20px',
                            }}
                        >
                            <div className="col-sm-5 d-flex justify-content-center align-items-center">
                                <img
                                    src="/static/Resources/Family-design.jpg"
                                    alt="Family"
                                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                                />
                            </div>
                            <div className="col-sm-7 d-flex flex-column">
                                <h6 className="text-center">Thư viện Family thiết kế</h6>
                                <p>
                                    Thư viện family thiết kế gồm các family do các KTS và đơn vị
                                    VLXD uy tín chia sẻ. Hãy đăng ký và trở thành thành viên EOB
                                    để tải các family miễn phí cho các bản vẽ công trình.
                                </p>
                                <div className="mt-auto text-end">
                                    <span>
                                        <b>
                                            Xem thêm <i className="bi bi-chevron-right"></i>
                                        </b>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tấm hình thứ 2 */}
                    <div className="col d-flex justify-content-center align-items-stretch">
                        <div
                            className="row w-100"
                            style={{
                                border: '2px solid lightgray',
                                padding: '20px 10px',
                                marginRight: '20px',
                            }}
                        >
                            <div className="col-sm-5 d-flex justify-content-center align-items-center">
                                <img
                                    src="/static/Resources/Activity-topic.jpg"
                                    alt="AT"
                                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                                />
                            </div>
                            <div className="col-sm-7 d-flex flex-column">
                                <h6 className="text-center">Hoạt động chuyên đề</h6>
                                <p>
                                    Các hoạt động chuyên đề phong phú như hội thảo, coffee talk,
                                    luncheon, lunch box với các chủ đề hấp dẫn và diễn giả đầu
                                    ngành. Hãy theo dõi và tham gia các hoạt động giành cho các
                                    thành viên EOB.
                                </p>
                                <div className="mt-auto text-end">
                                    <span>
                                        <b>
                                            Xem thêm <i className="bi bi-chevron-right"></i>
                                        </b>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row" style={{ paddingBottom: '30px' }}>
                    {/* Tấm hình thứ 3 */}
                    <div className="col d-flex justify-content-center align-items-stretch">
                        <div
                            className="row w-100"
                            style={{
                                border: '2px solid lightgray',
                                padding: '20px 10px',
                                marginRight: '20px',
                            }}
                        >
                            <div className="col-sm-5 d-flex justify-content-center align-items-center">
                                <img
                                    src="/static/Resources/Post-topic.jpg"
                                    alt="PT"
                                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                                />
                            </div>
                            <div className="col-sm-7 d-flex flex-column">
                                <h6 className="text-center">Bài viết chuyên đề</h6>
                                <p>
                                    Tập hợp các bài viết kiến trúc xây dựng của các thành viên EOB
                                    pro, các diễn giả đầu ngành và các giải pháp VLXD uy tín. Hãy
                                    theo dõi để không bỏ lỡ các bài viết bổ ích.
                                </p>
                                <div className="mt-auto text-end">
                                    <span>
                                        <b>
                                            Xem thêm <i className="bi bi-chevron-right"></i>
                                        </b>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tấm hình thứ 4 */}
                    <div className="col d-flex justify-content-center align-items-stretch">
                        <div
                            className="row w-100"
                            style={{
                                border: '2px solid lightgray',
                                padding: '20px 10px',
                                marginRight: '20px',
                            }}
                        >
                            <div className="col-sm-5 d-flex justify-content-center align-items-center">
                                <img
                                    src="/static/Resources/Product-topic.jpg"
                                    alt="PT"
                                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                                />
                            </div>
                            <div className="col-sm-7 d-flex flex-column">
                                <h6 className="text-center">Sản phẩm xây dựng</h6>
                                <p>
                                    Cập nhật những sản phẩm vật liệu xây dựng mới nhất và đang
                                    được các nhà thầu ưu tiên sử dụng. Hãy đăng ký ngay để trở
                                    thành thành viên EOB.
                                </p>
                                <div className="mt-auto text-end">
                                    <span>
                                        <b>
                                            Xem thêm <i className="bi bi-chevron-right"></i>
                                        </b>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
