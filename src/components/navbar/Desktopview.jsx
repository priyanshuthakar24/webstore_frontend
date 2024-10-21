import React from "react";
import { Link } from "react-router-dom";
const Desktopview = ({ menu }) => {
  return (
    // general menu lists
    <li className="group/link">
      <Link
        to={menu.name}
        className="flex-center gap-1 cursor-pointer px-3 py-1 rounded-lg hover:bg-white/20  "
      >
        {menu.name}
      </Link>
    </li>
  );
};

export default Desktopview;
