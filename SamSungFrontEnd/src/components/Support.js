import React from 'react';
import Header from "./Header";
import Footer from "./Footer";

const Support = () => {
    return (
        <div>
            <Header />
            <div className="row mx-0" style={{ marginTop: "117px" }}>
                <div className="px-0 image-container" style={{ height: "400px" }}>
                    <img
                        src="https://i.pinimg.com/originals/ea/bd/aa/eabdaadef69a169117a2900e77bfde9f.jpg"
                        width={"100%"}
                        height={"100%"}
                        alt="Support Banner"
                    />
                </div>
            </div>

            <div className="container mb-5">
                <div className="row mx-0 px-5 py-3">
                    <div className="col-12 text-secondary py-5">
                        <div>
                            <h4 style={{ textAlign: "center" }}>Hỗ Trợ Khách Hàng</h4>
                        </div>
                        <hr />

                        <div className="accordion-header mt-2 ms-2" style={{ marginBottom: '1rem' }}>
                            <button
                                className="accordion-button fs-6 fw-bold"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#contactSupport"
                                aria-expanded="true"
                                aria-controls="contactSupport"
                                style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    padding: '0.75rem 1.25rem',
                                }}
                            >
                                Liên Hệ Hỗ Trợ
                            </button>
                        </div>
                        <div
                            id="contactSupport"
                            className="accordion-collapse collapse show"
                            aria-labelledby="contactSupport"
                            data-bs-parent="#accordionExample"
                        >
                            <div className="p-3">
                                <p>
                                    Để được hỗ trợ nhanh chóng, vui lòng liên hệ với chúng tôi qua các kênh sau:
                                    <ul>
                                        <li>Email: hangnguyen99@gmail.com</li>
                                        <li>Số điện thoại: 0702750567</li>
                                        <li>Hỗ trợ trực tuyến: <a href="https://yourwebsite.com/chat">Trò chuyện trực tuyến</a></li>
                                    </ul>
                                    Giờ làm việc của chúng tôi là từ 9:00 AM đến 6:00 PM, từ thứ Hai đến thứ Sáu.
                                </p>
                            </div>
                        </div>

                        <div className="accordion-header mt-2 ms-2" style={{ marginBottom: '1rem' }}>
                            <button
                                className="accordion-button fs-6 fw-bold"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#faq"
                                aria-expanded="true"
                                aria-controls="faq"
                                style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    padding: '0.75rem 1.25rem',
                                }}
                            >
                                Câu Hỏi Thường Gặp
                            </button>
                        </div>
                        <div
                            id="faq"
                            className="accordion-collapse collapse show"
                            aria-labelledby="faq"
                            data-bs-parent="#accordionExample"
                        >
                            <div className="p-3">
                                <p>
                                    <strong>Câu hỏi 1:</strong> Tôi có thể đổi trả sản phẩm không?
                                    <br />
                                    <strong>Trả lời:</strong> Có, bạn có thể đổi trả sản phẩm trong vòng 30 ngày kể từ ngày mua hàng nếu sản phẩm còn nguyên vẹn và chưa sử dụng.
                                </p>
                                <p>
                                    <strong>Câu hỏi 2:</strong> Làm thế nào để theo dõi đơn hàng của tôi?
                                    <br />
                                    <strong>Trả lời:</strong> Bạn có thể theo dõi đơn hàng của mình bằng cách đăng nhập vào tài khoản của bạn trên website và kiểm tra trạng thái đơn hàng.
                                </p>
                                <p>
                                    <strong>Câu hỏi 3:</strong> Tôi có thể thanh toán bằng phương thức nào?
                                    <br />
                                    <strong>Trả lời:</strong> Chúng tôi chấp nhận nhiều phương thức thanh toán bao gồm thẻ tín dụng, thẻ ghi nợ, và thanh toán khi nhận hàng.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Support;
