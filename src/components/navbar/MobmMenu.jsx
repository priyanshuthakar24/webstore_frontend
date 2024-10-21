import React from "react";
import { ChevronDown, LogOut, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { adminMenu, menuItems } from "../../data/dummy";
import { useAuth } from "../../context/Authcontext";
import { Link, useNavigate } from "react-router-dom";

const MobmMenu = ({ Menus }) => {
  const {
    isAuthenticated,
    userData,
    logout,
    isOpen,
    clicked,
    toggleDrawer,
    setClicked,
  } = useAuth();
  const nav = useNavigate();

  //! logout function logic
  const handlelogout = async () => {
    await logout();
    nav("/auth/login");
  };

  //! sub menu option on mobile animation logic
  const subMenuDrawer = {
    enter: {
      height: "auto",
      overflow: "hidden",
    },
    exit: {
      height: 0,
      overflow: "hidden",
    },
  };

  return (
    <div>
      {/* //! close and open button  */}
      <button className="z-[50000] relative" onClick={toggleDrawer}>
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* //! mobile menu with animation   */}
      <motion.div
        className="fixed left-0 right-0 top-16 overflow-y-auto h-full bg-[#18181A] backdrop-blur text-white p-6"
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
      >
        <ul>
          {/* //! general menu  */}
          {Menus.map(({ name }, i) => {
            return (
              <li key={name}>
                <Link to={name} onClick={toggleDrawer}>
                  <span className="flex-center-between p-4 hover:bg-white/5 rounded-md cursor-pointer relative">
                    {name}
                  </span>
                </Link>
              </li>
            );
          })}

          {/* //! isAuthenticated than menu will apppear  */}
          {isAuthenticated ? (
            <li>
              <span
                className="flex-center-between p-4 hover:bg-white/5 rounded-md cursor-pointer relative"
                onClick={() => setClicked(!clicked)}
              >
                Profile
                <ChevronDown className={`ml-auto ${clicked && "rotate-180"}`} />
              </span>

              {/* //! submenu for the  isAuthenticated than  */}
              <motion.ul
                className="ml-5"
                initial="exit"
                animate={clicked ? "enter" : "exit"}
                variants={subMenuDrawer}
              >
                {menuItems.map((item, i) => (
                  <Link to={item.name} key={item.name} onClick={toggleDrawer}>
                    <li
                      key={i}
                      className="p-2 flex-center hover:bg-white/5 rounded-md cursor-pointer gap-x-2"
                    >
                      <item.icon size={17} />
                      <span>{item.name}</span>
                    </li>
                  </Link>
                ))}
                {/* //! isAuthenticated and the if the user is admin than menu  will appear */}
                {userData.isAdmin
                  ? adminMenu.map((item) => (
                      <li
                        className="p-2 flex-center hover:bg-white/5 rounded-md cursor-pointer gap-x-2"
                        onClick={toggleDrawer}
                        key={item.name}
                      >
                        <item.icon size={17} />
                        <Link to={item.link}>{item.name}</Link>
                      </li>
                    ))
                  : null}

                {/* //! logout button */}
                <li
                  className="p-2 flex-center hover:bg-white/5 rounded-md cursor-pointer gap-x-2"
                  onClick={() => {
                    handlelogout();
                    toggleDrawer();
                  }}
                >
                  <LogOut size={17} />
                  <span>LogOut</span>
                </li>
              </motion.ul>
            </li>
          ) : null}
        </ul>
      </motion.div>
    </div>
  );
};

export default MobmMenu;
