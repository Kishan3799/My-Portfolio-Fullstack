import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { images } from "../constants";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";

import "./Navbar.css";
const Navbar = () => {
  const [toggle, setToggle] = useState(false);
 
  return (
    <header className="app__header">
      <div className="header__container">
        <div className="app__logo_brand">
          <NavLink to="/">
            <img
              src={images.logo}
              className="app__logo_img"
              alt="KishAndroid"
            />
          </NavLink>
        </div>

        <nav className="app__main_nav">
          <ul className="app__nav_list">
            <li className="nav__items">
              <NavLink to="./about" className="nav__links">
                about
              </NavLink>
            </li>
            <li className="nav__items">
              <NavLink to="./project" className="nav__links">
                project
              </NavLink>
            </li>
            <li className="nav__items">
              <NavLink to="./blog" className="nav__links">
                blog
              </NavLink>
            </li>
            <li className="nav__items">
              <NavLink to="./contact" className="nav__links">
                contact
              </NavLink>
            </li>
            <li className="nav__items">
              <NavLink to="./login" className="nav__links">
               Login
              </NavLink>
            </li>
          </ul>

          <div className="app__menu_toggle_buttons">
            <HiOutlineMenuAlt3
              style={{ display: toggle ? "none" : "block" }}
              onClick={() => setToggle(true)}
              className="menu__icon_open"
            />
            <IoCloseSharp
              style={{ display: toggle ? "block" : "none" }}
              onClick={() => setToggle(false)}
              className="menu__icon_close"
            />
          </div>

{/* Mobile Nav */}
          <div className="app__nav_menu">
            {toggle && (
              <div className="app__navigation_menu">
                <ul className="app__nav_menu_list">
                  {["about", "project", "blog", "contact", "login"].map((item) => (
                    <li key={item} className="app__nav_menu_item">
                      <NavLink to={`${item}`} className={"app__nav_menu_links"}>
                        {item}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
