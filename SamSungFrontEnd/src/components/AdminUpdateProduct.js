import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Field, Form, Formik } from "formik";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import productService from "../service/login/product/productService";
import { useState } from "react";
import { useEffect } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../FireBase";
import Swal from "sweetalert2";
export default function AdminUpdateProduct() {
  const [producerList, setProducerList] = useState([]);
  const [productypeList, setProductType] = useState([]);
  const [productDetail, setProductDetail] = useState();
  const role = localStorage.getItem("role");
  const [listImage, setListImage] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [listImageObj, setListImageObj] = useState([]);
  const [showProductErr, setShowProductErr] = useState(false);
  const navigate = useNavigate();
  const param = useParams();
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
  const detail = async () => {
    try {
      const res = await productService.detail(param.id);
      setProductDetail(res.data);
      setShowProductErr(false);
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "Sản phẩm không tồn tại") {
        setShowProductErr(true);
      }
      if (error.response.data.message === "Sản phẩm chưa có dữ liệu") {
        setShowProductErr(true);
      }
    }
  };
  useEffect(() => {
    detail();
  }, [param.id]);
  useEffect(() => {
    findAllProducer();
    findAllProductType();
  }, []);
  useEffect(() => {
    const listImgSet = productDetail?.imageSet.map((element) => element.name);
    setListImage(listImgSet);
  }, [productDetail?.imageSet]);
  useEffect(() => {
    const listImgSet = productDetail?.imageSet;
    setListImageObj(listImgSet);
  }, [productDetail?.imageSet]);
  useEffect(() => {
    document.title = "Cập Nhật Sản Phẩm";
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
      // if (selectedFile.length === 0) {
      //   return Swal.fire({
      //     icon: 'error',
      //     title: 'Bạn chưa chọn ảnh',
      //     showConfirmButton: false,
      //     timer: 1500
      //   })
      // }
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
    updatedListSelectedFile.splice(index - listImage.length, 1);
    setSelectedFile(updatedListSelectedFile);
    const updateListImageObj = [...listImageObj];
    updateListImageObj.splice(index, 1);
    setListImageObj(updateListImageObj);
  };
  const convertPathsToImages = (paths) => {
    return paths.map((path) => {
      return {
        id: 0,
        name: path,
      };
    });
  };
  const productUpdate = async (value) => {
    const newImagesFromAsync = await handleSubmitAsync();
    const newImagesAsObjects = convertPathsToImages(newImagesFromAsync);
    value.imageSet = [...listImageObj, ...newImagesAsObjects];
    try {
      await productService.productUpdate({
        ...value,
        productType: { id: +value.productType },
        producer: { id: +value.producer },
      });
      navigate("/admin/product-management");
      Swal.fire({
        icon: "success",
        title: "Cập nhật sản phẩm thành công",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSendDataDetailProduct = () => {
    localStorage.setItem(
      "dataCapacity",
      JSON.stringify(productDetail?.capacityProductSet)
    );
    navigate(
      `/product/data-entry/update/${productDetail?.id}/${
        productDetail?.name
      }/${encodeURIComponent(
        productDetail?.imageSet[0].name.replaceAll("%", "*")
      )}`
    );
  };
  if (!productDetail) {
    return null;
  }
  console.log(productDetail);
  return (
    <>
      {role !== "ROLE_ADMIN" ? (
        <div>
          <img
            src="https://web4s.vn/uploads/plugin/news/581/403-forbidden.png"
            width={"100%"}
            height={"100%"}
          />
        </div>
      ) : (
        <div
          style={{
            marginTop: 150,
          }}
          className="mb-5 "
        >
          <div>
            <NavLink
              to={"/"}
              className="bi bi-house text-secondary fs-4 text-decoration-none ms-5 ps-5"
            >
              <span className="ms-2 fw-normal fs-5">Trang chủ</span>
            </NavLink>
            <span className="ms-2 fw-normal fs-5 text-secondary">/</span>
            <NavLink
              to={"/product"}
              className={"text-secondary fs-4 text-decoration-none  ps-2"}
            >
              <span className="fw-normal fs-5">Sản phẩm</span>
            </NavLink>
          </div>
          <div className="container p-5 shadow-cosmetics-1 mt-3 bg-white">
            <Formik
              initialValues={{
                id: productDetail?.id,
                productType: productDetail?.productType.id,
                producer: productDetail?.producer.id,
                addNewDate: productDetail?.addNewDate,
                name: productDetail?.name,
                description: productDetail?.description,
                color: productDetail?.color,
                imageSet: productDetail?.imageSet,
              }}
              onSubmit={(value) => {
                productUpdate(value);
              }}
            >
              {({ resetForm }) => (
                <Form className="row">
                  <div>
                    <h3 className="text-center text-secondary bg-home py-2">
                      Cập Nhật Sản Phẩm
                    </h3>
                  </div>
                  <div className="col-4">
                    <div className="">
                      <div className="form-group">
                        <label htmlFor="productType">Phân khúc :</label>
                        <div className="input-field">
                          <Field
                            component="select"
                            type="text"
                            className="input-login"
                            name="productType"
                            id="productType"
                            placeholder=""
                          >
                            <option>---Chọn---</option>
                            {productypeList.map((element, index) => (
                              <option value={element.id} key={index}>
                                {element.name}
                              </option>
                            ))}
                          </Field>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">Tên sản phẩm : </label>
                        <div className="input-field">
                          <Field
                            type="text"
                            className="input-login"
                            name="name"
                            id="name"
                            placeholder=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="addNewDate">Ngày nhập :</label>
                      <div className="input-field">
                        <Field
                          type="date"
                          className="input-login"
                          name="addNewDate"
                          id="addNewDate"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="color">Màu sắc : </label>
                      <div className="input-field">
                        <Field
                          type="text"
                          className="input-login"
                          name="color"
                          id="color"
                          placeholder=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="producer">Thương hiệu : </label>
                      <div className="input-field">
                        <Field
                          component="select"
                          type="text"
                          className="input-login"
                          name="producer"
                          id="producer"
                          placeholder=""
                        >
                          <option>---Chọn---</option>
                          {producerList.map((element, index) => (
                            <option value={element.id} key={index}>
                              {element.name}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="">Mô tả chi tiết: </label>
                      <Field name="description">
                        {({ field, form }) => (
                          <CKEditor
                            editor={ClassicEditor}
                            data={field.value}
                            onReady={(editor) => {
                              editor.editing.view.change((writer) => {
                                writer.setStyle(
                                  "height",
                                  "300px",
                                  editor.editing.view.document.getRoot()
                                );
                              });
                            }}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              form.setFieldValue("description", data);
                            }}
                            onBlur={(event, editor) => {
                              const data = editor.getData();
                              form.setFieldValue("description", data);
                              form.setFieldTouched("description", true);
                            }}
                          />
                        )}
                      </Field>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="">
                          <h5>Hình ảnh :</h5>
                        </label>
                        <div className="">
                          <label
                            htmlFor="image"
                            type="button"
                            className="bi bi-upload text-white btn bg-secondary"
                          >
                            {" "}
                            Tải ảnh lên
                          </label>
                          <input
                            type="file"
                            multiple
                            hidden
                            className=""
                            name="imageSet"
                            id="image"
                            onChange={handleFileSelect}
                          />
                        </div>
                        {listImage?.length === 0 && (
                          <div>
                            <img
                              className=""
                              src="https://content.hostgator.com/img/weebly_image_sample.png"
                              alt=""
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      {listImage?.map((element, index) => (
                        <div className="col-4 px-5" key={index}>
                          <div style={{ position: "relative" }}>
                            <img
                              className="w-100 h-100"
                              src={element}
                              alt="image"
                            />
                            <span
                              type="button "
                              className="btn btn-danger rounded-0 bi bi-trash"
                              style={{
                                position: "absolute",
                                top: "0",
                                right: "0",
                              }}
                              onClick={() => handleRemoveImage(index)}
                            ></span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div>
                      <button
                        onClick={handleSendDataDetailProduct}
                        className={
                          "text-secondary button-buy float-end mt-5 fs-6 text-decoration-none"
                        }
                      >
                        <span className="fw-normal fs-6">
                          Cập nhật chi tiết sản phẩm
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 mt-3">
                      <button
                        type="button"
                        className="button-buy float-end"
                        onClick={() => resetForm()}
                      >
                        Hủy nhập
                      </button>
                    </div>
                    <div className="col-6 mt-3">
                      <button className="button-buy" type="submit">
                        Cập nhật
                      </button>
                    </div>
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
