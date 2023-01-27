import React from "react";
import Swal from "sweetalert2";
import { FormErrors } from "./FormErrors";
import { useState } from "react";
import axios from "axios";
import { ReactSession } from "react-client-session";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [emailValid, setEmailValid] = useState(false);
  const [formValid, setFormValid] = useState(false);

  function handleUserInput(e, name) {
    if (name === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
    validateField(name, e.target.value);
  }

  function validateField(fieldName, value) {
    let fieldValidationErrors = formErrors;
    let emailValid1 = emailValid;
    let passwordValid1 = passwordValid;

    switch (fieldName) {
      case "email":
        emailValid1 = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid1 ? "" : " is invalid";
        break;
      case "password":
        passwordValid1 = value.length >= 5;
        fieldValidationErrors.password = passwordValid1 ? "" : " is too short";
        break;
      default:
        break;
    }

    setFormErrors(fieldValidationErrors);
    setEmailValid(emailValid1);
    setPasswordValid(passwordValid1);
    validateForm();
  }

  function validateForm() {
    setFormValid(emailValid && passwordValid);
  }

  function errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }
  /*
  function sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }
*/
  function handleSubmit(e) {
    e.preventDefault();
  
    axios
      .post(
        "http://127.0.0.1:8000/login",
        JSON.stringify({
          email,
          password,
        })
      )
      .then((res) => {
        const data = res.data;
        console.log(data)
        ReactSession.set("idUser", data.UserId )
        ReactSession.set("userEmail", data.email )
        ReactSession.set("fullname", data.firstname + " " + data.lastname )

        console.log(ReactSession.get('userEmail'))
        Swal.fire({
          title: "Success",
          text: "Welcome " + data.firstname + ".",
          icon: "success",
          timer: 3000,
        });
      });

  }

  return (
    <div className="loginStyle">
      <form onSubmit={handleSubmit}>
 

        <div className={`mb-3 ${errorClass(formErrors.email)}`}>
          <input
            type="email"
            className="form-control"
            placeholder="Email..."
            value={email}
            name="email"
            onChange={(e) => { handleUserInput(e,"email")}}
          />
        </div>

        <div className={`mb-3 ${errorClass(formErrors.password)}`}>
          <input
            type="password"
            className="form-control"
            placeholder="Password..."
            name="password"
            value={password}
            onChange={(e) => {handleUserInput(e,"password")}}
          />
        </div>

        <div className="panel panel-default">
          <FormErrors formErrors={formErrors} />
        </div>

        <div className="d-grid">
          <button
            disabled={!formValid}
            type="submit"
            className="btn btn-warning"
          >
            LOG IN
          </button>
        </div>
        <div className="mb-3 divcreateacc">
          <a id="createaccountlink" href="/signup">
            CREATE AN ACCOUNT
          </a>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
