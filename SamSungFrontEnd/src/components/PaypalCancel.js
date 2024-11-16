import { Link } from "react-router-dom";

export default function PaypalCancel() {
    return (<>
        <div className="d-flex justify-content-center flex-column align-items-center 100-vh mt-5">
            <img
                src={"icon-that-bai.png"}
                alt=""
                width={"5%"}
            />
            <h1 className="text-danger">Thanh toán thất bại</h1>
        </div>
        <div className="d-flex justify-content-center" style={{
            marginBottom: '80px'
        }}>
            <Link to={"/cart"}
                className="button-buy text-decoration-none"
            >
                Tiếp tục mua sắm
            </Link>
        </div>
    </>)
}