import React from "react";
import { useStateContext } from "../../context/ContextProvider";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { Store } from "lucide-react";
import { Tooltip } from "antd";
import { links } from "../../data/dummy";
const Sidebar = () => {
  const { activeMenu, currentColor, setActiveMenu, screenSize } =
    useStateContext();
  const handleCloseSideBar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  const activelink =
    "flex items-center gap-5 pl-4 pb-2.5 rounded-lg text-white text-md m-2";
  const normallink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md m-2 text-gray-700 hover:light-gray";
  return (
    <div
      className="ml-3 h-screen md:overflow-hidden overflow-auto
        md:hover:overflow-auto pb-10"
    >
      {activeMenu && (
        <>
          {/* //! navbar heading div */}
          <div className="flex-center-between gap-5">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className=" flex items-center gap-3 ml-3  mt-4 text-xl font-extrabold tracking-tight text-slate-900"
            >
              <Store />
              <span>WebStore</span>
            </Link>
            <Tooltip title="Close" placement="bottom">
              <button
                type="button"
                className="text-xl rounded-full p-3 hover:bg-light-gray 
mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </Tooltip>
          </div>

          {/* //! mainmenu  div  */}
          <div className="mt-8">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 m-3 mt-4 uppercase">{item.title}</p>
                {item.links.map((link) => (
                  <div className={link.className}>
                    <NavLink
                      to={`/${link.name}`}
                      key={link.name}
                      style={({ isActive }) => ({
                        background: isActive ? currentColor : "",
                      })}
                      className={({ isActive }) =>
                        isActive ? activelink : normallink
                      }
                      onClick={handleCloseSideBar}
                    >
                      <link.icon size={20} />
                      <span className="capitalize">{link.name}</span>
                    </NavLink>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
