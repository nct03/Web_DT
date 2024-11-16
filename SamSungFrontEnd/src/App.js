import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import MainLayout from "./components/MainLayout";
import Detail from "./components/Detail";
import Cart from "./components/Cart";
import Register from "./components/Register";
import DetailCustomer from "./components/DetailCustomer";
import UpdateCustomer from "./components/UpdateCustomer";
import { AvatarProvider } from "../src/components/AvatarContext";
import Product from "./components/Product";
import { QuantityProvider } from "./components/QuantityContext";
import PaymentInfo from "./components/PaymentInfo";
import PaypalCancel from "./components/PaypalCancel";
import PaymentPaypal from "./components/PaymentPaypal";
import CreateProduct from "./components/CreateProduct";
import File404 from "./components/File404";
import OAuth2 from "./components/OAuth2";
import InputList from "./components/InputList";
import DataEntry from "./components/DataEntry";
import UpdateProduct from "./components/UpdateProduct";
import DataEntryUpdate from "./components/DataEntryUpdate";
import Customer from "./components/Customer";
import AdminCustorm from "./components/AdminCustorm";
import OrderHistory from "./components/OrderHistory";
import AdminUpdateProduct from "./components/AdminUpdateProduct";
import AdminProduct from "./components/AdminProduct";
import AdminCreateProduct from "./components/AdminCreateProduct";
import AboutUs from "./components/AboutUs";
import Support from "./components/Support";
import Blog from "./components/Blog";

function App() {
  return (
    <>
      <QuantityProvider>
        <AvatarProvider>
          <Routes>
            <Route path="/about" element={<AboutUs />} />
            <Route path="/support" element={<Support />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/oauth2" element={<OAuth2 />} />
              <Route path="/product/detail/:id" element={<Detail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product" element={<Product />} />
              <Route path="/customer/detail" element={<DetailCustomer />} />
              <Route
                path="/admin/product-management"
                element={<AdminProduct />}
              />
              <Route
                path="/admin/product-management/create"
                element={<AdminCreateProduct />}
              />
              <Route
                path="/admin/product-management/detail/:id"
                element={<AdminUpdateProduct />}
              />
              <Route path="/admin/user-management" element={<Customer />} />
              <Route
                path="/admin/user-management/update/:id"
                element={<AdminCustorm />}
              />
              <Route
                path="/admin/order-management"
                element={<OrderHistory />}
              />
              <Route
                path="/product/not-data"
                element={<InputList />}
              />
              <Route
                path="/product/data-entry/:id/:name/:img"
                element={<DataEntry />}
              />
              <Route
                path="/product/data-entry/update/:id/:name/:img"
                element={<DataEntryUpdate />}
              />
              <Route
                path="/customer/detail/update"
                element={<UpdateCustomer />}
              />
              <Route path="*" element={<File404 />} />
            </Route>
            <Route path="/payment-info" element={<PaymentInfo />} />
            <Route
              path="/paypal-success/:totalPayment/:customerName/:paymentDate/:paymentCode"
              element={<PaymentPaypal />}
            />
            <Route path="/paypal-error" element={<PaypalCancel />} />
          </Routes>
        </AvatarProvider>
      </QuantityProvider>
    </>
  );
}

export default App;
