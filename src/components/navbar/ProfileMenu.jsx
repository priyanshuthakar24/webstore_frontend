import React, { useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar } from "antd";
import { adminMenu, menuItems } from "../../data/dummy";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Authcontext";

const ProfileMenu = (props) => {
  const nav = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const { userData, isAuthenticated, logout } = useAuth();
  const toggleHoverMenu = () => {
    setIsHover(!isHover);
  };
  const handlelogout = async () => {
    await logout();
    nav("/auth/login");
  };
  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.5,
      },
      display: "none",
    },
  };

  return (
    <motion.div
      className="gap-x-4 group/link hidden lg:flex-center"
      onHoverStart={toggleHoverMenu}
      onHoverEnd={toggleHoverMenu}
    >
      {/* //! avata and chevronDow  */}
      <Avatar
        style={{
          backgroundColor: "#f56a00 ",
          verticalAlign: "middle",
        }}
        size="default"
      >
        {props.latter.toUpperCase()}
      </Avatar>
      <ChevronDown className="mt-[0.6px] group-hover/link:rotate-180 duration-300" />

      {/* //! drop down components  */}
      <motion.div
        className="sub-menu"
        initial="exit"
        animate={isHover ? "enter" : "exit"}
        variants={subMenuAnimate}
      >
        <div
          className={`grid gap-7 ${
            userData.isAdmin ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          {menuItems.map((item, i) => (
            <div key={i} className="relative cursor-pointer">
              <Link to={item.name}>
                <div className="flex-center gap-x-4 group/menubox px-2.5">
                  <div
                    className="bg-black/5 w-fit p-2 rounded-md
                  group-hover/menubox:bg-white group-hover/menubox:text-gray-900 duration-300"
                  >
                    <item.icon />
                  </div>
                  <div>
                    <h6 className="font-semibold">{item.name}</h6>
                  </div>
                </div>
              </Link>
            </div>
          ))}

          {/* //! if user hhas admin writes than this manu will appear   */}

          {userData.isAdmin
            ? adminMenu.map((item) => (
                <div className="relative cursor-pointer" key={item.name}>
                  <Link to={item.link}>
                    <div className="flex-center gap-x-4 group/menubox px-2.5">
                      <div
                        className="bg-white/5 w-fit p-2 rounded-md
             group-hover/menubox:bg-white group-hover/menubox:text-gray-900 duration-300"
                      >
                        <item.icon />
                      </div>
                      <div>
                        <h6 className="font-semibold">{item.name}</h6>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            : null}

          {/* //! if the user is isAuthenticated than the logout menu will appear  */}
          {isAuthenticated ? (
            <div className="relative cursor-pointer" onClick={handlelogout}>
              <div className="flex-center gap-x-4 group/menubox px-2.5">
                <div
                  className="bg-white/5 w-fit p-2 rounded-md
              group-hover/menubox:bg-white group-hover/menubox:text-gray-900 duration-300"
                >
                  <LogOut />
                </div>
                <div>
                  <h6 className="font-semibold">Logout</h6>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileMenu;

// {
/* {userData.isAdmin ? (
            <div className="relative cursor-pointer">
              <Link to="/dashbord">
                <div className="flex-center gap-x-4 group/menubox px-2.5">
                  <div
                    className="bg-white/5 w-fit p-2 rounded-md
              group-hover/menubox:bg-white group-hover/menubox:text-gray-900 duration-300"
                  >
                    <LayoutDashboard />
                  </div>
                  <div>
                    <h6 className="font-semibold">Dashbord</h6>
                  </div>
                </div>
              </Link>
            </div>
          ) : null} */
// }
