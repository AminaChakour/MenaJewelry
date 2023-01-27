import React, { Component } from "react";
import { ReactSession } from "react-client-session";

export default class LogOut extends Component {
  

  componentDidMount() { //on start

    ReactSession.set("fullname", null);
    ReactSession.set("idUser", null);
    ReactSession.set("userEmail", null);

    window.location.href = "/home";
  }

  render() {
    return <div></div>;
  }
}
