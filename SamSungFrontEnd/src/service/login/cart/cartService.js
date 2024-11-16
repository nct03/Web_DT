import request from "../../../request";

const findAllCart = (page) => {
  const token = localStorage.getItem("token");
  try {
    return request.get(`/cart?page=${page ? page : 0}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const createCart = (value) => {
  console.log(value);
  const token = localStorage.getItem("token");
  try {
    return request.post(
      `/cart`,
      { ...value },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
const updateCart = (value) => {
  console.log(value);
  const token = localStorage.getItem("token");
  try {
    return request.put(`/cart`, value, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteCart = (id) => {
  const token = localStorage.getItem("token");
  try {
    return request.delete(`/cart/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const payment = (value) => {
  const token = localStorage.getItem("token");
  try {
    return request.post(
      `/cart/payment`,
      { ...value },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
const handleVNPay = (value) => {
  const token = localStorage.getItem("token");
  try {
    return request.post(
      `/payment`,
      { ...value },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
const getAllOrders = (search, page) => {
  const token = localStorage.getItem("token");
  try {
    return request.get(`/cart/order-management?search=${search}&page=${page}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
export const cartService = {
  findAllCart,
  createCart,
  deleteCart,
  updateCart,
  payment,
  handleVNPay,
  getAllOrders,
};
export default cartService;
