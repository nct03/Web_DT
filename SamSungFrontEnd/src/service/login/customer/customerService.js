import request from "../../../request";
const getUsers = (name) => {
  if (!name) {
    name = "";
  }
  const token = localStorage.getItem("token");
  try {
    const res = request.get("/customer?name=" + name, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
const deleteUser = (id) => {
  const token = localStorage.getItem("token");
  try {
    const res = request.delete("/customer/delete/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
const updateUserById = (value) => {
  const token = localStorage.getItem("token");
  try {
    const res = request.patch(
      "/customer/update/" + value.id,
      { ...value },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
const detailUserById = (id) => {
  const token = localStorage.getItem("token");
  try {
    const res = request.get("/customer/detail/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
const detail = () => {
  const token = localStorage.getItem("token");
  try {
    const res = request.get("/customer/detail", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
const update = (value) => {
  const token = localStorage.getItem("token");
  try {
    const res = request.patch(
      "/customer",
      { ...value },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const customerService = {
  getUsers,
  detailUserById,
  detail,
  update,
  updateUserById,
  deleteUser,
};
export default customerService;
