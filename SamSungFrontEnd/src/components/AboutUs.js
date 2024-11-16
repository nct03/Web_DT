import React from 'react';
import Header from "./Header";
import Footer from "./Footer";

const AboutUs = () => {
    return (
        <div>
            <Header></Header>
            <div className="row mx-0" style={{ marginTop: "117px" }}>
                <div className="px-0 image-container" style={{ height: "400px" }}>
                    <img
                        src="https://i.pinimg.com/originals/ea/bd/aa/eabdaadef69a169117a2900e77bfde9f.jpg"
                        width={"100%"}
                        height={"100%"}
                        alt="Về Chúng Tôi Banner"
                    />
                </div>
            </div>

            <div className="container mb-5">
                <div className="row mx-0 px-5 py-3">
                    <div className="col-12 text-secondary py-5">
                        <div>
                            <h4 style={{ textAlign: "center" }}>Về Chúng Tôi</h4>
                        </div>
                        <hr />

                        <div className="accordion-header mt-2 ms-2" style={{ marginBottom: '1rem' }}>
                            <button
                                className="accordion-button fs-6 fw-bold"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#ourMission"
                                aria-expanded="true"
                                aria-controls="ourMission"
                                style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    padding: '0.75rem 1.25rem',
                                }}
                            >
                                Sứ Mệnh Của Chúng Tôi
                            </button>
                        </div>
                        <div
                            id="ourMission"
                            className="accordion-collapse collapse show"
                            aria-labelledby="ourMission"
                            data-bs-parent="#accordionExample"
                        >
                            <div className="p-3">
                                <p>
                                    Sứ mệnh của chúng tôi là cung cấp các sản phẩm điện thoại Samsung chất lượng cao nhất và dịch vụ tận tâm đến từng khách hàng. Chúng tôi không ngừng nỗ lực để mang đến trải nghiệm mua sắm tuyệt vời và sự hài lòng cho mọi khách hàng.
                                </p>
                            </div>
                        </div>

                        <div className="accordion-header mt-2 ms-2" style={{ marginBottom: '1rem' }}>
                            <button
                                className="accordion-button fs-6 fw-bold"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#ourTeam"
                                aria-expanded="true"
                                aria-controls="ourTeam"
                                style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    padding: '0.75rem 1.25rem',
                                }}
                            >
                                Đội Ngũ Của Chúng Tôi
                            </button>
                        </div>
                        <div
                            id="ourTeam"
                            className="accordion-collapse collapse show"
                            aria-labelledby="ourTeam"
                            data-bs-parent="#accordionExample"
                        >
                            <div className="p-3">
                                <p>
                                    Chúng tôi là một đội ngũ chuyên nghiệp, đam mê công nghệ và không ngừng sáng tạo để mang đến cho khách hàng những sản phẩm và dịch vụ tốt nhất. Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ và đáp ứng mọi nhu cầu của khách hàng.
                                </p>
                            </div>
                        </div>

                        <div className="accordion-header mt-2 ms-2" style={{ marginBottom: '1rem' }}>
                            <button
                                className="accordion-button fs-6 fw-bold"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#ourValues"
                                aria-expanded="true"
                                aria-controls="ourValues"
                                style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    padding: '0.75rem 1.25rem',
                                }}
                            >
                                Giá Trị Cốt Lõi
                            </button>
                        </div>
                        <div
                            id="ourValues"
                            className="accordion-collapse collapse show"
                            aria-labelledby="ourValues"
                            data-bs-parent="#accordionExample"
                        >
                            <div className="p-3">
                                <p>
                                    Uy tín, chất lượng và sự hài lòng của khách hàng là những giá trị cốt lõi mà chúng tôi luôn đặt lên hàng đầu. Chúng tôi cam kết xây dựng mối quan hệ bền vững với khách hàng bằng cách cung cấp các sản phẩm và dịch vụ tốt nhất.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default AboutUs;
