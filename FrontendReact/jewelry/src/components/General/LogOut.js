import React, { Component } from "react";
import { ReactSession } from "react-client-session";
import ReactLoading from "react-loading";

export default class LogOut extends Component {
  

  componentDidMount() { //on start

    ReactSession.set("fullname", null);
    ReactSession.set("idUser", null);
    ReactSession.set("userEmail", null);

    window.location.href = "/home";
  }

  render() {
    return  <div className="loader">
    <ReactLoading type="cylon" color="#EADDCA" height={667} width={400} />
  </div>;
  }
}
