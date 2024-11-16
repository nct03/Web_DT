import { Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import customerService from "../service/login/customer/customerService"
import loginService from './../service/login/loginService';
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { useContext } from "react";
import { AvatarContext } from "./AvatarContext";
import ReactPaginate from "react-paginate";
export default function DetailCustomer() {
    const [showPassword, setShowPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
    const [showFormChangePassword, setShowFormChangePassword] = useState(false)
    const [showHistory, setShowHistory] = useState(false)
    const [customerDetail, setCustomerDetail] = useState()
    const token = localStorage.getItem('token')
    const [detailCartList, setDetailCartList] = useState([])
    const navigate = useNavigate()
    const { setAvatar } = useContext(AvatarContext)
    const [pageCount, setPageCount] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(3)
    const [historyList, setHistoryList] = useState([])
    const [allList, setAllList] = useState([])
    const [show403Img, setShow403Img] = useState(false)
    const detail = async () => {
        try {
            const res = await customerService.detail()
            setCustomerDetail(res.data)
            setAllList(res.data.oderProducts)
            setShow403Img(false)
        } catch (error) {
            console.log(error)
            if(error.response.status===403){
                setShow403Img(true)
            }
        }
    }
    useEffect(() => {
        detail()
    }, [token])
    useEffect(() => {
        document.title = "Thông Tin Cá Nhân";
    }, [])
    useEffect(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        setPageCount(Math.ceil(allList.length / itemsPerPage))
        setHistoryList(allList.slice(indexOfFirstItem, indexOfLastItem))
    }, [customerDetail])
    useEffect(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        setHistoryList(allList.slice(indexOfFirstItem, indexOfLastItem))
    }, [currentPage])
    if (!customerDetail && show403Img===false) {
        return null
    }
    setAvatar(customerDetail?.avatar)
    const handleModalDetail = (detailCartList) => {
        setDetailCartList(detailCartList)
    }
    const handlePageClick = (page) => {
        setCurrentPage(page + 1)
    }
    const handleProductDetail = (id) => {
        navigate(`/product/detail/${id}`)
        const modalBackdrop = document.querySelector('.modal-backdrop');
        if (modalBackdrop) {
            modalBackdrop.classList.remove('modal-backdrop');
            modalBackdrop.classList.remove('fade');
            modalBackdrop.classList.remove('show');
        }
        const modalBody = document.querySelector('.modal-open');
        if (modalBody) {
            modalBody.classList.remove('modal-open');
            modalBody.style.removeProperty('overflow');
            modalBody.style.removeProperty('padding-right');
        }
    }
    console.log(detailCartList);
    return (
        <>
            {
                show403Img === false ?
                <div style={{
                    marginTop: 100
                }}>
                    <div className="row mx-0 mt-5 p-5">
                        <div>
                            <NavLink to={'/'} className="bi bi-house text-secondary fs-4 text-decoration-none"><span className="ms-2 fw-normal fs-5">Trang chủ</span></NavLink>
                        </div>
                        <div className="container p-5 shadow-cosmetics-1 mt-3 bg-white">
                            <div className="row">
                                <div className="col-3 mt-3">
                                    <div className="avatar">
                                        <img src={customerDetail?.avatar}
                                            className="border-avatar rounded-circle" width='100%' height='100%' alt="avatar" />
                                    </div>
                                </div>
                                <div className="col-9">
                                    <div className="row ms-3 px-3">
                                        <h2 className="text-center text-secondary bg-home py-2">THÔNG TIN CÁ NHÂN</h2>
                                        <div className="col-6 px-5">
                                            <table className=" font-table text-secondary">
                                                <thead>
                                                    <tr>
                                                        <th className="th-dieucosmetics">Mã khách hàng :</th>
                                                        <td style={{
                                                            width: '55%'
                                                        }}>{customerDetail?.code}</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th className="th-dieucosmetics">Họ và tên :</th>
                                                        <td>{customerDetail?.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="th-dieucosmetics">Giới tính :</th>
                                                        <td>{ customerDetail?.gender !== null ? (customerDetail?.gender === false ? 'Nam' : 'Nữ') : ("(Chưa cập nhật)") }</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="th-dieucosmetics">Ngày sinh :</th>
                                                        <td> {customerDetail?.dateOfBirth === null ? "(Chưa cập nhật)" : format(new Date(customerDetail?.dateOfBirth), "dd/MM/yyyy")}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className={customerDetail?.address ? "th-dieucosmetics align-top" :"th-dieucosmetics"}>Địa chỉ :</th>
                                                        <td>{customerDetail?.address ? customerDetail?.address:"(Chưa cập nhật)"}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="col-6">
                                            <Formik
                                                initialValues={{
                                                    oldPassword: '',
                                                    newPassword: '',
                                                    confirmPasswore: ''
                                                }}
                                                onSubmit={(value) => {
                                                    const changePassword = async () => {
                                                        try {
                                                            await loginService.changePassword(value)
                                                            localStorage.clear()
                                                            Swal.fire({
                                                                icon: 'success',
                                                                title: 'Thay đổi mật khẩu thành công. Vui lòng đăng nhập lại',
                                                                showConfirmButton: false,
                                                                timer: 1500
                                                            })
                                                            navigate('/login')
                                                        } catch (error) {
                                                            const err = error.response.data
                                                            console.log(err);
                                                            if (err.message === "Mật khẩu hiện tại không đúng") {
                                                                document.getElementById("oldPasswordErr").innerHTML = "Mật khẩu hiện tại không đúng"
                                                            } else if (err.oldPassword === "Không được bỏ trống") {
                                                                document.getElementById("oldPasswordErr").innerHTML = "Không được bỏ trống"
                                                            } else if (err.oldPassword === "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự") {
                                                                document.getElementById("oldPasswordErr").innerHTML = "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                                                            } else {
                                                                document.getElementById("oldPasswordErr").innerHTML = ""
                                                            }

                                                            if (err.message === "Mật khẩu mới không được trùng với mật khẩu cũ") {
                                                                document.getElementById("newPasswordErr").innerHTML = "Mật khẩu mới không được trùng với mật khẩu cũ"
                                                            } else if (err.newPassword === "Không được bỏ trống") {
                                                                document.getElementById("newPasswordErr").innerHTML = "Không được bỏ trống"
                                                            } else if (err.newPassword === "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự") {
                                                                document.getElementById("newPasswordErr").innerHTML = "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                                                            } else {
                                                                document.getElementById("newPasswordErr").innerHTML = ""
                                                            }


                                                            if (err.message === "Mật khẩu xác nhận không trùng khớp") {
                                                                document.getElementById("confirmPasswordErr").innerHTML = "Mật khẩu xác nhận không trùng khớp"
                                                            } else if (err.confirmPassword === "Không được bỏ trống") {
                                                                document.getElementById("confirmPasswordErr").innerHTML = "Không được bỏ trống"
                                                            } else if (err.confirmPassword === "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự") {
                                                                document.getElementById("confirmPasswordErr").innerHTML = "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                                                            } else {
                                                                document.getElementById("confirmPasswordErr").innerHTML = ""
                                                            }

                                                        }
                                                    }
                                                    changePassword()
                                                }}
                                            >
                                                <Form>
                                                    <table className="font-table text-secondary">
                                                        <thead>
                                                            <tr>
                                                                <th className="th-dieucosmetics" style={{ width: '220px' }}>Email :</th>
                                                                <td style={{
                                                                    width: '60%'
                                                                }}>{customerDetail?.email}</td>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th className="th-dieucosmetics">Số điện thoại :</th>
                                                                <td>{customerDetail?.phoneNumber ? customerDetail?.phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, "$1-$2-$3") : "(Chưa cập nhật)"}</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="th-dieucosmetics ">
                                                                    <NavLink to={`update`} type="button" className="text-dieucosmetics text-decoration-none">{'Chỉnh sửa thông tin'}</NavLink>
                                                                </th>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <th className="th-dieucosmetics ">
                                                                    {
                                                                        showHistory ?
                                                                            <span type="button" onClick={() => setShowHistory(!showHistory)} className="text-dieucosmetics text-decoration-none">{'Ẩn lịch sử mua hàng'}</span>
                                                                            :
                                                                            <span type="button" onClick={() => setShowHistory(!showHistory)} className="text-dieucosmetics text-decoration-none">{'Lịch sử mua hàng'}</span>
                                                                    }
                                                                </th>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <th className="th-dieucosmetics ">
                                                                    <span type="button" onClick={() => { setShowFormChangePassword(!showFormChangePassword) }} className="text-dieucosmetics">{showFormChangePassword ? 'Ẩn đổi mật khẩu' : 'Đổi mật khẩu'}</span>
                                                                </th>
                                                                <td></td>
                                                            </tr>

                                                            {
                                                                showFormChangePassword &&
                                                                <>
                                                                    <tr>
                                                                        <th className="th-dieucosmetics ">Mật khẩu hiện tại :</th>
                                                                        <td className="input-field fs-6">
                                                                            <Field
                                                                                type={showPassword ? "text" : "password"}
                                                                                placeholder="Nhập mật khẩu hiện tại" className="input-login" name="oldPassword" />
                                                                            {
                                                                                showPassword ? <span type='button' onClick={() => { setShowPassword(!showPassword) }}
                                                                                    className="bi bi-eye-slash me-2 "></span> :
                                                                                    <span type='button' onClick={() => { setShowPassword(!showPassword) }}
                                                                                        className="bi bi-eye me-2"></span>
                                                                            }</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th></th>
                                                                        <td><span className="text-danger fs-6" id="oldPasswordErr"></span></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="th-dieucosmetics ">Mật khẩu mới :</th>
                                                                        <td className="input-field fs-6">
                                                                            <Field
                                                                                type={showNewPassword ? "text" : "password"}
                                                                                placeholder="Nhập mật khẩu mới" className="input-login" name="newPassword" />
                                                                            {
                                                                                showNewPassword ? <span type='button' onClick={() => { setShowNewPassword(!showNewPassword) }}
                                                                                    className="bi bi-eye-slash me-2 "></span> :
                                                                                    <span type='button' onClick={() => { setShowNewPassword(!showNewPassword) }}
                                                                                        className="bi bi-eye me-2"></span>
                                                                            }</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th></th>
                                                                        <td><span className="text-danger fs-6" id="newPasswordErr"></span></td>
                                                                    </tr>
                                                                    <tr >
                                                                        <th className="th-dieucosmetics ">Mật khẩu xác nhận :</th>

                                                                        <td className="input-field fs-6">
                                                                            <Field
                                                                                type={showPasswordConfirm ? "text" : "password"}
                                                                                placeholder="Nhập mật khẩu xác nhận" className="input-login" name="confirmPassword" />
                                                                            {
                                                                                showPasswordConfirm ? <span type='button' onClick={() => { setShowPasswordConfirm(!showPasswordConfirm) }}
                                                                                    className="bi bi-eye-slash me-2 "></span> :
                                                                                    <span type='button' onClick={() => { setShowPasswordConfirm(!showPasswordConfirm) }}
                                                                                        className="bi bi-eye me-2"></span>
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th></th>
                                                                        <td><span className="text-danger fs-6" id="confirmPasswordErr"></span></td>
                                                                    </tr>
                                                                    <tr >
                                                                        <th style={{ height: '60px' }}></th>
                                                                        <th className="fs-6"><button type="submit" className="button-buy">Xác nhận</button></th>
                                                                    </tr>
                                                                </>
                                                            }

                                                        </tbody>
                                                    </table>
                                                </Form>
                                            </Formik>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        showHistory &&
                            customerDetail?.oderProducts.length === 0 ?
                            <div className="row mx-0 px-5 pb-5">
                                <h2 className="text-center text-danger">Bạn chưa có lịch sử mua hàng</h2>
                            </div>
                            :
                            showHistory &&
                            <div className="row mx-0 px-5 pb-5">
                                <div>
                                    <h3 className="text-center text-dieucosmetics">LỊCH SỬ MUA HÀNG</h3>
                                </div>
                                <div className="mt-3">
                                    <table className="w-100">
                                        <thead>
                                            <tr className="text-center">
                                                <th>STT</th>
                                                <th>Mã đơn hàng</th>
                                                <th>Ngày mua hàng</th>
                                                <th>Tổng đơn hàng</th>
                                                <th>Chi tiết đơn hàng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                historyList.map((element, index) => (
                                                    <tr className="text-center" key={index}>
                                                        <td scope="row" style={{ height: '60px' }}>{index + 1}</td>
                                                        <td>{element.code}</td>
                                                        <td> <span className="mx-3">{format(new Date(element.oderDate), "HH:mm:ss")}</span>{format(new Date(element.oderDate), "dd/MM/yyyy")}</td>
                                                        <td>{(+element.totalPay).toLocaleString(
                                                            "vi-VN",
                                                            { style: "currency", currency: "VND" }
                                                        )}</td>
                                                        <td>
                                                            <i type="button" onClick={() => handleModalDetail(element.oderDetailSet)} className="bi bi-info text-dieucosmetics fs-2" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    <div className="mt-2 d-flex justify-content-center">
                                        <ReactPaginate
                                            previousLabel="Trước"
                                            nextLabel="Sau"
                                            pageCount={pageCount}
                                            onPageChange={(event) => handlePageClick(event.selected)}
                                            containerClassName="pagination"
                                            previousClassName="page-item"
                                            previousLinkClassName="page-link"
                                            nextClassName="page-item"
                                            nextLinkClassName="page-link"
                                            pageClassName="page-item"
                                            pageLinkClassName="page-link"
                                            activeClassName="active"
                                            activeLinkClassName="page-link"
                                        // disabledLinkClassName="d-none"
                                        // forcePage={currentPage}
                                        />
                                    </div>
                                </div>
                            </div>
                    }
                </div>
                :
                    <div>
                    <img src="https://web4s.vn/uploads/plugin/news/581/403-forbidden.png" width={'100%'} height={'100%'}/>
                    </div>
            }

            {
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                    <div className="modal-dialog modal-dialog-centered modal-lg" >
                        <div className="modal-content" >
                            <div className="modal-header bg-home ">
                                <h1 className="modal-title fs-5 ms-2 text-white " id="exampleModalLabel">CHI TIẾT ĐƠN HÀNG</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body" >
                                <div>
                                    <table className="w-100 text-secondary">
                                        <thead>
                                            <tr className="text-center">
                                                <th scope="row">STT</th>
                                                <th>Hình ảnh</th>
                                                <th>Mã sản phẩm</th>
                                                <th>Dung tích</th>
                                                <th>Đơn giá</th>
                                                <th>Số lượng</th>
                                                <th>Tổng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                detailCartList?.map((element, index) => (
                                                    <tr onClick={() => handleProductDetail(element.product.id)} key={index} className="text-center click-detail-product">
                                                        <td scope="row" style={{ height: '100px' }}>{index + 1}</td>
                                                        <td><img width={'50px'} src={element.product.imageSet[0].name} /></td>
                                                        <td>{element.product.code}</td>
                                                        <td>{element?.product?.capacityProductSet[0]?.capacity?.name}</td>
                                                        <td>{(+element.price).toLocaleString(
                                                            "vi-VN",
                                                            { style: "currency", currency: "VND" }
                                                        )}</td>
                                                        <td>{element.quantity}</td>
                                                        <td>{(+element.subtotal).toLocaleString(
                                                            "vi-VN",
                                                            { style: "currency", currency: "VND" }
                                                        )}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}