import { useContext, useEffect, useState } from "react";
import productService from "../service/login/product/productService";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Header from "./Header";
import { Slider } from "@mui/material";
import { debounce } from "lodash"; // Import debounce từ thư viện lodash (cần cài đặt lodash trước)
import cartService from "../service/login/cart/cartService";
import Swal from "sweetalert2";
import { QuantityContext } from "./QuantityContext";

export default function AdminProduct() {
  const [productList, setProductList] = useState([]);
  const [selectRadio, setSelectRadio] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const location = useLocation();
  const [productTypeList, setProductTypeList] = useState([]);
  const [producerList, setProducerList] = useState([]);
  const search = new URLSearchParams(location.search).get("search") || "";
  const [valueSearch, setValueSearch] = useState({
    name: "",
    productTypeId: "",
    producerId: "",
    minPrice: 0,
    maxPrice: 100000000,
    nameSort: "",
  });
  const sortList = ["Tên: A-Z", "Tên: Z-A", "Giá: Giảm dần", "Giá: Tăng dần"];
  const { iconQuantity, setIconQuantity } = useContext(QuantityContext);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const findByName = async () => {
    try {
      const res = await productService.findByName({
        ...valueSearch,
        name: search,
      });
      console.log(res.data.content);
      setProductList(res.data.content);
      setCurrentPage(res.data.number);
      setPageCount(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  const findAllProductType = async () => {
    try {
      const res = await productService.findAllProductType();
      setProductTypeList(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const findAllProducer = async () => {
    try {
      const res = await productService.findAllProducer();
      setProducerList(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    document.title = "Danh Sách Sản Phẩm";
  }, []);
  useEffect(() => {
    findByName();
  }, [valueSearch, search]);
  useEffect(() => {
    findAllProductType();
    findAllProducer();
  }, []);
  const handleProductType = (id) => {
    setValueSearch({
      ...valueSearch,
      productTypeId: id,
    });
  };
  const handlePageClick = async (page) => {
    setCurrentPage(page.selected);
    const res = await productService.findByName(valueSearch, page.selected);
    setProductList(res.data.content);
  };
  const handleCancelRadio = (id) => {
    setValueSearch({
      ...valueSearch,
      producerId: id,
    });
    if (selectRadio === id) {
      setSelectRadio("");
      setValueSearch({
        ...valueSearch,
        producerId: "",
      });
    } else {
      setSelectRadio(id);
    }
  };
  const handlePriceChange = debounce((event) => {
    setValueSearch({
      ...valueSearch,
      minPrice: event.target.value[0],
      maxPrice: event.target.value[1],
    });
  }, 100);
  const handleSortProduct = async (event) => {
    setValueSearch({ ...valueSearch, nameSort: event.target.value });
    const res = await productService.findByName(
      { ...valueSearch, nameSort: event.target.value },
      currentPage
    );
    setProductList(res.data.content);
  };
  const handleCreateCart = async (price, idCapacityProduct) => {
    try {
      const value = {
        quantity: "1",
        price: price,
        idCapacityProduct: idCapacityProduct,
      };
      const res = await cartService.createCart(value);
      console.log(res);
      if (res.data.message === "Thêm sản phẩm vào giỏ hàng thành công") {
        setIconQuantity(iconQuantity + 1);
      }
      Swal.fire({
        icon: "success",
        title: "Sản phẩm đã được thêm vào giỏ hàng",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      if (error.response.status === 403) {
        navigate("/login");
        Swal.fire({
          icon: "error",
          title: "Vui lòng đăng nhập để mua hàng",
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (error.response.data) {
        Swal.fire({
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  const handdleDeleteProduct = (id, image) => {
    Swal.fire({
      color: "#d4969a",
      text: "BẠN CHẮC CHẮN MUỐN XÓA SẢN PHẨM ?",
      imageUrl: image,
      imageHeight: "150px",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Không",
      confirmButtonText: "Có",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await productService.deleteProduct(id);
          const res = await productService.findByName(
            valueSearch,
            productList.length === 1 ? currentPage - 1 : currentPage
          );
          setCurrentPage(res.data.number);
          setPageCount(res.data.totalPages);
          setProductList(res.data.content);
          Swal.fire({
            title: "Xóa sản phẩm thành công",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  console.log(productTypeList);
  return (
      <>
        <div className="row mx-0" style={{ marginTop: "117px" }}>
          <div className="px-0 image-container" style={{ height: "400px" }}>
            <img
                src="https://pos.nvncdn.com/f2fe44-24897/bn/20240819_srR7m5MK.gif"
                width={"100%"}
                height={"100%"}
            />
          </div>
        </div>
        <div className="container mb-5">
          <div className="row mx-0 px-5 py-3">
            <div className="col-12 text-secondary py-5">
              <div>
                <h4 style={{ textAlign: "center" }}>Danh mục</h4>
              </div>
              <hr />

              {role === "ROLE_ADMIN" && (
                  <>
                    <div
                        className="accordion-header mt-2"
                        id="headingOne"
                        style={{ marginBottom: '1rem' }}
                    >
                      <button
                          className="accordion-button fs-6 fw-bold"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#managerProduct"
                          aria-expanded="true"
                          aria-controls="managerProduct"
                          style={{
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                            padding: '0.75rem 1.25rem',
                          }}
                      >
                        Quản lí sản phẩm
                      </button>
                    </div>
                    <div
                        id="managerProduct"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                    >
                      <div className="d-flex">
                        <div className="nav-item my-2 me-4">
                          <button
                              className="btn"
                              style={{
                                border: "2px solid #007bff",
                                backgroundColor: "#007bff",
                                color: "white",
                                padding: "10px 20px",
                                borderRadius: "5px",
                              }}
                              onClick={() => window.location.href = "/admin/product-management/create"}
                          >
                            <i className="fas fa-plus me-2"></i>
                            Thêm mới
                          </button>
                        </div>
                        <div className="nav-item my-2">
                          <button
                              className="btn"
                              style={{
                                border: "2px solid #28a745",
                                backgroundColor: "#28a745",
                                color: "white",
                                padding: "10px 20px",
                                borderRadius: "5px",
                              }}
                              onClick={() => window.location.href = "/product/not-data"}
                          >
                            <i className="fas fa-list me-2"></i>
                            Nhập số liệu
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
              )}

              <div
                  className="accordion-header mt-2"
                  id="headingTwo"
                  style={{ marginBottom: '1rem' }}
              >
                <button
                    className="accordion-button fs-6 fw-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                    style={{
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      padding: '0.75rem 1.25rem',
                    }}
                >
                  Loại sản phẩm
                </button>
              </div>
              <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    overflowX: 'auto',
                    gap: '10px',
                    padding: '10px 0',
                  }}
              >
                {productTypeList.map((element, index) => (
                    <div
                        key={index}
                        style={{
                          flex: '0 1 auto',
                          padding: '10px',
                          textAlign: 'center',
                          backgroundColor: '#f9f9f9',
                          borderRadius: '5px',
                        }}
                    >
                      <button
                          className="nav-link link-dark text-truncate"
                          aria-current="page"
                          onClick={() => handleProductType(element.id)}
                          style={{
                            width: '100%',
                            background: 'none',
                            border: 'none',
                            padding: '0',
                            textAlign: 'center',
                          }}
                      >
                        {element.name}
                      </button>
                    </div>
                ))}
                <div
                    style={{
                      flex: '0 1 auto',
                      padding: '10px',
                      textAlign: 'center',
                      backgroundColor: '#f9f9f9',
                      borderRadius: '5px',
                    }}
                >
                  <button
                      className="nav-link link-dark text-truncate fw-bold"
                      aria-current="page"
                      onClick={() =>
                          setValueSearch({
                            ...valueSearch,
                            productTypeId: '',
                          })
                      }
                      style={{
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        padding: '0',
                        textAlign: 'center',
                      }}
                  >
                    Tất cả sản phẩm
                  </button>
                </div>
              </div>

              <div
                  className="accordion-header mt-2"
                  id="headingThree"
                  style={{ marginBottom: '1rem' }}
              >
                <button
                    className="accordion-button fs-6 fw-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne1"
                    aria-expanded="true"
                    aria-controls="collapseOne1"
                    style={{
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      padding: '0.75rem 1.25rem',
                    }}
                >
                  Thương hiệu
                </button>
              </div>
              <div
                  id="collapseOne1"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    overflowX: 'auto',
                    gap: '10px',
                    padding: '10px 0',
                  }}
              >
                {producerList.map((element, index) => (
                    <div
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px',
                        }}
                    >
                      <input
                          className="form-check-input-1"
                          type="radio"
                          checked={selectRadio === element.id}
                          onClick={() => handleCancelRadio(element.id)}
                          name="radio"
                          id={element.id}
                      />
                      <label
                          className="link-dark form-check-label text-truncate"
                          htmlFor={element.id}
                          aria-current="page"
                      >
                        {element.name}
                      </label>
                    </div>
                ))}
              </div>

              <div
                  className="accordion-header mt-2"
                  id="headingFour"
                  style={{ marginBottom: '1rem' }}
              >
                <button
                    className="accordion-button fs-6 fw-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne2"
                    aria-expanded="true"
                    aria-controls="collapseOne2"
                    style={{
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      padding: '0.75rem 1.25rem',
                    }}
                >
                  Khoảng giá
                </button>
              </div>
              <div
                  id="collapseOne2"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingFour"
                  data-bs-parent="#accordionExample"
              >
                <div className="price-slider-wrapper">
                  <Slider
                      valueLabelDisplay="on"
                      aria-labelledby="price-slider"
                      className="bg-white mt-5"
                      valueLabelFormat={(value) =>
                          value.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })
                      }
                      min={0}
                      max={100000000}
                      value={[valueSearch.minPrice, valueSearch.maxPrice]}
                      onChange={handlePriceChange}
                  />
                </div>
              </div>
            </div>

            <div className="col-12 text-secondary p-5">
              {productList.length === 0 ? (
                  <div className="mt-5">
                    <h4 className="text-danger">
                      Xin lỗi! Hiện tại chưa có sản phẩm này
                    </h4>
                  </div>
              ) : (
                  <>
                    <div className="d-flex justify-content-between">
                      <h4>Tất cả sản phẩm</h4>
                      <div className="float-end">
                        <label className="fs-5 text-secondary me-2"></label>
                        <select
                            className="select-dieucosmetics border border-2"
                            onChange={handleSortProduct}
                        >
                          <option className="select-sort" value={""}>
                            ---Chọn---
                          </option>
                          {sortList.map((element, index) => (
                              <option
                                  className="select-sort"
                                  key={index}
                                  value={element}
                              >
                                {element}
                              </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      {productList.map((element, index) => (
                          <div
                              type="button"
                              className="card-list col-4 mt-2"
                              key={index}
                          >
                            <div className="cart-icon">
                              <i
                                  type="button"
                                  onClick={() => {
                                    handleCreateCart(
                                        element.capacityProductSet[0].priceSale,
                                        element.capacityProductSet[0].id
                                    );
                                  }}
                                  className="bi bi-cart-plus"
                                  aria-hidden="true"
                              ></i>
                            </div>
                            {role === "ROLE_ADMIN" && (
                                <>
                                  <div className="trash-icon">
                                    <i
                                        type="button"
                                        onClick={() => {
                                          handdleDeleteProduct(
                                              element.id,
                                              element.imageSet[0].name
                                          );
                                        }}
                                        className="bi bi-trash"
                                    />
                                  </div>
                                </>
                            )}
                            <NavLink
                                to={`detail/${element.id}`}
                                className={"text-decoration-none text-secondary"}
                            >
                              <img
                                  src={element.imageSet[0].name}
                                  className="card-img-top"
                                  alt="..."
                                  width={"100%"}
                              />
                              <div className="card-body">
                                {element.name.length > 25 ? (
                                    <h6>{element.name.slice(0, 25)}...</h6>
                                ) : (
                                    <h6>{element.name}</h6>
                                )}
                                <p>
                      <span className="text-decoration-line-through">
                        {+element.capacityProductSet[0].price === 0
                            ? ""
                            : (+element.capacityProductSet[0]
                                .price).toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                      </span>
                                  <span className="text-danger fs-5 float-end fw-bold">
                        {(+element.capacityProductSet[0]
                            .priceSale).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                                </p>
                              </div>
                            </NavLink>
                          </div>
                      ))}
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
                            forcePage={currentPage}
                        />
                      </div>
                    </div>
                  </>
              )}
            </div>
          </div>
        </div>
      </>
  );

}
