import React from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";
import { Menus } from "../../data/dummy";
import Searchbar from "./Searchbar";
import ProfileMenu from "./ProfileMenu";
import Desktopview from "./Desktopview";
import MobmMenu from "./MobmMenu";
import CartCount from "./CartCount";
import { useAuth } from "../../context/Authcontext";

const Navbar = () => {
  const { isAuthenticated, setIsOpne, userData } = useAuth();

  return (
    <header className="h-16 text-[15px] fixed inset-0 flex-center bg-black z-[1000]">
      <nav className="flex-center-between px-3.5 w-full max-w-7xl mx-auto">
        {/* //! logo section  */}
        <div className="flex-center gap-x-3 z[999] relative ">
          <Link to="/" className="flex-center gap-x-3">
            <img src={logo} alt="logo" className="size-9" />
            <h3 className="text-lg font-semibold ">Ecommerce</h3>
          </Link>

          {/* Desktop view  */}
          <ul className="lg:flex-center gap-x-1 hidden">
            {Menus.map((menu) => (
              <Desktopview menu={menu} key={menu.name} />
            ))}
            <Searchbar />
          </ul>
        </div>

        {/* //! if user will login that the profile menu appear and cart count will appear */}

        <div className="flex-center gap-x-5">
          {isAuthenticated ? (
            <>
              <ProfileMenu latter={userData.name[0]} />
              <Link to="/cart" onClick={() => setIsOpne(false)}>
                <CartCount count={2} />
              </Link>
            </>
          ) : (
            <Link to="/auth/login">
              <button
                className="bg-white/5 z-[999] relative px-3 py-1.5 shadow rounded-xl flex-center"
                onClick={() => setIsOpne(false)}
              >
                Login
              </button>
            </Link>
          )}

          {/* //! mobile view  */}

          <div className="lg:hidden flex-center mt-2 ">
            <MobmMenu Menus={Menus} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
