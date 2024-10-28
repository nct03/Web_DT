import { Formik, Form, Field } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import loginService from "../service/login/loginService";
import { useEffect, useState } from "react";
import { AvatarContext } from "./AvatarContext";
import { useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [showFormResetPass, setShowFormResetPass] = useState(false);
    const [showFormEmail, setShowFormEmail] = useState(false);
    const [mail, setMail] = useState('');
    const [countdown, setCountdown] = useState(0);
    const [submit, setSubmit] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { setAvatar } = useContext(AvatarContext);

    const handleShowFromEmail = () => setShowFormEmail(true);
    const handleHideEmail = () => setShowFormEmail(false);
    const handleHideOtp = () => setShowOtpModal(false);
    const handleHideResetPass = () => setShowFormResetPass(false);
    const handleAgainSendCode = async () => {
        setSubmit(true);
        try {
            await loginService.forgotPassword({ email: mail });
            setSubmit(false);
            setCountdown(60);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setAvatar('');
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCountdown(countdown => countdown - 1);
        }, 1000);
        if (countdown === 0) {
            clearInterval(intervalId);
        }
        return () => clearInterval(intervalId);
    }, [countdown]);

    useEffect(() => {
        document.title = "Đăng Nhập";
    }, []);

    return (
        <>
            <Header />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: '#f5f5f5',
                marginTop: "200px",
                paddingTop: '100px', // Điều chỉnh khoảng cách trên cùng
                padding: '0 20px',
                opacity: showFormEmail || showOtpModal || showFormResetPass ? 0.7 : 1
            }}>
                <div style={{
                    backgroundColor: '#ffffff',
                    padding: '30px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    maxWidth: '50%', // Chiếm nửa trang
                    width: '100%',
                    boxSizing: 'border-box'
                }}>
                    <Formik
                        initialValues={{
                            username: '',
                            password: ''
                        }}
                        onSubmit={async (values) => {
                            try {
                                const res = await loginService.login(values);
                                navigate('/');
                                localStorage.setItem('token', res.data.token);
                                localStorage.setItem('role', res.data.roles[0].authority);
                            } catch (error) {
                                const err = error.response.data;
                                document.getElementById("usernameError").innerText = err.username || '';
                                document.getElementById("passwordError").innerText = err.password || '';
                            }
                        }}
                    >
                        <Form>
                            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                <img style={{height:"150px", width:"150px"}} src="https://i.ibb.co/fHJc6Fc/logo.png" alt="Logo" />
                                <h2 style={{ color: '#333', margin: '10px 0' }}>Đăng Nhập</h2>
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>Tài khoản:</label>
                                <Field type="text" style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    fontSize: '14px'
                                }} placeholder="Nhập tài khoản" name="username" />
                                <div style={{ color: 'red', marginTop: '5px' }}>
                                    <span id="usernameError"></span>
                                </div>
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>Mật khẩu:</label>
                                <div style={{ position: 'relative' }}>
                                    <Field type={showPassword ? "text" : "password"} style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        border: '1px solid #ddd',
                                        fontSize: '14px'
                                    }} placeholder="Nhập mật khẩu" name="password" />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: '10px',
                                            transform: 'translateY(-50%)',
                                            border: 'none',
                                            background: 'transparent',
                                            cursor: 'pointer',
                                            fontSize: '18px',
                                            color: '#666'
                                        }}
                                    >
                                        {showPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                                    </button>
                                </div>
                                <div style={{ color: 'red', marginTop: '5px' }}>
                                    <span id="passwordError"></span>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                                <a href="#" onClick={handleShowFromEmail} style={{ color: '#007bff', textDecoration: 'none' }}>Quên mật khẩu?</a>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <NavLink to='/' style={{
                                    textAlign: 'center',
                                    padding: '12px 20px',
                                    backgroundColor: '#f0f0f0',
                                    color: '#333',
                                    textDecoration: 'none',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    fontSize: '14px'
                                }}>Quay lại</NavLink>
                                <button type="submit" style={{
                                    padding: '12px 20px',
                                    backgroundColor: '#007bff',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '14px'
                                }}>Đăng nhập</button>
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <span style={{ color: '#666' }}>Bạn chưa có tài khoản? </span>
                                <NavLink to={'/register'} style={{ color: '#007bff', textDecoration: 'none' }}>Đăng ký</NavLink>
                            </div>
                            <div style={{ marginTop: '30px', textAlign: 'center' }}>
                                {/*<NavLink to='http://localhost:8080/oauth2/authorization/google' style={{*/}
                                {/*    display: 'inline-block',*/}
                                {/*    width: '100%',*/}
                                {/*    padding: '8px', // Giảm padding*/}
                                {/*    marginBottom: '10px',*/}
                                {/*    backgroundColor: '#db4437',*/}
                                {/*    color: '#fff',*/}
                                {/*    textAlign: 'center',*/}
                                {/*    borderRadius: '8px',*/}
                                {/*    textDecoration: 'none',*/}
                                {/*    fontSize: '12px' // Giảm font-size*/}
                                {/*}}>*/}
                                {/*    <img src={'google-logo.png'} alt="Google" style={{ verticalAlign: 'middle', marginRight: '8px' }} />Đăng nhập bằng Google*/}
                                {/*</NavLink>*/}
                                {/*<NavLink to='http://localhost:8080/oauth2/authorization/facebook' style={{*/}
                                {/*    display: 'inline-block',*/}
                                {/*    width: '100%',*/}
                                {/*    padding: '8px', // Giảm padding*/}
                                {/*    backgroundColor: '#3b5998',*/}
                                {/*    color: '#fff',*/}
                                {/*    textAlign: 'center',*/}
                                {/*    borderRadius: '8px',*/}
                                {/*    textDecoration: 'none',*/}
                                {/*    fontSize: '12px' // Giảm font-size*/}
                                {/*}}>*/}
                                {/*    <img src={'fb-logo.png'} alt="Facebook" style={{ verticalAlign: 'middle', marginRight: '8px' }} />Đăng nhập bằng Facebook*/}
                                {/*</NavLink>*/}
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
            {
                showFormEmail && (
                    <Formik
                        initialValues={{ email: '' }}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                await loginService.forgotPassword(values);
                                setShowFormEmail(false);
                                setShowOtpModal(true);
                            } catch (error) {
                                console.log(error);
                            }
                            setSubmitting(false);
                        }}
                    >
                        <Form>
                            <div style={{
                                position: 'fixed',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: '#fff',
                                padding: '20px',
                                borderRadius: '12px',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                                zIndex: 1000
                            }}>
                                <h2>Nhập email của bạn</h2>
                                <Field type="email" name="email" placeholder="Email" style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    fontSize: '14px',
                                    marginBottom: '10px'
                                }} />
                                <div style={{ color: 'red', marginBottom: '10px' }}>
                                    <span id="emailError"></span>
                                </div>
                                <button type="submit" style={{
                                    padding: '12px 20px',
                                    backgroundColor: '#007bff',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '14px'
                                }}>Gửi mã xác nhận</button>
                                <button type="button" onClick={handleHideEmail} style={{
                                    padding: '12px 20px',
                                    backgroundColor: '#f0f0f0',
                                    color: '#333',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    marginLeft: '10px'
                                }}>Hủy</button>
                            </div>
                        </Form>
                    </Formik>
                )
            }
            {
                showOtpModal && (
                    <Formik
                        initialValues={{ code: '' }}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                await loginService.verifyCode(values);
                                setShowOtpModal(false);
                                setShowNewPassword(true);
                            } catch (error) {
                                console.log(error);
                            }
                            setSubmitting(false);
                        }}
                    >
                        <Form>
                            <div style={{
                                position: 'fixed',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: '#fff',
                                padding: '20px',
                                borderRadius: '12px',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                                zIndex: 1000
                            }}>
                                <h2>Nhập mã OTP</h2>
                                <Field type="text" name="code" placeholder="Mã OTP" style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    fontSize: '14px',
                                    marginBottom: '10px'
                                }} />
                                <div style={{ color: 'red', marginBottom: '10px' }}>
                                    <span id="otpError"></span>
                                </div>
                                <button type="submit" style={{
                                    padding: '12px 20px',
                                    backgroundColor: '#007bff',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '14px'
                                }}>Xác nhận</button>
                                <button type="button" onClick={handleHideOtp} style={{
                                    padding: '12px 20px',
                                    backgroundColor: '#f0f0f0',
                                    color: '#333',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    marginLeft: '10px'
                                }}>Hủy</button>
                            </div>
                        </Form>
                    </Formik>
                )
            }
            {
                showNewPassword && (
                    <Formik
                        initialValues={{ newPassword: '', confirmPassword: '' }}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                await loginService.resetPassword(values);
                                setShowNewPassword(false);
                                navigate('/');
                            } catch (error) {
                                console.log(error);
                            }
                            setSubmitting(false);
                        }}
                    >
                        <Form>
                            <div style={{
                                position: 'fixed',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: '#fff',
                                padding: '20px',
                                borderRadius: '12px',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                                zIndex: 1000
                            }}>
                                <h2>Đặt lại mật khẩu mới</h2>
                                <div style={{ marginBottom: '10px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>Mật khẩu mới:</label>
                                    <Field type={showNewPassword ? "text" : "password"} name="newPassword" placeholder="Mật khẩu mới" style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        border: '1px solid #ddd',
                                        fontSize: '14px'
                                    }} />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: '10px',
                                            transform: 'translateY(-50%)',
                                            border: 'none',
                                            background: 'transparent',
                                            cursor: 'pointer',
                                            fontSize: '18px',
                                            color: '#666'
                                        }}
                                    >
                                        {showNewPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                                    </button>
                                </div>
                                <div style={{ marginBottom: '10px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>Nhập lại mật khẩu:</label>
                                    <Field type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Nhập lại mật khẩu" style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        border: '1px solid #ddd',
                                        fontSize: '14px'
                                    }} />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: '10px',
                                            transform: 'translateY(-50%)',
                                            border: 'none',
                                            background: 'transparent',
                                            cursor: 'pointer',
                                            fontSize: '18px',
                                            color: '#666'
                                        }}
                                    >
                                        {showConfirmPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                                    </button>
                                </div>
                                <button type="submit" style={{
                                    padding: '12px 20px',
                                    backgroundColor: '#007bff',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '14px'
                                }}>Đặt lại mật khẩu</button>
                                <button type="button" onClick={handleHideResetPass} style={{
                                    padding: '12px 20px',
                                    backgroundColor: '#f0f0f0',
                                    color: '#333',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    marginLeft: '10px'
                                }}>Hủy</button>
                            </div>
                        </Form>
                    </Formik>
                )
            }
            <Footer />
        </>
    );
}
