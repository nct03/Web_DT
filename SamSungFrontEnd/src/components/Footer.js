import React from "react";

export default function Footer() {
    return (
        <div
            style={{
                marginTop: "50px",
                backgroundColor: "#333", // Nền đen
                fontFamily: "'Open Sans', serif",
                fontSize: "14px",
                color: "#fff", // Chữ trắng
            }}
        >
            <footer
                style={{
                    borderTop: "1px solid #444",
                    backgroundColor: "#222", // Nền footer màu đen nhạt
                    padding: "20px 0",
                }}
            >
                <div className="container-fluid">
                    <section
                        style={{
                            padding: "40px 0",
                        }}
                    >
                        <div className="row">
                            {/* Logo và Mô tả */}
                            <aside className="col-md-4">
                                <article style={{ marginRight: "20px" }}>
                                    <img
                                        src="https://i.imgur.com/S5Zdt8L.png"
                                        style={{ height: "30px" }}
                                        alt="Logo Công Ty"
                                    />
                                    <p
                                        style={{
                                            marginTop: "20px",
                                            fontSize: "12px",
                                            color: "#bbb", // Màu chữ sáng hơn cho dễ đọc
                                        }}
                                    >
                                        Chúng tôi cung cấp các linh kiện chất lượng cao cho máy tính và thiết bị điện tử. Đảm bảo sản phẩm tốt nhất với giá cả hợp lý.
                                    </p>
                                    <div>
                                        <a
                                            href="#"
                                            style={{
                                                marginRight: "10px",
                                                display: "inline-block",
                                                textAlign: "center",
                                                width: "36px",
                                                height: "36px",
                                                lineHeight: "36px",
                                                borderRadius: "50%",
                                                backgroundColor: "#444", // Nền nút màu tối hơn
                                                color: "#fff", // Chữ màu trắng
                                                textDecoration: "none", // Bỏ gạch chân
                                            }}
                                        >
                                            <i className="fab fa-facebook-f" style={{ color: "#3b5999" }}></i> {/* Chữ Facebook màu sáng hơn */}
                                        </a>
                                        <a
                                            href="#"
                                            style={{
                                                marginRight: "10px",
                                                display: "inline-block",
                                                textAlign: "center",
                                                width: "36px",
                                                height: "36px",
                                                lineHeight: "36px",
                                                borderRadius: "50%",
                                                backgroundColor: "#444",
                                                color: "#e4405f",
                                                textDecoration: "none", // Bỏ gạch chân
                                            }}
                                        >
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                        <a
                                            href="#"
                                            style={{
                                                marginRight: "10px",
                                                display: "inline-block",
                                                textAlign: "center",
                                                width: "36px",
                                                height: "36px",
                                                lineHeight: "36px",
                                                borderRadius: "50%",
                                                backgroundColor: "#444",
                                                color: "#cd201f",
                                                textDecoration: "none", // Bỏ gạch chân
                                            }}
                                        >
                                            <i className="fab fa-youtube"></i>
                                        </a>
                                        <a
                                            href="#"
                                            style={{
                                                display: "inline-block",
                                                textAlign: "center",
                                                width: "36px",
                                                height: "36px",
                                                lineHeight: "36px",
                                                borderRadius: "50%",
                                                backgroundColor: "#444",
                                                color: "#55acee",
                                                textDecoration: "none", // Bỏ gạch chân
                                            }}
                                        >
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                    </div>
                                </article>
                            </aside>

                            {/* About Section */}
                            <aside className="col-sm-3 col-md-2">
                                <h6
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                        marginBottom: "20px",
                                        color: "#fff", // Chữ tiêu đề trắng
                                    }}
                                >
                                    Về chúng tôi
                                </h6>
                                <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                                    <li style={{ marginBottom: "10px" }}>
                                        <a href="#" style={{ color: "#bbb", textDecoration: "none" }}> {/* Bỏ gạch chân */}
                                            Giới thiệu
                                        </a>
                                    </li>
                                    <li style={{ marginBottom: "10px" }}>
                                        <a href="#" style={{ color: "#bbb", textDecoration: "none" }}> {/* Bỏ gạch chân */}
                                            Dịch vụ
                                        </a>
                                    </li>
                                    <li style={{ marginBottom: "10px" }}>
                                        <a href="#" style={{ color: "#bbb", textDecoration: "none" }}> {/* Bỏ gạch chân */}
                                            Điều khoản
                                        </a>
                                    </li>
                                    <li style={{ marginBottom: "10px" }}>
                                        <a href="#" style={{ color: "#bbb", textDecoration: "none" }}> {/* Bỏ gạch chân */}
                                            Blog
                                        </a>
                                    </li>
                                </ul>
                            </aside>

                            {/* Services Section */}
                            <aside className="col-sm-3 col-md-2">
                                <h6
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                        marginBottom: "20px",
                                        color: "#fff", // Chữ tiêu đề trắng
                                    }}
                                >
                                    Dịch vụ
                                </h6>
                                <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                                    <li style={{ marginBottom: "10px" }}>
                                        <a href="#" style={{ color: "#bbb", textDecoration: "none" }}> {/* Bỏ gạch chân */}
                                            Trung tâm trợ giúp
                                        </a>
                                    </li>
                                    <li style={{ marginBottom: "10px" }}>
                                        <a href="#" style={{ color: "#bbb", textDecoration: "none" }}> {/* Bỏ gạch chân */}
                                            Hoàn tiền
                                        </a>
                                    </li>
                                    <li style={{ marginBottom: "10px" }}>
                                        <a href="#" style={{ color: "#bbb", textDecoration: "none" }}> {/* Bỏ gạch chân */}
                                            Điều khoản và Chính sách
                                        </a>
                                    </li>
                                    <li style={{ marginBottom: "10px" }}>
                                        <a href="#" style={{ color: "#bbb", textDecoration: "none" }}> {/* Bỏ gạch chân */}
                                            Giải quyết tranh chấp
                                        </a>
                                    </li>
                                </ul>
                            </aside>

                            {/* For Users Section */}
                            <aside className="col-sm-3 col-md-2">
                                <h6
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                        marginBottom: "20px",
                                        color: "#fff", // Chữ tiêu đề trắng
                                    }}
                                >
                                    Dành cho khách hàng
                                </h6>
                                <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                                    <li style={{ marginBottom: "10px" }}>
                                        <a href="#" style={{ color: "#bbb", textDecoration: "none" }}> {/* Bỏ gạch chân */}
                                            Đăng nhập
                                        </a>
                                    </li>
                                    <li style={{ marginBottom: "10px" }}>
                                        <a href="#" style={{ color: "#bbb", textDecoration: "none" }}> {/* Bỏ gạch chân */}
                                            Đăng ký
                                        </a>
                                    </li>
                                    <li style={{ marginBottom: "10px" }}>
                                        <a href="#" style={{ color: "#bbb", textDecoration: "none" }}> {/* Bỏ gạch chân */}
                                            Cài đặt tài khoản
                                        </a>
                                    </li>
                                    <li style={{ marginBottom: "10px" }}>
                                        <a href="#" style={{ color: "#bbb", textDecoration: "none" }}> {/* Bỏ gạch chân */}
                                            Đơn hàng của tôi
                                        </a>
                                    </li>
                                </ul>
                            </aside>

                            {/* Our App Section */}
                            <aside className="col-sm-2 col-md-2">
                                <h6
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                        marginBottom: "20px",
                                        color: "#fff", // Chữ tiêu đề trắng
                                    }}
                                >
                                    Ứng dụng của chúng tôi
                                </h6>
                                <a
                                    href="#"
                                    style={{
                                        display: "block",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <img
                                        className="img-responsive"
                                        src="https://i.imgur.com/nkZP7fe.png"
                                        alt="App Store"
                                        style={{ height: "40px" }}
                                    />
                                </a>
                                <a
                                    href="#"
                                    style={{
                                        display: "block",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <img
                                        className="img-responsive"
                                        src="https://i.imgur.com/47q2YGt.png"
                                        alt="Google Play"
                                        style={{ height: "40px", width: "123px" }}
                                    />
                                </a>
                            </aside>
                        </div>
                    </section>

                    {/* Footer copyright */}
                    <section
                        style={{
                            borderTop: "1px solid #444",
                            paddingTop: "10px",
                            paddingBottom: "10px",
                            marginTop: "20px",
                            color: "#bbb",
                        }}
                    >
                        <p style={{ float: "left" }}> &copy; 2024 Công Ty Linh Kiện. Bảo lưu mọi quyền. </p>
                        <p style={{ float: "right" }}>
                            <a href="#" style={{ color: "#bbb", marginRight: "10px", textDecoration: "none" }}>
                                Quyền riêng tư & Cookie
                            </a>
                            <a href="#" style={{ color: "#bbb", textDecoration: "none" }}>
                                Truy cập
                            </a>
                        </p>
                    </section>
                </div>
            </footer>
        </div>
    );
}
