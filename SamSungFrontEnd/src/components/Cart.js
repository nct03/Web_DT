import { useContext, useEffect, useState } from "react";
import customerService from "../service/login/customer/customerService"
import cartService from "../service/login/cart/cartService";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router-dom";
import { QuantityContext } from "./QuantityContext";
import * as Yup from 'yup';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { RotatingLines } from "react-loader-spinner";
export default function Cart() {
    const [customerDetail, setCustomerDetail] = useState()
    const token = localStorage.getItem('token')
    const [cartList, setCartList] = useState([])
    const [valueCart, setValueCart] = useState({
        id: 0,
        quantity: ''
    })
    const [isSendMail,setIsSendMail] = useState(false)
    const [mounted, setMounted] = useState(false);
    const [showVNpay, setShowVNPay] = useState(false)
    const [quantityCheckbox, setQuantityCheckbox] = useState([])
    const { setIconQuantity } = useContext(QuantityContext)
    const existingCart = JSON.parse(localStorage.getItem('valueCart')) || [];
    const [phoneNumberCustomer, setPhoneNumberCustomer] = useState(null)
    const [addressCustomer, setAddressCustomer] = useState(null)
    const [totalPayment, setTotalPayment] = useState(0)
    const navigate = useNavigate()
    const detail = async () => {
        try {
            const res = await customerService.detail()
            setCustomerDetail(res.data)

        } catch (error) {
            console.log(error);
        }
    }
    const getCartList = async () => {
        try {
            const res = await cartService.findAllCart()
            setCartList(res.data.content)
        } catch (error) {
            console.log(error);
        }
    }
    const updateCart = () => {
        console.log(cartList);
        try {
            cartList.map(async (item) => {
                if (item?.quantity > item?.capacityProductQuantity) {
                    const value = []
                    value.push({
                        id: item.cartId,
                        quantity: item.capacityProductQuantity
                    })
                    await cartService.updateCart(value)
                    getCartList()
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const updateCartQuantity = async (value) => {
        try {
            await cartService.updateCart(value)
            localStorage.removeItem('valueCart')
            getCartList()
        } catch (error) {
            console.log(error);
            if (error.response.data.message) {
                navigate('/paypal-error')
                localStorage.removeItem('valueCart')
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    }
    const handleDelete = async (id) => {
        try {
            await cartService.deleteCart(id)
            setQuantityCheckbox(quantityCheckbox.filter(ids => ids != id));
            const updatedCartStorage = existingCart.filter((element) => {
                return +element.id !== +id;
            });
            localStorage.setItem('valueCart', JSON.stringify(updatedCartStorage))
            const valueCartStorage = localStorage.getItem('valueCart')
            updateCartQuantity(JSON.parse(valueCartStorage))
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        updateCart()
    }, [cartList.some(element => element.quantity > element.capacityProductQuantity)])
    useEffect(() => {
        getCartList()
    }, [])
    useEffect(() => {
        detail()
    }, [token])
    useEffect(() => {
        return () => {
            const valueCartStorage = localStorage.getItem('valueCart')
            document.removeEventListener('beforeunload', updateCartQuantity(JSON.parse(valueCartStorage) ? JSON.parse(valueCartStorage) : []));
        };
    }, []);
    const handleIncrease = (cartId) => {
        const updatedCartList = cartList.map((item) => {
            if (item?.cartId === cartId) {
                setValueCart({
                    id: cartId,
                    quantity: +item.quantity + 1
                })
                return {
                    ...item,
                    quantity: +item.quantity + 1,
                };
            }
            return item;
        });
        setCartList(updatedCartList);
        setMounted(true)
    }
    const handleReduce = (cartId) => {
        const updatedCartList = cartList.map((item) => {
            if (isNaN(+item.quantity) || +item.quantity < 1) {
                return {
                    ...item,
                    quantity: +valueCart.quantity,
                };
            }
            if (item?.cartId === cartId) {
                setValueCart({
                    id: cartId,
                    quantity: +item.quantity - 1
                })
                return {
                    ...item,
                    quantity: +item.quantity - 1,
                };
            }
            return item;
        });
        setCartList(updatedCartList);
        setMounted(true)
    }
    const handleChangeQuantity = (cartId, quantity) => {
        const updatedCartList = cartList.map((item) => {
            if (item?.cartId === cartId) {
                if (+quantity > item.capacityProductQuantity) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Số lượng trong kho có ' + item.capacityProductQuantity + ' sản phẩm',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setValueCart({
                        id: cartId,
                        quantity: +item.capacityProductQuantity,
                    })
                    return {
                        ...item,
                        quantity: +item.capacityProductQuantity,
                    };
                }
                if (isNaN(+quantity) || +quantity < 1) {
                    return {
                        ...item,
                        quantity: +valueCart.quantity,
                    };
                }
                setValueCart({
                    id: cartId,
                    quantity: +quantity
                })
                return {
                    ...item,
                    quantity: +quantity,
                };
            }
            return item;
        });
        setCartList(updatedCartList);
        setMounted(true)
    }
    const handleFormPay = (event, cartId) => {
        if (event.target.checked) {
            setQuantityCheckbox([...quantityCheckbox, cartId])
        } else {
            setQuantityCheckbox(quantityCheckbox.filter(id => id !== cartId));
        }
    }
    const handlePayMent = async (totalPay, cartIds, phoneNumber, customerName, address) => {
        const value = {
            totalPay: totalPay
        }
        try {
            const res = await cartService.handleVNPay(value)
            window.location.href = res.data.url;
            localStorage.setItem('cartIds', JSON.stringify(cartIds))
            localStorage.setItem('phoneNumber', phoneNumber)
            localStorage.setItem('customerName', customerName)
            localStorage.setItem('address', address)
        } catch (error) {
            console.log(error);
        }
    }
    const handlePaypal = async (totalPay, cartIds, phoneNumber, customerName, address, paymentDate, paymentCode) => {
        const valueCartStorage = localStorage.getItem('valueCart')
        try {
            await cartService.updateCart(JSON.parse(valueCartStorage) ? JSON.parse(valueCartStorage) : [])
            setIsSendMail(true)
            localStorage.removeItem('valueCart')
            const valuePayment = {
                phoneNumber: phoneNumber,
                shippingAddress: address,
                totalPay: totalPay,
                cartIds: cartIds,
                paymentMethod: 'Paypal'
            }
            try {
                await cartService.payment(valuePayment)
                setIsSendMail(false)
                navigate('/paypal-success/' + totalPay + '/' + customerName + '/' + paymentDate + '/' + paymentCode)
            } catch (error) {
                navigate('/paypal-error')
                localStorage.removeItem('valueCart')
                if (error.response.data.message) {
                    Swal.fire({
                        icon: 'error',
                        title: error.response.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }
        } catch (error) {
            setIsSendMail(false)
            navigate('/paypal-error')
            localStorage.removeItem('valueCart')
            if (error.response.data.message) {
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    }
    const handleVNPaymentMethod = () => {
        setShowVNPay(!showVNpay)
    }
    useEffect(() => {
        setIconQuantity(cartList.length)
    }, [cartList.length])


    const updatedCart = existingCart.map((item) => {
        if (item.id === valueCart.id) {
            return {
                ...item,
                quantity: +valueCart.quantity,
            };
        }
        return item;
    });
    const foundItem = existingCart.find((item) => +item.id === +valueCart.id);
    if (!foundItem && +valueCart.id !== 0) {
        updatedCart.push({
            id: valueCart.id,
            quantity: +valueCart.quantity
        });
    }
    useEffect(() => {
        if (mounted) {
            localStorage.setItem('valueCart', JSON.stringify(updatedCart))
            setMounted(false)
        }
    }, [updatedCart])
    useEffect(() => {
        document.title = "Giỏ Hàng";
    }, [])
    useEffect(() => {
        setTotalPayment(cartList
            .filter(elements => quantityCheckbox.includes(elements.cartId))
            .map((element) => (+element.price * +element.quantity))
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0))
    }, [valueCart, quantityCheckbox])
    console.log(totalPayment);
    const schema = Yup.object().shape({
        phoneNumber: Yup.string().required('Số điện thoại không được để trống')
            .matches(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/, 'Nhập đúng định dạng SDT VD: 0903.XXX.XXX (X là chữ số)'),
        // address: Yup.string().required('Địa chỉ không được để trống')
    });
    const schema1 = Yup.object().shape({
        address: Yup.string().required('Địa chỉ không được để trống')
    });
    const handlePhoneNumberCustomer = (event) => {
        const phoneNumber = event.target.value;
        setPhoneNumberCustomer(phoneNumber);
        schema
            .validate({ phoneNumber })
            .then(() => {
                document.getElementById('phoneNumberError').innerHTML = '';
            })
            .catch((error) => {
                console.log(error.message);
                document.getElementById('phoneNumberError').innerHTML = error.message;
            });
    }
    const handleAddressCustomer = (event) => {
        const address = event.target.value;
        setAddressCustomer(address)
        schema1
            .validate({ address })
            .then(() => {
                document.getElementById('addressError').innerHTML = '';
            })
            .catch((error) => {
                console.log(error);
                document.getElementById('addressError').innerHTML = error.message;
            });
    }
    return (
        <>
            <div style={{ marginTop: 100 }}>
                {
                    isSendMail ? 
                    <div className="rounting">
                    <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="70"
                    className="rounting"
                    visible={true}
                  />
                  </div> 
                  : 
                  <div >
                <div className={"p-5"}>
                    <div >
                        <NavLink to={'/'} className="bi bi-house text-secondary fs-4 text-decoration-none ms-5 ps-2">
                            <span className="ms-2 fw-normal fs-5">Trang chủ</span>
                        </NavLink>
                        <span className="ms-2 fw-normal fs-5 text-secondary">/</span>
                        <NavLink to={'/product'} className={'text-secondary fs-4 text-decoration-none  ps-2'}>
                            <span className="fw-normal fs-5">Sản phẩm</span>
                        </NavLink>
                    </div>
                    <div className="container bg-white shadow-cosmetics-1 px-0 mt-3">
                        <div className="row mx-0" >
                            <div className="bg-home p-3 text-secondary text-center">
                                <h2>GIỎ HÀNG CỦA BẠN</h2>
                            </div>
                            <div className="p-0">
                                {
                                    customerDetail === undefined || cartList.length === 0 ?
                                        <div className="d-flex justify-content-center p-5 "><img src="https://bizweb.dktcdn.net/100/455/309/themes/862138/assets/empty-cart.png?1668669829889" /></div> :
                                        <table className="mt-3">
                                            <thead>
                                                <tr className="text-center text-secondary align-middle ">
                                                    <th>Chọn sản phẩm</th>
                                                    <th>Ảnh</th>
                                                    <th>Tên sản phẩm</th>
                                                    <th>Dung tích</th>
                                                    <th>Đơn giá</th>
                                                    <th>Số lượng</th>
                                                    <th>Tổng</th>
                                                    <th>Xóa</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cartList.map((element, index) => (
                                                    <tr className="text-center align-middle fs-6" key={index}>
                                                        <td>
                                                            <input className="form-check-input border border-2 border-color fs-5"
                                                                type="checkbox"
                                                                onClick={(event) => handleFormPay(event, element.cartId)}
                                                            />
                                                        </td>
                                                        <td
                                                            style={{
                                                                width: '10%'
                                                            }}
                                                        >
                                                            <img
                                                                src={element.imageName}
                                                                width='100%'
                                                            />
                                                        </td>
                                                        <td>
                                                            {
                                                                element.productName.length > 30 ? <span>{element.productName.slice(0, 30)}...</span> : <span>{element.productName}</span>
                                                            }
                                                        </td>
                                                        <td>
                                                            {element.capacityName}
                                                        </td>
                                                        <td
                                                            style={{
                                                                width: '10%'
                                                            }}
                                                        >{(+element.price).toLocaleString(
                                                            "vi-VN",
                                                            { style: "currency", currency: "VND" }
                                                        )}
                                                        </td>
                                                        <td
                                                            style={{
                                                                width: '15%'
                                                            }}
                                                        >
                                                            <div>
                                                                <button onClick={element.quantity === 1 ? () => { } : () => handleReduce(element.cartId)}
                                                                    className={element.quantity <= 1 ? "btn-number-cart text-dieucosmetics" : "btn-quantity text-dieucosmetics"}>-</button>
                                                                <input onChange={(e) => handleChangeQuantity(element.cartId, e.target.value)} className="btn-number-cart text-dieucosmetics text-center" value={element.quantity} />
                                                                <button onClick={element.quantity >= element.capacityProductQuantity ? () => {
                                                                    Swal.fire({
                                                                        icon: 'error',
                                                                        title: 'Số lượng trong kho có ' + element.capacityProductQuantity + ' sản phẩm',
                                                                        showConfirmButton: false,
                                                                        timer: 1500
                                                                    })
                                                                } : () => handleIncrease(element.cartId)}
                                                                    className=" btn-quantity text-dieucosmetics">+</button>
                                                            </div>
                                                        </td>
                                                        <td
                                                            style={{
                                                                width: '10%'
                                                            }}
                                                        >{(+element.price * +element.quantity).toLocaleString(
                                                            "vi-VN",
                                                            { style: "currency", currency: "VND" }
                                                        )}</td>
                                                        <td
                                                            style={{
                                                                width: '10%'
                                                            }}
                                                        ><i type='button' onClick={() => {
                                                            Swal.fire({
                                                                color: '#d4969a',
                                                                text: 'XÓA SẢN PHẨM NÀY KHỎI GIỎ HÀNG ?',
                                                                imageUrl: `${element.imageName}`,
                                                                imageHeight: '150px',
                                                                icon: 'warning',
                                                                showCancelButton: true,
                                                                confirmButtonColor: '#3085d6',
                                                                cancelButtonColor: '#d33',
                                                                cancelButtonText: 'Không',
                                                                confirmButtonText: 'Có'
                                                            }).then((result) => {
                                                                if (result.isConfirmed) {
                                                                    handleDelete(element.cartId)
                                                                    Swal.fire({
                                                                        title: 'Xóa sản phẩm thành công',
                                                                        icon: 'success',
                                                                        showConfirmButton: false,
                                                                        timer: 1500
                                                                    }
                                                                    )
                                                                }
                                                            })
                                                        }} className="bi bi-trash text-dieucosmetics fs-3"></i></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                }
                            </div>
                        </div>

                    </div>
                </div>
                <div className="container px-0">
                    <div className="row pb-5 px-2">

                        <div className="col-8  p-5 border border-1 border-color form-cart text-secondary">
                            <div>
                                <h4 className="text-secondary bg-home text-center py-3">THÔNG TIN KHÁCH ĐẶT HÀNG</h4>
                            </div>
                            <div className="px-5">
                                {
                                    token === null ? <h3 className="text-danger text-center mt-5">Vui lòng đăng nhập!</h3>
                                        :
                                        <table className="w-100">
                                            <thead>
                                                <tr>
                                                    <th style={{
                                                        width: '30%',
                                                    }}>Tên khách hàng :</th>
                                                    <td style={{
                                                        height: '50px',
                                                    }}><input className="form-control-1 w-50" type="text" disabled value={customerDetail?.name} /></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>Số điện thoại :</th>
                                                    <td style={{
                                                        height: '50px',
                                                    }}><input onChange={handlePhoneNumberCustomer} className="form-control-1 w-50" type="text" value={phoneNumberCustomer !== null ? phoneNumberCustomer : customerDetail?.phoneNumber} />
                                                        <span className="text-danger" id="phoneNumberError"></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th className="align-top">Địa chỉ nhận hàng :</th>
                                                    <td style={{
                                                        height: '50px',
                                                    }}> <textarea onChange={handleAddressCustomer} style={{
                                                        height: '150px',
                                                    }} className="form-control-1" value={addressCustomer !== null ? addressCustomer : customerDetail?.address}></textarea>
                                                        <span className="text-danger" id="addressError"></span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                }
                            </div>
                        </div>
                        <div className="col-4 p-5 border border-1 border-color form-cart text-secondary">
                            <div>
                                <h4 className="text-secondary bg-home text-center py-3">THANH TOÁN</h4>
                            </div>
                            <div>

                                <table className="w-100">
                                    <thead>
                                        <tr>
                                            <th>Giá đơn hàng : </th>
                                            <td style={{
                                                height: '40px',
                                            }} className="text-end text-secondary fw-bold" >{totalPayment.toLocaleString(
                                                "vi-VN",
                                                { style: "currency", currency: "VND" }
                                            )}</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>Phí giao hàng : </th>
                                            <td style={{
                                                height: '40px',
                                            }} className="text-end text-secondary fw-bold" >39.000 ₫</td>
                                        </tr>
                                        <tr>
                                            <td><hr /></td>
                                            <td><hr /></td>

                                        </tr>
                                        <tr>
                                            <th className="fs-5">Tổng : </th>
                                            <td className="text-end text-secondary text-danger fw-bold fs-5" >{(totalPayment ? totalPayment + 39000 : 0).toLocaleString(
                                                "vi-VN",
                                                { style: "currency", currency: "VND" }
                                            )}</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td
                                                style={{
                                                    height: '80px',
                                                }}
                                            >   {
                                                    quantityCheckbox.length === 0 ?
                                                        <button onClick={() => {
                                                            Swal.fire({
                                                                title: 'Bạn chưa chọn sản phẩm',
                                                                icon: 'warning',
                                                                showConfirmButton: false,
                                                                timer: 1500
                                                            })
                                                        }} className="button-buy float-end">Chọn phương thức</button> :
                                                        <button onClick={handleVNPaymentMethod}
                                                            className="button-buy float-end" >{showVNpay ? 'Hủy chọn' : 'Chọn phương thức'}</button>
                                                }
                                            </td>
                                        </tr>
                                        {
                                            showVNpay &&
                                            <>
                                                <tr>
                                                    <td></td>
                                                    <td>
                                                        <img type='button' onClick={() => handlePayMent(+totalPayment ? +totalPayment + 39000 : 0, quantityCheckbox, phoneNumberCustomer !== null ? phoneNumberCustomer : customerDetail?.phoneNumber, customerDetail?.name, addressCustomer !== null ? addressCustomer : customerDetail?.address)}
                                                            className="border border-1 rounded border-color vnp" width={'100%'} height={'35px'} src="https://3428203472-files.gitbook.io/~/files/v0/b/gitbook-legacy-files/o/assets%2F-M47Mjlovb1o8n1BkFz7%2F-MN7SxEcvT_Y3xuokNIN%2F-MN7THTOhIcyZG_wpSYr%2FLogo-VNPAYQR-update.png?alt=media&token=388c51ec-cf9a-4e4e-9927-6425d75f09b9" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td className="pt-3">
                                                        <PayPalScriptProvider
                                                            options={{ "client-id": 'Af2kES12V2Tyift6dz7ytCy0R_40LnhNoTAcyYI5mJckJAzrz2_-Ew1a2T9ZOwUt0nsl_YSiHRgOF-TO' }}
                                                        >
                                                            <PayPalButtons
                                                                createOrder={(data, actions) => {
                                                                    return actions.order.create({
                                                                        purchase_units: [
                                                                            {
                                                                                amount: {
                                                                                    value: (totalPayment / 24000).toString().slice(0, 4),
                                                                                    currency_code: 'USD'
                                                                                },
                                                                            },
                                                                        ],
                                                                    });
                                                                }}
                                                                onApprove={async (data, actions) => {
                                                                    const details = await actions.order.capture();
                                                                    console.log(details);
                                                                    handlePaypal(+totalPayment ? +totalPayment + 39000 : 0, quantityCheckbox, phoneNumberCustomer !== null ? phoneNumberCustomer : customerDetail?.phoneNumber, customerDetail?.name, addressCustomer !== null ? addressCustomer : customerDetail?.address,details.create_time,details.id)
                                                                }}

                                                            />
                                                        </PayPalScriptProvider>
                                                    </td>
                                                </tr>
                                            </>
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                }
            </div>
        </>
    )
}