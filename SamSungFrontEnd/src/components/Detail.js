import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import productService from "../service/login/product/productService";
import Swal from "sweetalert2";
import cartService from "../service/login/cart/cartService";
import customerService from "../service/login/customer/customerService"
import { QuantityContext } from "./QuantityContext";
export default function Detail() {
    const [activeButton, setActiveButton] = useState(0);
    const [capacityId, setCapacityId] = useState(0);
    const [quantity, setQuantity] = useState(1)
    const [customerDetail, setCustomerDetail] = useState()
    const token = localStorage.getItem('token')
    const [productDetail, setProductDetail] = useState()
    const { setIconQuantity } = useContext(QuantityContext);
    const [showProductErr, setShowProductErr] = useState(false);
    const handleButtonClick = (buttonIndex, id) => {
        setActiveButton(buttonIndex);
        setCapacityId(id)
        setQuantity(1)
    };
    const navigate = useNavigate()
    const param = useParams()
    const detailCustomer = async () => {
        try {
            const res = await customerService.detail()
            setCustomerDetail(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    const detail = async () => {
        try {
            const res = await productService.detail(param.id)
            setProductDetail(res.data)
            setCapacityId(res?.data?.capacityProductSet[0]?.capacity?.id)
            setShowProductErr(false)
        } catch (error) {
            console.log(error);
            if (error.response.data.message === 'Sản phẩm không tồn tại') {
                setShowProductErr(true)
            }
            if (error.response.data.message === 'Sản phẩm chưa có dữ liệu') {
                setShowProductErr(true)
            }
        }
    }
    useEffect(() => {
        detailCustomer()
    }, [token])
    useEffect(() => {
        detail()
    }, [param.id])
    useEffect(() => {
        document.title = "Thông Tin Sản Phẩm";
    }, [])
    useEffect(() => {
        setIconQuantity(customerDetail?.cartSet.length)
    }, [customerDetail?.cartSet.length])

    const handleCreatCart = async () => {
        try {
            const value = {
                quantity: quantity,
                price: productDetail?.capacityProductSet
                    .filter(element => capacityId === element.capacity.id)
                    .map(element => (element.priceSale))[0],
                idCapacityProduct: productDetail?.capacityProductSet[activeButton].id
            }
            await cartService.createCart(value)
            Swal.fire({
                icon: 'success',
                title: 'Sản phẩm đã được thêm vào giỏ hàng',
                showConfirmButton: false,
                timer: 1500
            })
            setQuantity(1)
            detail()
            detailCustomer()
        } catch (error) {
            console.log(error);
        }
    }

    const handleBuyNow = async () => {
        try {
            const value = {
                quantity: quantity,
                price: productDetail?.capacityProductSet
                    .filter(element => capacityId === element.capacity.id)
                    .map(element => (element.priceSale))[0],
                idCapacityProduct: productDetail?.capacityProductSet[activeButton].id
            }
            await cartService.createCart(value)
            navigate('/cart')
        } catch (error) {
            console.log(error);
        }
    }



    const handleChangeQuantity = (e) => {
        if (+e.target.value + +productDetail?.capacityProductSet[activeButton]?.cartSet
            .filter(element => element.user.id === customerDetail?.id)
            .map(element => element.quantity) > +productDetail?.capacityProductSet[activeButton].quantity) {
            Swal.fire({
                icon: 'error',
                title: 'Số lượng trong kho đã hết',
                showConfirmButton: false,
                timer: 1500
            })
            setQuantity(+productDetail?.capacityProductSet[activeButton].quantity - +productDetail?.capacityProductSet[activeButton]?.cartSet
                .filter(element => element.user.id === customerDetail?.id)
                .map(element => element.quantity))
        } else if (isNaN(+e.target.value) || +e.target.value < 1) {
            setQuantity(quantity)
        } else {
            setQuantity(+e.target.value)
        }
    }
    const handleCartLogin = () => {
        Swal.fire({
            icon: 'error',
            title: 'Vui lòng đăng nhập để mua hàng',
            showConfirmButton: false,
            timer: 1500
        })
        navigate('/login')
    }
    // if (!productDetail) {
    //    return null
    // }
    return (
        <>
            {
                showProductErr === false ? 
                <>
                    <div className=" bg-home">
                        <div className="p-5">
                            <div style={{ marginTop: 100 }}>
                                <NavLink to={'/'} className="bi bi-house text-secondary fs-4 text-decoration-none ms-5 ps-2">
                                    <span className="ms-2 fw-normal fs-5">Trang chủ</span>
                                </NavLink>
                                <span className="ms-2 fw-normal fs-5 text-secondary">/</span>
                                <NavLink to={'/product'} className={'text-secondary fs-4 text-decoration-none  ps-2'}>
                                    <span className="fw-normal fs-5">Sản phẩm</span>
                                </NavLink>
                            </div>
                            <div className="container bg-white shadow-cosmetics-1 mt-3">
                                <div className="row mx-0" >
                                    <div id="carouselExampleIndicators" className="carousel slide d-flex col-6">
                                        <div className="col-4">
                                            <div className="carousel-indicators-1 mt-5 pt-3">
                                                {
                                                    productDetail?.imageSet.map((img, index) => (
                                                        <div key={index}>
                                                            <img
                                                                src={img.name}
                                                                data-bs-target="#carouselExampleIndicators"
                                                                data-bs-slide-to={index++}
                                                                className="float-end bg-white"
                                                                aria-current="true"
                                                                aria-label={`Slide ${img.id}`}
                                                            />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className="col-8 p-0">
                                            <div className="carousel-inner">
                                                {
                                                    productDetail?.imageSet.map((img, index) => (
                                                        <div className={index === 0 ? "carousel-item active" : "carousel-item"} key={index}>
                                                            <img
                                                                src={img.name}
                                                                alt="New York"
                                                                className="d-block"
                                                                style={{ width: "100%", height: 500, backgroundSize: 'cover', objectFit: 'contain' }}
                                                            />
                                                        </div>
                                                    ))
                                                }

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mt-5 text-secondary">
                                            <h3>{productDetail?.name}</h3>
                                        </div>
                                        <div className="d-flex mt-2">
                                            <ul className="px-4">
                                                <li className="fw-bold">Mã Sản Phẩm : <span className="fw-normal text-secondary">{productDetail?.code}</span></li>
                                                <li className="fw-bold">Tình Trạng :
                                                    <span className="fw-normal text-secondary ms-1" >
                                                        {+productDetail?.capacityProductSet[activeButton]?.quantity < 1
                                                            || +productDetail?.capacityProductSet[activeButton]?.cartSet
                                                                .filter(element => element.user.id === customerDetail?.id)
                                                                .map(element => element.quantity) >= +productDetail?.capacityProductSet[activeButton]?.quantity
                                                            ?
                                                            <span className="text-danger fw-bold">Hết hàng</span> : <span>Còn hàng</span>}
                                                    </span>
                                                </li>
                                                <li className="fw-bold">Màu Sắc : <span className="fw-normal text-secondary">{productDetail?.color}</span></li>
                                            </ul>
                                            <ul className="ms-5 text-ul">
                                                <li className="fw-bold">Thương Hiệu : <span className="fw-normal text-secondary">{productDetail?.producer.name}</span></li>
                                                <li className="fw-bold">Phân Khúc : <span className="fw-normal text-secondary">{productDetail?.productType.name}</span></li>
                                            </ul>
                                        </div>
                                        <hr />
                                        <div className="ms-3">
                                            <div className="d-inline">
                                                {productDetail?.capacityProductSet.map((element, index) => (
                                                    <span className="fw-bold text-secondary text-decoration-line-through" key={index}>
                                                        {+element.price === 0 ? '' : capacityId === element.capacity.id &&
                                                            (quantity * element.price).toLocaleString(
                                                                "vi-VN",
                                                                { style: "currency", currency: "VND" }
                                                            )
                                                        }
                                                    </span>
                                                ))
                                                }
                                            </div>
                                            <div className="d-inline ms-3">
                                                {
                                                    productDetail?.capacityProductSet.map((element, index) => (
                                                        <span className="fs-5 text-danger fw-bold" key={index}>
                                                            {capacityId === element.capacity.id &&
                                                                (quantity * element.priceSale).toLocaleString(
                                                                    "vi-VN",
                                                                    { style: "currency", currency: "VND" }
                                                                )}</span>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <hr />
                                        <div>
                                            <span className="fw-bold">Dung Lượng : </span>
                                            {
                                                productDetail?.capacityProductSet.map((set, index) => (
                                                    <a style={{color:"black"}} type="button"
                                                        onClick={() => handleButtonClick(index, set.capacity.id)}
                                                        className={`capacity-button ms-2 ${index === activeButton ? 'active' : ''}`}>{set.capacity.name}</a>
                                                ))
                                            }
                                        </div>
                                        {
                                            +productDetail?.capacityProductSet[activeButton].quantity < 1
                                                || +productDetail?.capacityProductSet[activeButton]?.cartSet
                                                    .filter(element => element.user.id === customerDetail?.id)
                                                    .map(element => element.quantity) >= +productDetail?.capacityProductSet[activeButton]?.quantity
                                                ?
                                                <div className="mt-4 fs-5">
                                                    <span className="fw-bold text-danger">Xin lỗi sản phẩm đã hết hàng</span>
                                                </div> :
                                                <>
                                                    <div className="mt-4">
                                                        <button onClick={quantity > 1 ? () => setQuantity(quantity - 1) : () => { }}
                                                            className={quantity === 1 ? "btn-number text-dieucosmetics" : "btn-quantity text-dieucosmetics"}>-</button>
                                                        <input onChange={handleChangeQuantity} className=" btn-number text-dieucosmetics text-center" value={quantity} />
                                                        <button onClick={quantity + +productDetail?.capacityProductSet[activeButton]?.cartSet
                                                            .filter(element => element.user.id === customerDetail?.id)
                                                            .map(element => element.quantity) >= +productDetail?.capacityProductSet[activeButton].quantity ?
                                                            () => {
                                                                Swal.fire({
                                                                    icon: 'error',
                                                                    title: 'Số lượng trong kho đã hết',
                                                                    showConfirmButton: false,
                                                                    timer: 1500
                                                                })
                                                            } : () => setQuantity(quantity + 1)} className=" btn-quantity text-dieucosmetics">+</button>
                                                    </div>
                                                    <hr />
                                                    <div className="mt-2">
                                                        {
                                                            token === null
                                                                ?
                                                                <button onClick={handleCartLogin} className="button-buy text-decoration-none">Thêm Vào Giỏ Hàng</button>
                                                                :
                                                                <button onClick={handleCreatCart} className="button-buy">Thêm Vào Giỏ Hàng</button>
                                                        }
                                                        {
                                                            token === null
                                                                ?
                                                                <button onClick={handleCartLogin} className="button-buy ms-3">Mua ngay</button>
                                                                :
                                                                <button onClick={handleBuyNow} className="button-buy ms-3">Mua ngay</button>
                                                        }

                                                    </div>
                                                </>
                                        }
                                    </div>
                                </div>
                                <div className="row pb-5">
                                    <div className="container">
                                        <div className="bg-home">
                                            <h3 className="text-center text-secondary py-3">MÔ TẢ SẢN PHẨM</h3>
                                        </div>
                                        <div className="col-11 m-auto mt-4">
                                            <p className="text-secondary" dangerouslySetInnerHTML={{ __html: productDetail?.description }}></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="service-policy-area section-space mt-2 container px-0 ">
                        <div ><h2 className='text-center bg-home text-secondary py-3'>SẢN PHẨM LIÊN QUAN</h2></div>
                        <hr className='mx-5' />
                        <div className='container'>
                            <div id="carouselExampleControls" className="carousel carousel-dark slide " data-bs-ride="carousel">
                                <div className="carousel-inner ">
                                    <div className="carousel-item active">
                                        <div className="row d-flex justify-content-center">
                                            <div className="col-lg-2 mx-4 px-0">
                                                <div className="card-1" >
                                                    <img src="https://cdn.tgdd.vn/Products/Images/42/322096/samsung-galaxy-a55-5g-xanh-thumb-1-600x600.jpg" className="card-img-top" alt="..." />
                                                    <div className="card-body">
                                                        <h6>Samsung Galaxy A55 5G</h6>
                                                        <p className='text-danger'>1.320.000 đ</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-2 mx-4 px-0">
                                                <div className="card-1" >
                                                    <img src="https://cdn.tgdd.vn/Products/Images/42/323563/samsung-galaxy-m35-5g-xanhdam-thumb-600x600.jpg" className="card-img-top" alt="..." />
                                                    <div className="card-body">
                                                        <h6>Samsung Galaxy M35 5G 8GB/256GB</h6>
                                                        <p className='text-danger'>1.320.000 đ</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-2 mx-4 px-0">
                                                <div className="card-1" >
                                                    <img src="https://cdn.tgdd.vn/Products/Images/42/327372/samsung-galaxy-m55-5g-black-thumb-600x600.jpg" className="card-img-top" alt="..." />
                                                    <div className="card-body">
                                                        <h6>Samsung Galaxy M55 5G</h6>
                                                        <p className='text-danger'>1.320.000 đ</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-2 mx-4 px-0">
                                                <div className="card-1" >
                                                    <img src="https://cdn.tgdd.vn/Products/Images/42/275953/samsung-galaxy-m54-bac-thumb-600x600.jpg" className="card-img-top" alt="..." />
                                                    <div className="card-body">
                                                        <h6>Samsung Galaxy M54 5G</h6>
                                                        <p className='text-danger'>1.320.000 đ</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item active">
                                        <div className="row d-flex justify-content-center">
                                            <div className="col-lg-2 mx-4 px-0">
                                                <div className="card-1" >
                                                    <img src="https://cdn.tgdd.vn/Products/Images/42/322096/samsung-galaxy-a55-5g-xanh-thumb-1-600x600.jpg" className="card-img-top" alt="..." />
                                                    <div className="card-body">
                                                        <h6>Samsung Galaxy A55 5G</h6>
                                                        <p className='text-danger'>1.320.000 đ</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-2 mx-4 px-0">
                                                <div className="card-1" >
                                                    <img src="https://cdn.tgdd.vn/Products/Images/42/323563/samsung-galaxy-m35-5g-xanhdam-thumb-600x600.jpg" className="card-img-top" alt="..." />
                                                    <div className="card-body">
                                                        <h6>Samsung Galaxy M35 5G 8GB/256GB</h6>
                                                        <p className='text-danger'>1.320.000 đ</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-2 mx-4 px-0">
                                                <div className="card-1" >
                                                    <img src="https://cdn.tgdd.vn/Products/Images/42/327372/samsung-galaxy-m55-5g-black-thumb-600x600.jpg" className="card-img-top" alt="..." />
                                                    <div className="card-body">
                                                        <h6>Samsung Galaxy M55 5G</h6>
                                                        <p className='text-danger'>1.320.000 đ</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-2 mx-4 px-0">
                                                <div className="card-1" >
                                                    <img src="https://cdn.tgdd.vn/Products/Images/42/275953/samsung-galaxy-m54-bac-thumb-600x600.jpg" className="card-img-top" alt="..." />
                                                    <div className="card-body">
                                                        <h6>Samsung Galaxy M54 5G</h6>
                                                        <p className='text-danger'>1.320.000 đ</p>
                                                    </div>
                                                </div>
                                            </div>
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
                </> 
                    :
                    <div>
                        <img src="https://web4s.vn/uploads/plugin/news/581/403-forbidden.png" width={'100%'} height={'100%'} />
                    </div>
            }

        </>
    )
}