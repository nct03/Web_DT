import { ErrorMessage, Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import customerService from "../service/login/customer/customerService"
import loginService from './../service/login/loginService';
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../FireBase";
import { is } from "date-fns/locale";
import Header from './Header';
import { AvatarContext } from "./AvatarContext";
import { useContext } from "react";
import { RotatingLines } from "react-loader-spinner";
import * as Yup from 'yup'
export default function UpdateCustomer() {
    const [customerDetail, setCustomerDetail] = useState()
    const token = localStorage.getItem('token')
    const [selectedFile, setSelectedFile] = useState(null);
    const [firebaseImg, setImg] = useState(null);
    const [isChangeImg, setIsChangeImg] = useState(false);
    const navigate = useNavigate()
    const { setAvatar } = useContext(AvatarContext);
    const [avatarDetail, setAvatarDetail] = useState('')
    const [show403Img, setShow403Img] = useState(false)
    const [showErr, setShowErr] = useState(false)
    const [avatarErr, setAvatarErr] = useState(false)
    const getMinDate = () => {
        const today = new Date();
        return new Date(
            today.getFullYear() - 15,
            today.getMonth(),
            today.getDate()
        );
    };
    useEffect(() => {
        const detail = async () => {
            try {
                const res = await customerService.detail()
                setCustomerDetail(res.data)
                setShow403Img(false)
            } catch (error) {
                console.log(error)
                if (error.response.status === 403) {
                    setShow403Img(true)
                }
            }   
        }
        detail()
    }, [token])
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file instanceof File || file instanceof Blob) { 
            const extension = file.name
            const isImage = /\.(jpg|jpeg|png|gif)$/i.test(extension);
            !isImage ? setAvatarErr(true) : setAvatarErr(false)
            setSelectedFile(file);
            setIsChangeImg(true)
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = reader.result;
                console.log(imageUrl);
                setAvatarDetail(imageUrl);
            };
            reader.readAsDataURL(file);
        } else {
            console.error('Invalid file or blob');
        }
    };
    const handleSubmitAsync = async () => {
        return new Promise((resolve, reject) => {
            const file = selectedFile;
            if (!file) return reject("No file selected");
            const extension = file.name
            const isImage = /\.(jpg|jpeg|png|gif)$/i.test(extension);
             !isImage ? setAvatarErr(true) : setAvatarErr(false)
             if(!isImage) return console.log("Wrong image format")
            const storageRef = ref(storage, `files/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                },
                (error) => {
                    reject(error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setImg(downloadURL);
                    resolve(downloadURL);
                }
            );
        });
    }
    useEffect(() => {
        document.title = "Chỉnh Sửa Thông Tin Cá Nhân";
    }, [])
    useEffect(() => {
        setAvatar(customerDetail?.avatar)
        setAvatarDetail(customerDetail?.avatar)
    }, [customerDetail?.avatar])
    if (!customerDetail && show403Img === false) {
        return null
    }
    console.log(firebaseImg);
    return (
        <>
            {
                show403Img === false ?
                    <Formik
                        initialValues={{
                            id: customerDetail?.id,
                            name: customerDetail?.name,
                            gender: customerDetail?.gender,
                            dateOfBirth: customerDetail?.dateOfBirth,
                            email: customerDetail?.email,
                            phoneNumber: customerDetail?.phoneNumber,
                            address: customerDetail?.address,
                            avatar: customerDetail?.avatar,
                        }}
                        validationSchema={Yup.object({
                            name: Yup.string().required('Không được bỏ trống')
                                .matches(/^([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/, 'Tên phải đúng định dạng. VD: Nguyễn Văn A')
                                .min(5, 'Ký tự phải nhiều hơn 5')
                                .max(30, 'Ký tự phải ít hơn 30'),
                            dateOfBirth: Yup.date().required('Không được bỏ trống').max(getMinDate(), 'Người dùng đăng ký tài khoản phải từ 15 tuổi trở lên'),
                            gender: Yup.string().required('Không được bỏ trống'),
                            phoneNumber: Yup.string().required('Không được bỏ trống')
                                .matches(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/, 'Nhập đúng định dạng SDT VD: 0903.XXX.XXX (X là chữ số)'),
                            address: Yup.string().required('Không được bỏ trống'),
                            email: Yup.string().required('Không được bỏ trống').email('Nhập đúng định dạng email'),
                        })}
                        onSubmit={(value, { setSubmitting }) => {
                            const editCustomer = async () => {
                                try {
                                    if (isChangeImg) {
                                        const newValues = { ...value, avatar: firebaseImg };
                                        newValues.avatar = await handleSubmitAsync();
                                        await customerService.update(newValues)
                                    } else {
                                        await customerService.update(value)
                                        setIsChangeImg(false)
                                    }
                                    navigate('/customer/detail')
                                    setSubmitting(false)
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Chỉnh sửa thông tin thành công',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                } catch (error) {
                                    console.log(error);
                                    if (error) {
                                        setSubmitting(false)
                                    }
                                    if (error.response.data.message === 'Email đã tồn tại') {
                                        setShowErr(true)
                                    } else {
                                        setShowErr(false)
                                    }
                                }
                            }
                            editCustomer()
                        }}
                    >
                        {({ values, isSubmitting }) => (
                            <Form>
                                <div style={{
                                    marginTop: 100
                                }}>
                                    <div className="row mx-0 mt-5 p-5 ">
                                        <div>
                                            <NavLink to={'/'} className="bi bi-house text-secondary fs-4 text-decoration-none"><span className="ms-2 fw-normal fs-5">Trang chủ</span></NavLink>
                                        </div>
                                        <div className="container p-5 shadow-cosmetics-1 mt-3 bg-white">
                                            <div className="row">
                                                <div className="col-3 mt-4">
                                                    <div className='position-relative'>
                                                        {
                                                            avatarErr ? <div>
                                                                <h5 className="text-danger"  width='100%' height='100%'>Sai định dạng ảnh, phải có dạng đuôi .jpg, .jpeg, .png</h5>
                                                            </div> :
                                                                <div className="avatar">
                                                                    <img src={avatarDetail}
                                                                        className="border-avatar rounded-circle " width='100%' height='100%' alt="avatar" />
                                                                </div>
                                                        }
                                                        <div className={!avatarErr && "border-camera"}>
                                                            <label htmlFor="avatar" type='button' className="bi bi-camera-fill fs-2"></label>
                                                            <input type="file"
                                                                onChange={handleFileSelect}
                                                                className='d-none' id='avatar' name='avatar' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-9">
                                                    <div className="row ms-3 px-3">
                                                        <h2 className="text-center text-secondary bg-home py-2">CHỈNH SỬA THÔNG TIN CÁ NHÂN</h2>
                                                        <div className="col-12 px-0">
                                                            <div className="bg-white mt-0">
                                                                <div className="row">
                                                                    <div className="col-6">
                                                                        <div className="form-group mt-2">
                                                                            <label className="text-register">Mã khách hàng :</label>
                                                                            <div className="input-field-1">
                                                                                <span className="input-login text-danger fw-bold" >{customerDetail?.code}</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group mt-2">
                                                                            <label htmlFor="name" className="text-register">Họ và tên :</label>
                                                                            <div className="input-field-1">
                                                                                <Field type="text" className="input-login" name="name" id="name" placeholder="Nhập họ và tên" />
                                                                            </div>
                                                                            <div>
                                                                                <ErrorMessage component='span' className="text-danger" name='name' />
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group mt-2">
                                                                            <label className="text-register">Giới tính :</label>
                                                                            <div className="mt-2">
                                                                                <div className="form-check form-check-inline ">
                                                                                    <Field className="form-check-input" type="radio" name="gender" id="inlineRadio1" value="false"
                                                                                        checked={values.gender === false ? true : null} />
                                                                                    <label className="form-check-label text-register" htmlFor="inlineRadio1">Nam</label>
                                                                                </div>
                                                                                <div className="form-check form-check-inline">
                                                                                    <Field className="form-check-input" type="radio" name="gender" id="inlineRadio2" value="true"
                                                                                        checked={values.gender === true ? true : null} />
                                                                                    <label className="form-check-label text-register" htmlFor="inlineRadio2">Nữ</label>
                                                                                </div>
                                                                            </div>
                                                                            <div>
                                                                                <ErrorMessage component='span' className="text-danger" name='gender' />
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group mt-2">
                                                                            <label htmlFor="dateOfBirth" className="text-register">Ngày sinh :</label>
                                                                            <div className="input-field-1">
                                                                                <Field type="date" className="input-login" name="dateOfBirth" id="dateOfBirth" />
                                                                            </div>
                                                                            <div>
                                                                                <ErrorMessage component='span' className="text-danger" name='dateOfBirth' />
                                                                            </div>
                                                                        </div>


                                                                    </div>
                                                                    <div className="col-6">
                                                                        <div className="form-group mt-2">
                                                                            <label htmlFor="email" className="text-register">Email :</label>
                                                                            <div className="input-field-1">
                                                                                <Field type="text" className="input-login" name="email" id="email" placeholder="Nhập Email" />
                                                                            </div>
                                                                            <div>
                                                                                {
                                                                                    showErr ? <span className="text-danger">Email đã tồn tại</span> : <ErrorMessage component='span' className="text-danger" name='email' />
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group mt-2">
                                                                            <label htmlFor="phoneNumber" className="text-register">Số điện thoại :</label>
                                                                            <div className="input-field-1">
                                                                                <Field type="text" className="input-login" name="phoneNumber" id="phoneNumber" placeholder="Nhập số điện thoại" />
                                                                            </div>
                                                                            <div>
                                                                                <ErrorMessage component='span' className="text-danger" name='phoneNumber' />
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group mt-2">
                                                                            <label htmlFor="address" className="text-register" >Địa chỉ :</label>
                                                                            <div className="input-field-1">
                                                                                <Field as="textarea" type="text" style={{
                                                                                    height: '96px'
                                                                                }} className=" input-login" name="address" id="address" placeholder="Nhập địa chỉ" >
                                                                                </Field>
                                                                            </div>
                                                                            <div>
                                                                                <ErrorMessage component='span' className="text-danger" name='address' />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {
                                                                        isSubmitting
                                                                            ?
                                                                            <div className="d-flex justify-content-center mt-4 ms-4">
                                                                                <RotatingLines
                                                                                    strokeColor="grey"
                                                                                    strokeWidth="5"
                                                                                    animationDuration="0.75"
                                                                                    width="30"
                                                                                    visible={true}
                                                                                />
                                                                            </div>
                                                                            :
                                                                            <div className="d-flex justify-content-center mt-4">
                                                                                <NavLink to='/customer/detail' className="button-buy text-decoration-none text-center mx-2">Quay lại</NavLink>
                                                                                <button type={avatarErr ? "button" : "submit"} className="button-buy text-center ms-3">Xác nhận</button>
                                                                            </div>
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div >
                            </Form>
                        )}
                    </Formik>
                    :
                    <div>
                        <img src="https://web4s.vn/uploads/plugin/news/581/403-forbidden.png" width={'100%'} height={'100%'} />
                    </div>
            }
        </>
    )
}