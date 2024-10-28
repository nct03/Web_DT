import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import MainLayout from "./components/MainLayout";
import Detail from "./components/Detail";
import Register from "./components/Register";
import { AvatarProvider } from "../src/components/AvatarContext";
import Product from "./components/Product";
import { QuantityProvider } from "./components/QuantityContext";
import File404 from "./components/File404";
import InputList from "./components/InputList";
import DataEntry from "./components/DataEntry";
import DataEntryUpdate from "./components/DataEntryUpdate";
import AdminUpdateProduct from "./components/AdminUpdateProduct";
import AdminProduct from "./components/AdminProduct";
import AdminCreateProduct from "./components/AdminCreateProduct";

function App() {
  return (
    <>
      <QuantityProvider>
        <AvatarProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/product/detail/:id" element={<Detail />} />
              <Route path="/product" element={<Product />} />
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
              <Route path="*" element={<File404 />} />
            </Route>
          </Routes>
        </AvatarProvider>
      </QuantityProvider>
    </>
  );
}

export default App;
