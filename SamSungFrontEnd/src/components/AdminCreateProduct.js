import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Field, Form, Formik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import productService from "../service/login/product/productService";
import { useState, useEffect } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../FireBase";
import Swal from "sweetalert2";

export default function AdminCreateProduct() {
  const [producerList, setProducerList] = useState([]);
  const [productTypeList, setProductType] = useState([]);
  const role = localStorage.getItem("role");
  const [listImage, setListImage] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const navigate = useNavigate();

  const findAllProducer = async () => {
    try {
      const rs = await productService.findAllProducer();
      setProducerList(rs.data);
    } catch (error) {
      console.log(error);
    }
  };

  const findAllProductType = async () => {
    try {
      const rs = await productService.findAllProductType();
      setProductType(rs.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    findAllProducer();
    findAllProductType();
  }, []);

  useEffect(() => {
    document.title = "Thêm Mới Sản Phẩm";
  }, []);

  const handleFileSelect = (event) => {
    const files = event.target.files;
    const fileList = Array.from(files);
    fileList.forEach((file) => {
      const isExistingFile = selectedFile.some(
          (selected) => selected.name === file.name && selected.size === file.size
      );
      if (isExistingFile) {
        return Swal.fire({
          icon: "error",
          title: "Bạn đã chọn ảnh này",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if (file instanceof File || file instanceof Blob) {
        const extension = file.name;
        const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(extension);
        if (!isImage) {
          return Swal.fire({
            icon: "error",
            title: "Sai định dạng ảnh",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        setSelectedFile([...selectedFile, ...fileList]);
        const reader = new FileReader();
        reader.onload = () => {
          const imageUrl = reader.result;
          setListImage((prevListImage) => [...prevListImage, imageUrl]);
        };
        reader.readAsDataURL(file);
      } else {
        console.error("Invalid file or blob");
      }
    });
  };

  const handleSubmitAsync = async () => {
    return new Promise((resolve, reject) => {
      if (selectedFile.length === 0) {
        return Swal.fire({
          icon: "error",
          title: "Bạn chưa chọn ảnh",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      const uploadPromises = selectedFile.map((file) => {
        return new Promise(async (resolve, reject) => {
          const extension = file.name;
          const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(extension);
          if (!isImage) {
            return Swal.fire({
              icon: "error",
              title: "Sai định dạng ảnh",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          const storageRef = ref(storage, `files/${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
              "state_changed",
              (snapshot) => {
                Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
              },
              (error) => {
                reject(error);
              },
              async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(downloadURL);
              }
          );
        });
      });
      Promise.all(uploadPromises)
          .then((urls) => {
            resolve(urls);
          })
          .catch((error) => {
            reject(error);
          });
    });
  };

  const handleRemoveImage = (index) => {
    const updatedList = [...listImage];
    updatedList.splice(index, 1);
    setListImage(updatedList);
    const updatedListSelectedFile = [...selectedFile];
    updatedListSelectedFile.splice(index, 1);
    setSelectedFile(updatedListSelectedFile);
  };

  return (
      <>
        {role !== "ROLE_ADMIN" ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
              <img
                  src="https://web4s.vn/uploads/plugin/news/581/403-forbidden.png"
                  alt="403 Forbidden"
                  className="img-fluid"
              />
            </div>
        ) : (
            <div className="container mt-5 mb-5">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <NavLink to="/" className="text-decoration-none">
                      Trang chủ
                    </NavLink>
                  </li>
                  <li className="breadcrumb-item">
                    <NavLink to="/product" className="text-decoration-none">
                      Sản phẩm
                    </NavLink>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Thêm Mới Sản Phẩm
                  </li>
                </ol>
              </nav>

              <div className="card shadow">
                <div className="card-header text-center bg-primary text-white">
                  <h3>Thêm Mới Sản Phẩm</h3>
                </div>
                <div className="card-body p-4">
                  <Formik
                      initialValues={{
                        productTypeId: "",
                        producerId: "",
                        addNewDate: "",
                        name: "",
                        description: "",
                        color: "",
                        imageSet: [],
                      }}
                      onSubmit={(value) => {
                        const productCreate = async () => {
                          value.imageSet = await handleSubmitAsync();
                          try {
                            await productService.productCreate(value);
                            navigate("/admin/product-management");
                            Swal.fire({
                              icon: "success",
                              title: "Thêm sản phẩm thành công",
                              showConfirmButton: false,
                              timer: 1500,
                            });
                          } catch (error) {
                            console.log(error);
                          }
                        };
                        productCreate();
                      }}
                  >
                    {({ resetForm }) => (
                        <Form>
                          <div className="row">
                            <div className="col-md-4">
                              <div className="form-group mb-3">
                                <label htmlFor="productTypeId">Loại sản phẩm:</label>
                                <Field
                                    component="select"
                                    className="form-select"
                                    name="productTypeId"
                                    id="productTypeId"
                                >
                                  <option value="">Chọn loại sản phẩm</option>
                                  {productTypeList.map((element, index) => (
                                      <option value={element.id} key={index}>
                                        {element.name}
                                      </option>
                                  ))}
                                </Field>
                              </div>
                            </div>

                            <div className="col-md-4">
                              <div className="form-group mb-3">
                                <label htmlFor="name">Tên sản phẩm:</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    id="name"
                                    placeholder="Nhập tên sản phẩm"
                                    />
                              </div>
                            </div>

                            <div className="col-md-4">
                              <div className="form-group mb-3">
                                <label htmlFor="addNewDate">Ngày nhập:</label>
                                <Field
                                    type="date"
                                    className="form-control"
                                    name="addNewDate"
                                    id="addNewDate"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-4">
                              <div className="form-group mb-3">
                                <label htmlFor="color">Màu sắc:</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    name="color"
                                    id="color"
                                    placeholder="Nhập màu sắc"
                                />
                              </div>
                            </div>

                            <div className="col-md-4">
                              <div className="form-group mb-3">
                                <label htmlFor="producerId">Thương hiệu:</label>
                                <Field
                                    component="select"
                                    className="form-select"
                                    name="producerId"
                                    id="producerId"
                                >
                                  <option value="">---Chọn---</option>
                                  {producerList.map((element, index) => (
                                      <option value={element.id} key={index}>
                                        {element.name}
                                      </option>
                                  ))}
                                </Field>
                              </div>
                            </div>
                          </div>

                          <div className="form-group mb-3">
                            <label htmlFor="description">Mô tả chi tiết:</label>
                            <Field name="description">
                              {({ field, form }) => (
                                  <CKEditor
                                      editor={ClassicEditor}
                                      data={field.value}
                                      onReady={(editor) => {
                                        editor.editing.view.change((writer) => {
                                          writer.setStyle(
                                              "height",
                                              "200px",
                                              editor.editing.view.document.getRoot()
                                          );
                                        });
                                      }}
                                      onChange={(event, editor) => {
                                        const data = editor.getData();
                                        form.setFieldValue("description", data);
                                      }}
                                  />
                              )}
                            </Field>
                          </div>

                          <div className="form-group mb-4">
                            <label>
                              <h5>Hình ảnh:</h5>
                            </label>
                            <div className="mb-3">
                              <label
                                  htmlFor="image"
                                  className="btn btn-secondary"
                              >
                                <i className="bi bi-upload"></i> Tải ảnh lên
                              </label>
                              <input
                                  type="file"
                                  multiple
                                  hidden
                                  id="image"
                                  onChange={handleFileSelect}
                              />
                            </div>

                            <div className="row">
                              {listImage.length === 0 && (
                                  <div className="col-12 text-center">
                                    <img
                                        className="img-fluid"
                                        src="https://content.hostgator.com/img/weebly_image_sample.png"
                                        alt="Sample"
                                    />
                                  </div>
                              )}

                              {listImage.map((element, index) => (
                                  <div className="col-md-3 mb-3" key={index}>
                                    <div style={{ position: "relative" }}>
                                      <img
                                          className="img-fluid rounded shadow"
                                          src={element}
                                          alt={`image-${index}`}
                                      />
                                      <button
                                          type="button"
                                          className="btn btn-danger rounded-circle position-absolute top-0 end-0"
                                          onClick={() => handleRemoveImage(index)}
                                          style={{
                                            transform: "translate(50%, -50%)",
                                            padding: "5px",
                                          }}
                                      >
                                        <i className="bi bi-trash"></i>
                                      </button>
                                    </div>
                                  </div>
                              ))}
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6">
                              <button
                                  type="button"
                                  className="btn btn-outline-danger w-100"
                                  onClick={() => resetForm()}
                              >
                                Hủy nhập
                              </button>
                            </div>
                            <div className="col-md-6">
                              <button className="btn btn-primary w-100" type="submit">
                                Thêm mới
                              </button>
                            </div>
                          </div>
                        </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
        )}
      </>
  );
}
