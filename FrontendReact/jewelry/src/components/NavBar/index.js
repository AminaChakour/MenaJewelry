import React from "react";
import {
  Nav,
  NavLink,
  NavMenu,
  NavBtn,
  NavBtnLink,
  NavPhoto,
  NavImg,
  NavCart,
} from "./navbar";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { ReactSession } from "react-client-session";

const Navbar = () => {
  return (
    <div>
      <Nav>

      {ReactSession.get("fullname") !==null && (
            <NavPhoto>
               <img className="imgUserNav" src={ReactSession.get("webcamPhoto")!==null?ReactSession.get("webcamPhoto"):"./user.png"} alt="photo" />
            </NavPhoto>
          )}
      
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
            <img src="Mena.png" className="logo" alt="Logo image" />
          </NavImg>
          {ReactSession.get("idUser") == null && (
            <NavLink to="/signup" activeStyle>
              SIGNUP
            </NavLink>
          )}


{ReactSession.get("userEmail") === "admin@gmail.com" && (
            <NavLink to="/editproducts" activeStyle>
              EDIT PRODUCTS
            </NavLink>
          )}
          

          {ReactSession.get("userEmail") !== "admin@gmail.com" && (
          <NavLink to="/products" activeStyle>
            SHOP
          </NavLink>
          )}

{ReactSession.get("fullname") !== null &&
            ReactSession.get("userEmail") !== "admin@gmail.com" && (
              <NavLink to="/orders" activeStyle> 
              ORDERS
               
              </NavLink>
            )}

          

          {ReactSession.get("fullname") !== null && (
            <NavLink to="/logout" activeStyle>
              LOGOUT
            </NavLink>
          )}
        </NavMenu>


        {ReactSession.get("userEmail") !== "admin@gmail.com" &&  ReactSession.get("idUser") !== null && (
        <NavCart to="/cart" activeStyle>
          <HiOutlineShoppingBag size={50} />
        </NavCart>
        )}
      </Nav>
    </div>
  );
};

export default Navbar;
