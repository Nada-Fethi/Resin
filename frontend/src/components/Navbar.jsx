// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import CartModal from "../pages/shop/CartModal";
import Logo from "../assets/Logo4.png";
import avatarImg from "../assets/avatar.png";

import { logout } from "../redux/features/auth/authSlice";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";

const Navbar = () => {
  const products = useSelector((state) => state.cart.products);
  const [isCartOpen, setisCartOpen] = useState(false);
  const handleCartToggle = () => {
    setisCartOpen(!isCartOpen);
  };

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const handDropDownToggle = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const adminDropDownMenus = [
    
            { label: "Profile", path: "/dashboard/profile" },
    { label: "Dashboard", path: "/dashboard/admin" },

    { label: "users", path: "/dashboard/users" },
    // { label: "All Orders", path: "/dashboard/manage-orders" },

    { label: "Manage Product", path: "/dashboard/ManageProduct" },
    // { label: "Add Product", path: "/dashboard/:id/add-new-post" },
    // { label: "Calendar", path: "/dashboard/calendar" },
  // 
  ];
  const userDropDownMenus = [
    { label: "Profile", path: "/dashboard/profile" },
    // { label: "Orders", path: "/dashboard/orders" },
  ];
  const dropdownMenus =
    user?.rote === 'admin' ? [...adminDropDownMenus] : [...userDropDownMenus];

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout())
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <header className=" fixed-nav-bar w-nav fixe ">
      <nav className=" max-w-screen-2xl max-auto px-4 flex justify-between iteween items-center">
        <div className="nav__links logo nav__logo">
          <Link to="/">
            <img src={Logo} className="img" />
          </Link>
        </div>

        <ul className="nav__links  ">
          <li className="link ">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="link">
            <Link to="/About">About Us </Link>
          </li>

          <li className="link">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        <div className="nav__icons  ">
          <span>
            <Link to="/search">
              <i className="ri-search-line"></i>
            </Link>
          </span>
          <span>
          <Link onClick={handleCartToggle} className="hover:text-primary">
              <i className=" ri-shopping-bag-line"></i>{" "}
              <sup className="pinki customhoverbutton  ">
                {products.length}
              </sup>
            </Link>
          </span>
          <span>
            {user && user ? (
              <>
                <img
                  onClick={handDropDownToggle}
                  src={user?.profileImage || avatarImg}
                  alt=""
                  className="img-rounded"
                />

                {isDropDownOpen && (
                  <div className="dropdown-menu absolute right=0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg z-50">
                    <ul className="custom-list font-medium space-y-4 p-2">
                      {dropdownMenus.map((menu, index) => (
                        <li key={index}>
                          <Link
                            onClick={() => setIsDropDownOpen(false)}
                            className="dropdown-items"
                            to={menu.path}
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link onClick={handleLogout} className="dropdown-items">
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <i className="ri-user-line"></i>{" "}
              </Link>
            )}
          </span>
        </div>
      </nav>
      {isCartOpen && (
        <CartModal
          products={products}
          isOpen={isCartOpen}
          onClose={handleCartToggle}
        />
      )}
    </header>
  );
};

export default Navbar;
