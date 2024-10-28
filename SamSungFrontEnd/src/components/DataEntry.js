import { Field, Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import productService from '../service/login/product/productService';
import Swal from 'sweetalert2';

export default function DataEntry() {
  const role = localStorage.getItem('role');
  const params = useParams();
  const [capacityList, setCapacityList] = useState([]);
  const [listData, setListData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCapacities = async () => {
      try {
        const response = await productService.fildAllCapacity();
        setCapacityList(response.data);
      } catch (error) {
        console.error('Error fetching capacities:', error);
      }
    };

    fetchCapacities();
  }, []);

  const handleListData = (values, resetForm) => {
    if (!values.capacity || !values.priceSale || !values.quantity) {
      return Swal.fire({
        icon: 'error',
        title: 'Chưa nhập đầy đủ dữ liệu',
        showConfirmButton: false,
        timer: 1500
      });
    }

    const capacity = capacityList.find((cap) => +cap.id === +values.capacity);
    const newData = {
      capacity,
      quantity: values.quantity,
      price: values.price,
      priceSale: values.priceSale
    };

    setListData((prevList) => [...prevList, newData]);
    resetForm();
  };

  const handleDeleteDataProduct = (id) => {
    setListData((prevList) => prevList.filter((item) => item.capacity.id !== id));
  };

  const handleSubmit = async (values) => {
    values.productId = params.id;
    values.capacityProductDTOS = listData;
    try {
      await productService.dataEntry(values);
      Swal.fire({
        icon: 'success',
        title: 'Nhập dữ liệu thành công',
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/product');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
      <>
        {role !== 'ROLE_ADMIN' ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <img
                  src="https://web4s.vn/uploads/plugin/news/581/403-forbidden.png"
                  alt="403 Forbidden"
                  style={{ width: '100%', height: 'auto' }}
              />
            </div>
        ) : (
            <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
              <NavLink to="/" style={{ fontSize: '20px', color: '#007bff', textDecoration: 'none', display: 'block', marginBottom: '20px' }}>
                &larr; Trang chủ
              </NavLink>
              <div style={{ backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', padding: '20px' }}>
                <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Nhập Dữ Liệu Sản Phẩm</h2>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <img
                      src={decodeURIComponent(params.img).replaceAll('*', '%')}
                      alt={params.name}
                      style={{ maxWidth: '150px', borderRadius: '8px', marginRight: '20px' }}
                  />
                  <div>
                    <h3 style={{ margin: '0', color: '#555' }}>{params.name}</h3>
                  </div>
                </div>
                <Formik
                    initialValues={{
                      productId: '',
                      capacity: '',
                      price: '',
                      priceSale: '',
                      quantity: ''
                    }}
                    onSubmit={handleSubmit}
                >
                  {({ values, resetForm }) => (
                      <Form>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                          <div>
                            <label htmlFor="capacity" style={{ display: 'block', marginBottom: '8px', color: '#333' }}>Dung lượng:</label>
                            <Field as="select" name="capacity" id="capacity" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da' }}>
                              <option value="">Dung lượng</option>
                              {capacityList.map((element) => (
                                  <option key={element.id} value={element.id}>
                                    {element.name}
                                  </option>
                              ))}
                            </Field>
                          </div>
                          <div>
                            <label htmlFor="quantity" style={{ display: 'block', marginBottom: '8px', color: '#333' }}>Số lượng:</label>
                            <Field type="text" name="quantity" id="quantity" placeholder="Nhập số lượng" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da' }} />
                          </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                          <div>
                            <label htmlFor="price" style={{ display: 'block', marginBottom: '8px', color: '#333' }}>Giá nhập vào:</label>
                            <Field type="text" name="price" id="price" placeholder="Nhập giá dự kiến" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da' }} />
                          </div>
                          <div>
                            <label htmlFor="priceSale" style={{ display: 'block', marginBottom: '8px', color: '#333' }}>Giá bán ra:</label>
                            <Field type="text" name="priceSale" id="priceSale" placeholder="Nhập giá chính thức" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ced4da' }} />
                          </div>
                        </div>
                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                          <button
                              type="button"
                              onClick={() => handleListData(values, resetForm)}
                              style={{
                                backgroundColor: '#28a745',
                                color: '#fff',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '16px'
                              }}
                          >
                            Nhập dữ liệu
                          </button>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                          <h3 style={{ textAlign: 'center', color: '#333' }}>Danh Sách Dữ Liệu</h3>
                          {listData.length > 0 ? (
                              <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                                  <thead>
                                  <tr style={{ backgroundColor: '#e9ecef', borderBottom: '2px solid #dee2e6' }}>
                                    <th style={{ padding: '10px', borderBottom: '2px solid #dee2e6' }}>Dung tích</th>
                                    <th style={{ padding: '10px', borderBottom: '2px solid #dee2e6' }}>Số lượng</th>
                                    <th style={{ padding: '10px', borderBottom: '2px solid #dee2e6' }}>Giá dự kiến</th>
                                    <th style={{ padding: '10px', borderBottom: '2px solid #dee2e6' }}>Giá chính thức</th>
                                    <th style={{ padding: '10px', borderBottom: '2px solid #dee2e6' }}>Hành động</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  {listData.map((item, index) => (
                                      <tr key={index}>
                                        <td>{item.capacity.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{(+item.price).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</td>
                                        <td>{(+item.priceSale).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</td>
                                        <td>
                                          <button
                                              type="button"
                                              onClick={() => handleDeleteDataProduct(item.capacity.id)}
                                              style={{
                                                backgroundColor: '#dc3545',
                                                color: '#fff',
                                                border: 'none',
                                                padding: '5px 10px',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '14px'
                                              }}
                                          >
                                            Xóa
                                          </button>
                                        </td>
                                      </tr>
                                  ))}
                                  </tbody>
                                </table>
                              </div>
                          ) : (
                              <div style={{ textAlign: 'center', padding: '20px' }}>
                                <h5 style={{ color: '#dc3545' }}>Chưa Có Danh Sách Dữ Liệu</h5>
                              </div>
                          )}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <NavLink to="/product/not-data" style={{ textDecoration: 'none', backgroundColor: '#6c757d', color: '#fff', padding: '10px 20px', borderRadius: '4px', fontSize: '16px' }}>
                            Quay Lại
                          </NavLink>
                          {listData.length === 0 ? (
                              <button
                                  type="button"
                                  onClick={() => Swal.fire({
                                    icon: 'error',
                                    title: 'Chưa có danh sách dữ liệu',
                                    showConfirmButton: false,
                                    timer: 1500
                                  })}
                                  style={{
                                    backgroundColor: '#6c757d',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '10px 20px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '16px'
                                  }}
                              >
                                Lưu dữ liệu
                              </button>
                          ) : (
                              <button
                                  type="submit"
                                  style={{
                                    backgroundColor: '#007bff',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '10px 20px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '16px'
                                  }}
                              >
                                Lưu dữ liệu
                              </button>
                          )}
                        </div>
                      </Form>
                  )}
                </Formik>
              </div>
            </div>
        )}
      </>
  );
}
