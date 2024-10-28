import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import loginService from "../service/login/loginService";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import * as Yup from 'yup'
import Header from "./Header";
import Footer from "./Footer";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
    const [showErr,setShowErr] = useState(false)
    const [showErrUsername,setShowErrUsername] = useState(false)
    const navigate = useNavigate()
    const getMinDate = () => {
        const today = new Date();
        return new Date(
          today.getFullYear() - 15,
          today.getMonth(),
          today.getDate()
        );
      };
    
      useEffect(() => {
        document.title = "Đăng ký tài khoản";
      }, []);
    
    return (
        <>
            <Header></Header>
            <div className="login-body" style={{marginTop: "200px"}}>
                <div className="padding-register">
                    <Formik
                        initialValues={{
                            name: '',
                            dateOfBirth: '',
                            gender: '',
                            phoneNumber: '',
                            address: '',
                            email: '',
                            username: '',
                            password: '',
                            confirmPassword: '',
                            roles: ["user"]
                        }}
                        validationSchema={Yup.object({
                            name: Yup.string().required('Không được bỏ trống')
                            .matches(/^([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/,'Tên phải đúng định dạng. VD: Nguyễn Văn A')
                            .min(5,'Ký tự phải nhiều hơn 5')
                            .max(30,'Ký tự phải ít hơn 30'),
                            dateOfBirth: Yup.date().required('Không được bỏ trống').max(getMinDate(),'Người dùng đăng ký tài khoản phải từ 15 tuổi trở lên'),
                            gender: Yup.string().required('Không được bỏ trống'),
                            phoneNumber: Yup.string().required('Không được bỏ trống')
                            .matches(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,'Nhập đúng định dạng SDT VD: 0903.XXX.XXX (X là chữ số)'),
                            address: Yup.string().required('Không được bỏ trống'),
                            email: Yup.string().required('Không được bỏ trống').email('Nhập đúng định dạng email'),
                            username: Yup.string().required('Không được bỏ trống')
                            .min(5,'Ký tự phải nhiều hơn 5')
                            .max(30,'Ký tự phải ít hơn 30'),
                            password: Yup.string().required('Không được bỏ trống')
                            .min(5,'Ký tự phải nhiều hơn 5')
                            .max(30,'Ký tự phải ít hơn 30'),
                            confirmPassword: Yup.string().required('Không được bỏ trống')
                            .min(5,'Ký tự phải nhiều hơn 5')
                            .max(30,'Ký tự phải ít hơn 30'),
                        })}
                        onSubmit={(value) => {
                            const register = async () => {
                                try {
                                    await loginService.register(value)
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Đăng ký tài khoản thành công',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    navigate('/login')
                                } catch (error) {
                                    console.log(error);
                                    if(error.response.data.message==='Email đã tồn tại'){
                                        setShowErr(true)
                                    }else{
                                        setShowErr(false)
                                    }
                                    if(error.response.data.message==='Tài khoản đã tồn tại'){
                                        setShowErrUsername(true)
                                    }else{
                                        setShowErrUsername(false)
                                    }
                                }
                            }
                            register()
                        }}
                    >
                        <Form className="">
                            <div className="wrapper-1 bg-white mt-0">
                                <div className="text-center">
                                    <img
                                        width='150px'
                                        src="dieucosmetics-logo.png"
                                        alt="" /></div>
                                <div className="h4 text-secondary text-center pt-2">Đăng Ký Tài Khoản</div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group mt-2">
                                            <label htmlFor="name" className="text-register">Họ và tên :</label>
                                            <div className="input-field-1">
                                                <Field type="text" className="input-login " name="name" id="name" placeholder="Nhập họ và tên" />
                                            </div>
                                            <div>
                                                <ErrorMessage component='span' className="text-danger" name='name' />
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
                                        <div className="form-group mt-2">
                                            <label className="text-register">Giới tính :</label>
                                            <div className="mt-2">
                                                <div className="form-check form-check-inline ">
                                                    <Field className="form-check-input" type="radio" name="gender" id="inlineRadio1" value="false" />
                                                    <label className="form-check-label text-register" htmlFor="inlineRadio1">Nam</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <Field className="form-check-input" type="radio" name="gender" id="inlineRadio2" value="true" />
                                                    <label className="form-check-label text-register" htmlFor="inlineRadio2">Nữ</label>
                                                </div>
                                                <div>
                                                    <ErrorMessage component='span' className="text-danger" name='gender' />
                                                </div>
                                            </div>
                                        </div>
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
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group mt-2">
                                            <label htmlFor="username" className="text-register">Tài khoản :</label>
                                            <div className="input-field-1">
                                                <Field type="text" className="input-login" name="username" id="username" placeholder="Nhập tài khoản" />
                                            </div>
                                            <div>
                                                {
                                                    showErrUsername ? <span className="text-danger">Tài khoản đã tồn tại</span> : <ErrorMessage component='span' className="text-danger" name='username' />
                                                }
                                                
                                            </div>
                                        </div>

                                        <div className="form-group mt-2">
                                            <label className="text-register">Mật khẩu :</label>
                                            <div className="input-field-1 ">
                                                <Field type={showPassword ? "text" : "password"} placeholder="Nhập mật khẩu" className="input-login" name="password" />
                                                {
                                                    showPassword ? <span type='button' onClick={() => { setShowPassword(!showPassword) }}
                                                        className="bi bi-eye-slash me-2 "></span> :
                                                        <span type='button' onClick={() => { setShowPassword(!showPassword) }}
                                                            className="bi bi-eye me-2"></span>
                                                }

                                            </div>
                                            <div>
                                                <ErrorMessage component='span' className="text-danger" name='password' />
                                            </div>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label className="text-register">Xác nhận mật khẩu :</label>
                                            <div className="input-field-1 ">
                                                <Field type={showPasswordConfirm ? "text" : "password"} placeholder="Nhập mật khẩu xác nhận" className="input-login" name="confirmPassword" />
                                                {
                                                    showPasswordConfirm ? <span type='button' onClick={() => { setShowPasswordConfirm(!showPasswordConfirm) }}
                                                        className="bi bi-eye-slash me-2 "></span> :
                                                        <span type='button' onClick={() => { setShowPasswordConfirm(!showPasswordConfirm) }}
                                                            className="bi bi-eye me-2"></span>
                                                }

                                            </div>
                                            <div>
                                                <ErrorMessage component='span' className="text-danger" name='confirmPassword' />
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
                                    <div className="d-flex justify-content-center mt-4">
                                        <NavLink to='/login' className="btn btn-block text-center mx-2">Hủy</NavLink>
                                        <button type="submit" className="btn btn-block text-center mx-1">Xác nhận</button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
                <Footer></Footer>
            </div>
        </>
    )
}