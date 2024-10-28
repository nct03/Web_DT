import { useEffect, useState } from "react"
import productService from "../service/login/product/productService"
import {  useNavigate } from "react-router-dom"
export default function Home() {
    const [productSaleList, setProductSaleList] = useState([]);
    const navigate = useNavigate();

    const getProductSaleList = async () => {
        try {
            const res = await productService.productSaleList();
            console.log(res);
            setProductSaleList(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProductSaleList();
        document.title = "Trang Chủ";
    }, []);

    const handleDetailProduct = (id) => {
        navigate('/product/detail/' + id);
    };

    console.log(productSaleList);
    return (
        <>
            <div style={{ marginTop: 117 }}>
                {/* Carousel */}
                <div id="demo" className="carousel slide" data-bs-ride="carousel">
                    {/* Indicators/dots */}
                    <div className="carousel-indicators">
                        <button
                            type="button"
                            data-bs-target="#demo"
                            data-bs-slide-to={0}
                            className="active"
                        />
                        <button type="button" data-bs-target="#demo" data-bs-slide-to={1} />
                        <button type="button" data-bs-target="#demo" data-bs-slide-to={2} />
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img
                                src="https://i.pinimg.com/originals/ea/bd/aa/eabdaadef69a169117a2900e77bfde9f.jpg"
                                alt="New York"
                                className="d-block"
                                style={{ width: "100%", height: 600, backgroundSize: 'cover' }}
                            />


                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://au2-images.shop.samsung.com/medias/Banner-2000x600-3E-1-.jpg?context=bWFzdGVyfGltYWdlc3w1Nzg5NDd8aW1hZ2UvanBlZ3xpbWFnZXMvaDMzL2hlNS85MjUxODM4ODUzMTUwLmpwZ3wzNGI5ZmYxZjU3ZWViMjIzNDg5YzI1NTM5MzkyOGRmYzQ3MzFmOGJkODk1YWE5OWM5MDJkOTRmOTQ1MDg3NTA1"
                                alt=""
                                className="d-block"
                                style={{ width: "100%", height: 600, backgroundSize: 'cover' }}
                            />

                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://au2-images.shop.samsung.com/medias/Banner-2000x600-3E-1-.jpg?context=bWFzdGVyfGltYWdlc3w1Nzg5NDd8aW1hZ2UvanBlZ3xpbWFnZXMvaDMzL2hlNS85MjUxODM4ODUzMTUwLmpwZ3wzNGI5ZmYxZjU3ZWViMjIzNDg5YzI1NTM5MzkyOGRmYzQ3MzFmOGJkODk1YWE5OWM5MDJkOTRmOTQ1MDg3NTA1"
                                alt=""
                                className="d-block"
                                style={{ width: "100%", height: 600, backgroundSize: 'cover' }}
                            />
                        </div>
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#demo"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" />
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#demo"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" />
                    </button>
                </div>
            </div>
            <section id="clients" style={{ padding: '60px 0' }}>
                <div className="container">
                    <div className="section-header" style={{ textAlign: 'center', fontWeight: '500', position: 'relative' }}>
                        <h3 style={{ fontSize: '36px', color: '#283d50' }}>Các sản phẩm hot mới ra mắt</h3>
                        <p style={{ margin: 'auto', fontSize: '15px', paddingBottom: '60px', color: '#556877', width: '50%' }}>
                            Hình ảnh sản phẩm
                        </p>
                    </div>

                    <div
                        className="row no-gutters clients-wrap clearfix wow fadeInUp"
                        style={{ borderTop: '1px solid #d6eaff', borderLeft: '1px solid #d6eaff', marginBottom: '30px', visibility: 'visible', animationName: 'fadeInUp' }}
                    >
                        <div className="col-lg-3 col-md-4 col-xs-6">
                            <div className="client-logo" style={{ padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRight: '1px solid #d6eaff', borderBottom: '1px solid #d6eaff', overflow: 'hidden', background: '#fff', height: '180px' }}>
                                <img src="https://cdn.tgdd.vn/Products/Images/42/320721/samsung-galaxy-z-fold6-xam-thumbn-600x600.jpg" className="img-fluid" alt="" style={{ transition: 'all 0.4s ease-in-out', maxWidth: '100%', maxHeight: '100%' }} />
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-4 col-xs-6">
                            <div className="client-logo" style={{ padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRight: '1px solid #d6eaff', borderBottom: '1px solid #d6eaff', overflow: 'hidden', background: '#fff', height: '180px' }}>
                                <img src="https://cdn.tgdd.vn/Products/Images/42/320722/samsung-galaxy-z-flip6-xanh-thumbn-600x600.jpg" className="img-fluid" alt="" style={{ transition: 'all 0.4s ease-in-out', maxWidth: '100%', maxHeight: '100%' }} />
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-4 col-xs-6">
                            <div className="client-logo" style={{ padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRight: '1px solid #d6eaff', borderBottom: '1px solid #d6eaff', overflow: 'hidden', background: '#fff', height: '180px' }}>
                                <img src="https://cdn.tgdd.vn/Products/Images/42/249948/samsung-galaxy-s23-ultra-green-thumbnew-600x600.jpg" className="img-fluid" alt="" style={{ transition: 'all 0.4s ease-in-out', maxWidth: '100%', maxHeight: '100%' }} />
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-4 col-xs-6">
                            <div className="client-logo" style={{ padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRight: '1px solid #d6eaff', borderBottom: '1px solid #d6eaff', overflow: 'hidden', background: '#fff', height: '180px' }}>
                                <img src="https://cdn.tgdd.vn/Products/Images/42/322096/samsung-galaxy-a55-5g-xanh-thumb-1-600x600.jpg" className="img-fluid" alt="" style={{ transition: 'all 0.4s ease-in-out', maxWidth: '100%', maxHeight: '100%' }} />
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-4 col-xs-6">
                            <div className="client-logo" style={{ padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRight: '1px solid #d6eaff', borderBottom: '1px solid #d6eaff', overflow: 'hidden', background: '#fff', height: '180px' }}>
                                <img src="https://cdn.tgdd.vn/Products/Images/42/325073/samsung-galaxy-m15-5g-blue-thumb-1-600x600.jpg" className="img-fluid" alt="" style={{ transition: 'all 0.4s ease-in-out', maxWidth: '100%', maxHeight: '100%' }} />
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-4 col-xs-6">
                            <div className="client-logo" style={{ padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRight: '1px solid #d6eaff', borderBottom: '1px solid #d6eaff', overflow: 'hidden', background: '#fff', height: '180px' }}>
                                <img src="https://cdn.tgdd.vn/Products/Images/42/306994/samsung-galaxy-s23-fe-mint-thumbnew-600x600.jpg" className="img-fluid" alt="" style={{ transition: 'all 0.4s ease-in-out', maxWidth: '100%', maxHeight: '100%' }} />
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-4 col-xs-6">
                            <div className="client-logo" style={{ padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRight: '1px solid #d6eaff', borderBottom: '1px solid #d6eaff', overflow: 'hidden', background: '#fff', height: '180px' }}>
                                <img src="https://cdn.tgdd.vn/Products/Images/42/323563/samsung-galaxy-m35-5g-xanhdam-thumb-600x600.jpg" className="img-fluid" alt="" style={{ transition: 'all 0.4s ease-in-out', maxWidth: '100%', maxHeight: '100%' }} />
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-4 col-xs-6">
                            <div className="client-logo" style={{ padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRight: '1px solid #d6eaff', borderBottom: '1px solid #d6eaff', overflow: 'hidden', background: '#fff', height: '180px' }}>
                                <img src="https://cdn.tgdd.vn/Products/Images/42/307174/samsung-galaxy-s24-ultra-grey-thumbnew-600x600.jpg" className="img-fluid" alt="" style={{ transition: 'all 0.4s ease-in-out', maxWidth: '100%', maxHeight: '100%' }} />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="service-policy-area section-space container">
                <div className="text-center">
                    <h2 className='bg-home text-secondary py-3 rounded-3'>Những sản phẩm nỗi bật</h2>
                </div>
                <div className='container'>
                    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {/* Slide 1 */}
                            <div className="carousel-item active">
                                <div className="row d-flex justify-content-center mt-3">
                                    {productSaleList.slice(0, 4).map((element, index) => (
                                        <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
                                            <div className="card shadow-sm border-light">
                                                <img src={element.imageName} className="card-img-top" alt={element.name} />
                                                <div className="card-body">
                                                    <h6 className="card-title">
                                                        {element.name.length > 20 ? `${element.name.slice(0, 20)}...` : element.name}
                                                    </h6>
                                                    <p className="card-text">
                                                        {+element.capacityProductPrice > 0 && (
                                                            <span className='text-decoration-line-through me-2'>
                                                    {(element.capacityProductPrice).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                                </span>
                                                        )}
                                                        <span className='text-danger fs-6 fw-bold'>
                                                {(element.capacityProductPriceSale).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                            </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Slide 2 */}
                            <div className="carousel-item">
                                <div className="row d-flex justify-content-center mt-3">
                                    {productSaleList.slice(4).map((element, index) => (
                                        <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
                                            <div className="card shadow-sm border-light">
                                                <img src={element.imageName} className="card-img-top" alt={element.name} />
                                                <div className="card-body">
                                                    <h6 className="card-title">
                                                        {element.name.length > 20 ? `${element.name.slice(0, 20)}...` : element.name}
                                                    </h6>
                                                    <p className="card-text">
                                                        {+element.capacityProductPrice > 0 && (
                                                            <span className='text-decoration-line-through me-2'>
                                                    {(element.capacityProductPrice).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                                </span>
                                                        )}
                                                        <span className='text-danger fs-6 fw-bold'>
                                                {(element.capacityProductPriceSale).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                            </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </section>


            <div style={{ backgroundColor: '#f9f9fa', padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>

                    {/* Block 1 */}
                    <div style={{ flex: '1 1 calc(33.333% - 1rem)', maxWidth: 'calc(33.333% - 1rem)', boxSizing: 'border-box' }}>
                        <div style={{
                            background: '#fff',
                            borderWidth: '0',
                            borderRadius: '.25rem',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, .05)',
                            marginBottom: '1.5rem',
                            position: 'relative',
                            overflow: 'hidden', // Ensure image does not overflow the container
                        }}>
                            <div style={{
                                position: 'relative',
                                paddingTop: '100%', // Maintain aspect ratio
                            }}>
                                <img
                                    src="https://cdn.tgdd.vn/Products/Images/42/275953/samsung-galaxy-m54-bac-thumb-600x600.jpg" // Replace with your image URL
                                    alt="Samsung Galaxy M54 5G"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover', // Maintain aspect ratio and cover the container
                                        borderRadius: '.25rem'
                                    }}
                                />
                            </div>
                            <div style={{
                                padding: '1rem',
                                textAlign: 'center',
                            }}>
                                <h5 style={{ margin: '0' }}>Samsung Galaxy M54 5G 8GB/256GB</h5>
                                <p style={{ margin: '0.5rem 0' }}>Thao tác nhanh chóng với Exynos 1380</p>
                                <a
                                    href="#"
                                    style={{
                                        display: 'inline-block',
                                        marginRight: '0.5rem',
                                        color: '#448bff',
                                        textDecoration: 'none',
                                    }}
                                >
                                    Chi tiết
                                </a>
                                <a
                                    href="#"
                                    style={{
                                        display: 'inline-block',
                                        color: '#448bff',
                                        textDecoration: 'none',
                                    }}
                                >
                                    Đặt hàng
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Repeat similar blocks for other items */}
                    <div style={{ flex: '1 1 calc(33.333% - 1rem)', maxWidth: 'calc(33.333% - 1rem)', boxSizing: 'border-box' }}>
                        <div style={{
                            background: '#fff',
                            borderWidth: '0',
                            borderRadius: '.25rem',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, .05)',
                            marginBottom: '1.5rem',
                            position: 'relative',
                            overflow: 'hidden', // Ensure image does not overflow the container
                        }}>
                            <div style={{
                                position: 'relative',
                                paddingTop: '100%', // Maintain aspect ratio
                            }}>
                                <img
                                    src="https://cdn.tgdd.vn/Products/Images/42/306994/samsung-galaxy-s23-fe-mint-thumbnew-600x600.jpg" // Replace with your image URL
                                    alt="Samsung Galaxy S23 FE 5G"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover', // Maintain aspect ratio and cover the container
                                        borderRadius: '.25rem'
                                    }}
                                />
                            </div>
                            <div style={{
                                padding: '1rem',
                                textAlign: 'center',
                            }}>
                                <h5 style={{ margin: '0' }}>Samsung Galaxy S23 FE 5G 8GB/128GB</h5>
                                <p style={{ margin: '0.5rem 0' }}>Tích hợp các tính năng AI mới</p>
                                <a
                                    href="#"
                                    style={{
                                        display: 'inline-block',
                                        marginRight: '0.5rem',
                                        color: '#448bff',
                                        textDecoration: 'none',
                                    }}
                                >
                                    Chi tiết
                                </a>
                                <a
                                    href="#"
                                    style={{
                                        display: 'inline-block',
                                        color: '#448bff',
                                        textDecoration: 'none',
                                    }}
                                >
                                    Đặt hàng
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <hr className='mx-5 hr-dieucosmetics mt-5' />

            <div style={{ backgroundColor: '#f4f8fa', padding: '5rem 0' }}>
                <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>

                        {/* Column 1 */}
                        <div style={{ flex: '1 1 50%', boxSizing: 'border-box' }}>
                            <div style={{
                                background: '#fff',
                                border: 'none',
                                borderRadius: '.25rem',
                                boxShadow: '0px 0px 30px rgba(115, 128, 157, 0.1)',
                                marginBottom: '1.5rem'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', padding: '2rem' }}>
                                    <div style={{
                                        fontSize: '2.5rem',
                                        color: '#2cdd9b',
                                        background: 'linear-gradient(to right, #2cdd9b 0%, #1dc8cc 100%)',
                                        WebkitBackgroundClip: 'text',
                                        backgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        textFillColor: 'transparent',
                                        marginRight: '1rem'
                                    }}>N</div>
                                    <div>
                                        <h6 style={{ fontWeight: 500 }}>
                                            <a href="javascript:void(0)" style={{ color: '#3e4555', textDecoration: 'none' }}>
                                                Giải Pháp Nhanh Chóng
                                            </a>
                                        </h6>
                                        <p style={{ marginTop: '1rem', color: '#8d97ad' }}>
                                            Bạn có thể tin tưởng vào danh sách các tính năng tuyệt vời của chúng tôi và dịch vụ khách hàng của chúng tôi sẽ mang lại trải nghiệm tuyệt vời.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div style={{ flex: '1 1 50%', boxSizing: 'border-box' }}>
                            <div style={{
                                background: '#fff',
                                border: 'none',
                                borderRadius: '.25rem',
                                boxShadow: '0px 0px 30px rgba(115, 128, 157, 0.1)',
                                marginBottom: '1.5rem'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', padding: '2rem' }}>
                                    <div style={{
                                        fontSize: '2.5rem',
                                        color: '#2cdd9b',
                                        background: 'linear-gradient(to right, #2cdd9b 0%, #1dc8cc 100%)',
                                        WebkitBackgroundClip: 'text',
                                        backgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        textFillColor: 'transparent',
                                        marginRight: '1rem'
                                    }}>P</div>
                                    <div>
                                        <h6 style={{ fontWeight: 500 }}>
                                            <a href="javascript:void(0)" style={{ color: '#3e4555', textDecoration: 'none' }}>
                                                Kỹ Thuật Mạnh Mẽ
                                            </a>
                                        </h6>
                                        <p style={{ marginTop: '1rem', color: '#8d97ad' }}>
                                            Bạn có thể tin tưởng vào danh sách các tính năng tuyệt vời của chúng tôi và dịch vụ khách hàng của chúng tôi sẽ mang lại trải nghiệm tuyệt vời.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 3 */}
                        <div style={{ flex: '1 1 50%', boxSizing: 'border-box' }}>
                            <div style={{
                                background: '#fff',
                                border: 'none',
                                borderRadius: '.25rem',
                                boxShadow: '0px 0px 30px rgba(115, 128, 157, 0.1)',
                                marginBottom: '1.5rem'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', padding: '2rem' }}>
                                    <div style={{
                                        fontSize: '2.5rem',
                                        color: '#2cdd9b',
                                        background: 'linear-gradient(to right, #2cdd9b 0%, #1dc8cc 100%)',
                                        WebkitBackgroundClip: 'text',
                                        backgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        textFillColor: 'transparent',
                                        marginRight: '1rem'
                                    }}>S</div>
                                    <div>
                                        <h6 style={{ fontWeight: 500 }}>
                                            <a href="javascript:void(0)" style={{ color: '#3e4555', textDecoration: 'none' }}>
                                                Đảm Bảo Hài Lòng 100%
                                            </a>
                                        </h6>
                                        <p style={{ marginTop: '1rem', color: '#8d97ad' }}>
                                            Bạn có thể tin tưởng vào danh sách các tính năng tuyệt vời của chúng tôi và dịch vụ khách hàng của chúng tôi sẽ mang lại trải nghiệm tuyệt vời.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 4 */}
                        <div style={{ flex: '1 1 50%', boxSizing: 'border-box' }}>
                            <div style={{
                                background: '#fff',
                                border: 'none',
                                borderRadius: '.25rem',
                                boxShadow: '0px 0px 30px rgba(115, 128, 157, 0.1)',
                                marginBottom: '1.5rem'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', padding: '2rem' }}>
                                    <div style={{
                                        fontSize: '2.5rem',
                                        color: '#2cdd9b',
                                        background: 'linear-gradient(to right, #2cdd9b 0%, #1dc8cc 100%)',
                                        WebkitBackgroundClip: 'text',
                                        backgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        textFillColor: 'transparent',
                                        marginRight: '1rem'
                                    }}>R</div>
                                    <div>
                                        <h6 style={{ fontWeight: 500 }}>
                                            <a href="javascript:void(0)" style={{ color: '#3e4555', textDecoration: 'none' }}>
                                                Tiếp Thị Nhắm Mục Tiêu
                                            </a>
                                        </h6>
                                        <p style={{ marginTop: '1rem', color: '#8d97ad' }}>
                                            Bạn có thể tin tưởng vào danh sách các tính năng tuyệt vời của chúng tôi và dịch vụ khách hàng của chúng tôi sẽ mang lại trải nghiệm tuyệt vời.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Button */}
                        <div style={{ flex: '1 1 100%', textAlign: 'center', marginTop: '1rem' }}>
                            <a
                                href="#"
                                style={{
                                    display: 'inline-block',
                                    padding: '15px 45px',
                                    fontSize: '16px',
                                    color: '#fff',
                                    background: 'linear-gradient(to right, #2cdd9b 0%, #1dc8cc 100%)',
                                    textDecoration: 'none',
                                    border: 'none',
                                    borderRadius: '.25rem',
                                    transition: 'background 0.3s'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #1dc8cc 0%, #2cdd9b 100%)'}
                                onMouseOut={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #2cdd9b 0%, #1dc8cc 100%)'}
                            >
                                Xem Chi Tiết
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}