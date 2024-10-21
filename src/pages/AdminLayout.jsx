import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { useStateContext } from "../context/ContextProvider";
import { Outlet } from "react-router-dom";
const AdminLayout = () => {
  const { activeMenu } = useStateContext();
  return (
    <div className="flex relative">
      {/* //! sidebar  components  */}
      {activeMenu ? (
        <div className="w-72 fixed sidebar bg-white">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0">SideBar</div>
      )}
      {/* //!navbar components  */}
      {activeMenu ? (
        <div className="text-black  bg-white min-h-screen  lg:ml-72 w-full">
          <div className="fixed md:static bg-main-bg navbar w-full">Navbar</div>
          <div>
            <Outlet />
          </div>
        </div>
      ) : (
        <div>navbar2</div>
      )}
    </div>
  );
};

export default AdminLayout;
