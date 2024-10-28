import { Outlet } from "react-router-dom";
import Header from "./Header";
import Cuon from "./Cuon";
import Footer from "./Footer";


  
export default function MainLayout(){
    return (
        <>
          <Header />
          <Cuon />
          <Outlet /> 
          <Footer />
        </>
      );
}
