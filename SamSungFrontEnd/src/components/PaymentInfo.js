import React, { useContext, useEffect, useRef, useState } from "react";
import queryString from "query-string";
import { format } from "date-fns";
import cartService from "../service/login/cart/cartService";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { QuantityContext } from "./QuantityContext";
export default function PaymentInfo() {
  const [paymentInfo, setPaymentInfo] = useState({
    vnp_Amount: "",
    vnp_BankCode: "",
    customerName: "",
    vnp_CardType: "",
    vnp_OrderInfo: "",
    vnp_PayDate: "",
    vnp_TransactionNo: "",
  });
  const [showFormPayment, setShowFormPayment] = useState(true)
  const customerName = localStorage.getItem('customerName')
  const url = window.location.href
  const handleFormatDateTime = (dateTimeString) => {
    const parsedDate = new Date(
      dateTimeString.slice(0, 4),
      dateTimeString.slice(4, 6) - 1,
      dateTimeString.slice(6, 8),
      dateTimeString.slice(8, 10),
      dateTimeString.slice(10, 12),
      dateTimeString.slice(12, 14)
    );
    const formattedDate = format(parsedDate, "dd/MM/yyyy");
    const formattedTime = format(parsedDate, "HH:mm:ss");
    return formattedDate + " " + formattedTime;
  };
  useEffect(() => {
    document.title = "Thanh Toán";
  }, [])
  useEffect(() => {
    const parsed = queryString.parse(url);
    const str = "http://localhost:3000/payment-info?vnp_Amount";
    const dateTimeString = parsed.vnp_PayDate;
    const formattedDateTime = handleFormatDateTime(dateTimeString);
    const amount = parsed[str].slice(0, -2);
    if (parsed.vnp_TransactionNo !== "0") {
      setPaymentInfo({
        vnp_Amount: +amount,
        vnp_BankCode: parsed.vnp_BankCode,
        vnp_CardType: parsed.vnp_CardType,
        vnp_OrderInfo: parsed.vnp_OrderInfo,
        vnp_PayDate: formattedDateTime,
        vnp_TransactionNo: parsed.vnp_TransactionNo,
      });
    }
  }, [url]);
  const handleUpdateCart = async () => {
    const cartIds = JSON.parse(localStorage.getItem('cartIds'))
    const phoneNumber = localStorage.getItem('phoneNumber')
    const address = localStorage.getItem('address')
    const valuePayment = {
      phoneNumber: phoneNumber,
      shippingAddress: address,
      totalPay: paymentInfo.vnp_Amount,
      cartIds: cartIds,
      paymentMethod: 'VNPay'
    }
    try {
      await cartService.payment(valuePayment)
      localStorage.removeItem('cartIds')
      localStorage.removeItem('phoneNumber')
      localStorage.removeItem('address')
      localStorage.removeItem('paymentMethod')
      localStorage.removeItem('valueCart')
    } catch (error) {
      console.log(error);
      if (error.response.data.message) {
        localStorage.removeItem('cartIds')
        localStorage.removeItem('phoneNumber')
        localStorage.removeItem('address')
        localStorage.removeItem('paymentMethod')
        localStorage.removeItem('valueCart')
        setShowFormPayment(false)
        Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  };

  useEffect(() => {
    document.title = "Thanh toán";
  }, []);
  useEffect(() => {
    if (paymentInfo.vnp_Amount) {
      handleUpdateCart();
    }
  }, [paymentInfo.vnp_Amount]);
  if (!url) {
    window.location.href =
      "https://sandbox.vnpayment.vn/paymentv2/Payment/Error.html?backtoken=e507d3062e1048c39d8f3fa82c2f1a26";
  }
  console.log(paymentInfo);
  return (
    <>
      {
        paymentInfo.vnp_Amount && showFormPayment ?
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
                      {paymentInfo.vnp_TransactionNo}
                    </td>
                  </tr>
                  <tr>
                    <th className="fs-5 pt-3 pb-3">Khách hàng:</th>
                    <td className="fs-5 text-end pt-3 pb-3">
                      {customerName}
                    </td>
                  </tr>
                  <tr>
                    <th className="fs-5 pt-3 pb-3">Ngày thanh toán:</th>
                    <td className="fs-5 text-end pt-3 pb-3">
                      {paymentInfo.vnp_PayDate}
                    </td>
                  </tr>
                  <tr>
                    <th className="fs-5 pt-3 pb-3">Tổng tiền:</th>
                    <td className="fs-5 text-end pt-3 pb-3">
                      {paymentInfo.vnp_Amount.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                  </tr>
                  <tr>
                    <th className="fs-5 pt-3 pb-3">Ngân hàng:</th>
                    <td className="fs-5 text-end pt-3 pb-3">
                      {paymentInfo.vnp_BankCode}
                    </td>
                  </tr>
                  <tr>
                    <th className="fs-5 pt-3 pb-3">Loại thẻ:</th>
                    <td className="fs-5 text-end pt-3 pb-3">
                      {paymentInfo.vnp_CardType}
                    </td>
                  </tr>
                  <tr>
                    <th className="fs-5 pt-3 pb-3">Nội dung thanh toán:</th>
                    <td className="fs-5 text-end pt-3 pb-3">
                      {paymentInfo.vnp_OrderInfo}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          :
          <div className="d-flex justify-content-center flex-column align-items-center 100-vh mt-5">
            <img
              src={"icon-that-bai.png"}
              alt=""
              width={"5%"}
            />
            <h1 className="text-danger">Thanh toán thất bại</h1>
          </div>
      }
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
  );
}