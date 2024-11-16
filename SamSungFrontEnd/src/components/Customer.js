import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import customerService from "../service/login/customer/customerService";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const [deleteCustomer, setDeleteCustomer] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = async (id) => {
    try {
      await customerService.deleteUser(id);
      setCustomers(customers.filter((customer) => customer.id !== id));
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCustomers();
  }, []);
  const getCustomers = async () => {
    try {
      const res = await customerService.getUsers("");
      setCustomers(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ marginTop: 150, padding: 50 }}>
      <h3 style={{ textAlign: "center", padding: 10 }}>Danh sách khách hàng</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>Email</th>
            <th>Số ĐT</th>
            <th>Địa chỉ</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {customers &&
            customers.map((customer, index) => {
              return (
                <>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{customer.name}</td>
                    <td>{customer.gender ? "Nữ" : "Nam"}</td>
                    <td>{customer.dateOfBirth}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phoneNumber}</td>
                    <td>{customer.address}</td>
                    <td>
                      <Button variant="contained">
                        <NavLink
                          to={"/admin/user-management/update/" + customer.id}
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          Chỉnh sửa
                        </NavLink>
                      </Button>
                    </td>
                    {/* <td>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          handleOpen();
                          setDeleteCustomer(customer);
                        }}
                      >
                        Xóa
                      </Button>
                    </td> */}
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
      <div>
        {deleteCustomer && (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Xác nhận xóa
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Bạn có chắc chắn muốn xóa "{deleteCustomer.name}" không ?
              </Typography>
              <Button
                onClick={() => {
                  handleDelete(deleteCustomer.id);
                }}
                variant="contained"
              >
                Xác nhận xóa
              </Button>
            </Box>
          </Modal>
        )}
      </div>
    </div>
  );
}
