import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { ReactSession } from "react-client-session";
import Swal from "sweetalert2";



const cart = () => {
    const [Cart, setCart] = useState([]);
   
  
    useEffect(() => {
      axios.get("http://127.0.0.1:8000/cart"+ ReactSession.get("idUser")
      ).then((res) => {
        setCart(res.data);
       S
                
    
  