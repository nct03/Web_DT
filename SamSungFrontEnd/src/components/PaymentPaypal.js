import { Link, useNavigate, useParams } from "react-router-dom";
import cartService from "../service/login/cart/cartService";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { format } from "date-fns";
import { useState } from "react";

export default function PaymentPaypal() {

    const param = useParams()
    const navigate = useNavigate()
    const currentDate = new Date();
    const [paypalValue, setPaypalValue] = useState({
        customerName: param.customerName,
        totalPayment: param.totalPayment,
        currentDate: currentDate
    })
    const utcTime = new Date(param.paymentDate);
    const vietnamTime = utcTime.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" });

    // const handleFormatDateTime = (dateTimeString) => {
    //     const parsedDate = new Date(
    //       dateTimeString.slice(0, 4),
    //       dateTimeString.slice(4, 6) - 1,
    //       dateTimeString.slice(6, 8),
    //       dateTimeString.slice(8, 10),
    //       dateTimeString.slice(10, 12),
    //       dateTimeString.slice(12, 14)
    //     );
    //     const formattedDate = format(parsedDate, "dd/MM/yyyy");
    //     const formattedTime = format(parsedDate, "HH:mm:ss");
    //     return formattedDate + " " + formattedTime;
    //   };
    
    useEffect(() => {
        document.title = "Thanh toán";
    }, []);
    return (
        <>
            <div className="d-flex justify-content-center flex-column align-items-center 100-vh mt-5" >
                <img
                    src={"icon-thanh-cong.png"}
                    alt=""
                    width={"5%"}
                />
                <h1 className="text-success">Thanh toán thành công</h1>
                <div>
                    <h2 className="text-center">Thông tin đơn hàng</h2>
                    <table className="table">
                        <thead></thead>
                        <tbody>
                            <tr>
                                <th className="fs-5 pt-3 pb-3">Mã thanh toán đơn hàng:</th>
                                <td className="fs-5 text-end pt-3 pb-3">
                                    {param.paymentCode}
                                </td>
                            </tr>
                            <tr>
                                <th className="fs-5 pt-3 pb-3">Khách hàng:</th>
                                <td className="fs-5 text-end pt-3 pb-3">
                                    {paypalValue.customerName}
                                </td>
                            </tr>
                            <tr>
                                <th className="fs-5 pt-3 pb-3">Ngày thanh toán:</th>
                                <td className="fs-5 text-end pt-3 pb-3">
                                    {vietnamTime}
                                </td>
                            </tr>
                            <tr>
                                <th className="fs-5 pt-3 pb-3">Tổng tiền:</th>
                                <td className="fs-5 text-end pt-3 pb-3">
                                    {(+paypalValue.totalPayment).toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </td>
                            </tr>
                            <tr>
                                <th className="fs-5 pt-3 pb-3">Loại thẻ:</th>
                                <td className="fs-5 text-end pt-3 pb-3">
                                    {'Paypal'}
                                </td>
                            </tr>
                            <tr>
                                <th className="fs-5 pt-3 pb-3">Nội dung thanh toán:</th>
                                <td className="fs-5 text-end pt-3 pb-3">
                                    {'Thanh toan don hang'}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="d-flex justify-content-center" style={{
                marginBottom: '80px'
            }}>
                <Link to={"/product"}
                    className="button-buy text-decoration-none"
                >
                    Tiếp tục mua sắm
                </Link>
            </div>
        </>
    )
}