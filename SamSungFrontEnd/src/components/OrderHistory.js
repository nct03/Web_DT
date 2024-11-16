import { useState, useEffect } from "react";
import cartService from "../service/login/cart/cartService";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ReactPaginate from "react-paginate";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function OrderHistory() {
  const [orders, setOrders] = useState(null);
  const [orderDetail, setOrderDetail] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const getOrders = async () => {
    try {
      const res = await cartService.getAllOrders(search, page);
      setOrders(res.data.content);
      console.log(res.data);
      setPage(res.data.number);
      setPageCount(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  const formatMoney = (value) => {
    return parseInt(value).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  const handleSearch = () => {
    setPage(0);
    setSearch(document.getElementById("search").value);
  };
  const handlePageClick = async (page) => {
    setPage(page.selected);
    const res = await cartService.getAllOrders(search, page.selected);
    setOrders(res.data.content);
  };
  useEffect(() => {
    getOrders();
  }, [search]);
  return (
    <>
      <div style={{ marginTop: 150, padding: 50 }}>
        <div>
          <Input
            type="text"
            id="search"
            placeholder="Tìm hóa đơn bằng mã code"
          />
          <Button variant="contained" onClick={handleSearch}>
            Tìm kiếm
          </Button>
        </div>
        <h3 style={{ textAlign: "center", padding: 10 }}>Lịch sử đặt hàng</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Code</th>
              <th>Ngày đặt</th>
              <th>Phương thức thanh toán</th>
              <th>Số ĐT</th>
              <th>Địa chỉ nhận</th>
              <th>Tổng giá tiền</th>
              <th>Người đặt</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length == 0 ? (
              <th colSpan={8} style={{ textAlign: "center", padding: 10 }}>
                Không tìm thấy sản phẩm nào.
              </th>
            ) : (
              ""
            )}
            {orders &&
              orders.map((order, index) => {
                return (
                  <>
                    <tr key={index}>
                      <th>{order.code}</th>
                      <td>{order.oderDate}</td>
                      <td>{order.paymentMethod}</td>
                      <td>{order.phoneNumber}</td>
                      <td>{order.shippingAddress}</td>
                      <td>{formatMoney(order.totalPay)}</td>
                      <td>{order.user.name}</td>
                      <td>
                        <Button
                          variant="contained"
                          onClick={() => {
                            handleOpen();
                            setOrderDetail(order);
                          }}
                        >
                          Chi tiết
                        </Button>
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
        <div>
          {orderDetail && orderDetail.oderDetailSet && (
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Chi tiết đơn hàng {orderDetail.code}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <table class="table table-success table-striped">
                    <thead>
                      <th>STT</th>
                      <th>Sản phẩm</th>
                      <th>Mã code</th>
                      <th>Màu</th>
                      <th>Giá</th>
                      <th>Số lượng</th>
                      <th>Thành giá</th>
                    </thead>
                    <tbody>
                      {orderDetail.oderDetailSet.map((order, index) => {
                        return (
                          <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{order.product.name}</td>
                            <td>{order.product.code}</td>
                            <td>{order.product.color}</td>
                            <td>{formatMoney(order.price)}</td>
                            <td>{order.quantity}</td>
                            <td>{formatMoney(order.subtotal)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </Typography>
              </Box>
            </Modal>
          )}
        </div>
        <div className="mt-5 d-flex justify-content-center">
          <ReactPaginate
            previousLabel="Trước"
            nextLabel="Sau"
            pageCount={pageCount}
            onPageChange={handlePageClick}
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
            forcePage={page}
          />
        </div>
      </div>
    </>
  );
}
