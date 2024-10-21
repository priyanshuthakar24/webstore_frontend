import React, { useEffect } from "react";
import { useStateContext } from "../../context/ContextProvider";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { AiOutlineMenu } from "react-icons/ai";

const NavButton = ({ title, customfun, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={customfun}
      style={{ color: "#fff" }}
      className="relative text-xl rounded-full p-3 hover:bg-white/5"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);
const Navbar = () => {
  const { setScreenSize, screenSize, setActiveMenu, currentColor } =
    useStateContext();
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize,setActiveMenu]);

  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <NavButton
        title="Menu"
        customfun={() => setActiveMenu((preActiveMenu) => !preActiveMenu)}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
    </div>
  );
};

export default Navbar;
