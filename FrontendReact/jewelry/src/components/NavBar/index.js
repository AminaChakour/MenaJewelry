import React from "react";
import {
  Nav,
  NavLink,
  NavMenu,
  NavBtn,
  NavBtnLink,
  NavImg,
  NavCart,
} from "./navbar";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { ReactSession } from "react-client-session";

const Navbar = () => {
  return (
    <div>
      <Nav>
        <NavMenu>
          <NavLink to="/home" activeStyle>
            HOME
          </NavLink>

          {ReactSession.get("idUser") == null && (
            <NavLink to="/login" activeStyle>
              LOGIN
            </NavLink>
          )}

          {ReactSession.get("userEmail") === "admin@gmail.com" && (
            <NavLink to="/addProd" activeStyle>
              ADD PRODUCT
            </NavLink>
          )} 
      
      {ReactSession.get("fullname") !== null &&
            ReactSession.get("userEmail") !== "admin@gmail.com" && (
              <NavLink to="/editprofile" activeStyle> 
              EDIT PROFILE
               
              </NavLink>
            )}
          <NavImg>
            <img src="Logo.png" alt="Logo image" />
          </NavImg>
          {ReactSession.get("idUser") == null && (
            <NavLink to="/signup" activeStyle>
              SIGN UP
            </NavLink>
          )}


{ReactSession.get("userEmail") === "admin@gmail.com" && (
            <NavLink to="/editproducts" activeStyle>
              EDIT PRODUCTS
            </NavLink>
          )}
          

          {ReactSession.get("userEmail") !== "admin@gmail.com" && (
          <NavLink to="/products" activeStyle>
            PRODUCTS
          </NavLink>
          )}


          

          {ReactSession.get("fullname") !== null && (
            <NavLink to="/logout" activeStyle>
              LOG OUT
            </NavLink>
          )}
        </NavMenu>


        {ReactSession.get("userEmail") !== "admin@gmail.com" &&  ReactSession.get("idUser") !== null && (
        <NavCart to="/cart" activeStyle>
          <HiOutlineShoppingBag size={35} />
        </NavCart>
        )}
      </Nav>
    </div>
  );
};

export default Navbar;
