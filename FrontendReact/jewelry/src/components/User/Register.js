import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useState, useRef } from "react";
import axios from "axios";
import { FormErrors } from "./FormErrors";
import { ReactSession } from "react-client-session";
import bcrypt from "bcryptjs";
import Webcam from "react-webcam";
import { storage } from "../General/firebase";
import {
  ref,
  uploadBytes,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid"; //genere des id uniques

const SignUp = () => {
  if (ReactSession.get("userEmail") === "admin@gmail.com") {
    window.location.href = "/home";
  }
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("QC");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password0, setPassword] = useState("");
  const [photoId, setPhotoId] = useState("");
  const [webcamPhoto, setWebcamPhoto] = useState("");
  const [takePhoto, setTakePhoto] = useState(false);
  const webRef = useRef(null);

  const [formErrors, setFormErrors] = useState({
    lastname: "",
    firstname: "",
    birthday: "",
    address: "",
    postalcode: "",
    city: "",
    phone: "",
    email: "",
    password0: "",
  });
  const [lastnameValid, setLastnameValid] = useState(false);
  const [firstnameValid, setFirstnameValid] = useState(false);
  const [birthdayValid, setBirthdayValid] = useState(false);
  const [addressValid, setAddressValid] = useState(false);
  const [postalcodeValid, setPostalcodeValid] = useState(false);
  const [cityValid, setCityValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [formValid, setFormValid] = useState(false);

  function handleUserInput(e, name) {
    const val = e.target.value;

    switch (name) {
      case "lastname":
        setLastname(val);
        break;
      case "firstname":
        setFirstname(val);
        break;
      case "birthday":
        setBirthday(val);
        break;
      case "city":
        setCity(val);
        break;
      case "postalcode":
        setPostalcode(val);
        break;
      case "address":
        setAddress(val);
        break;
      case "email":
        setEmail(val);
        break;
      case "phone":
        setPhone(val);
        break;
      case "password0":
        setPassword(val);
        break;
      case "province":
        setProvince(val);
        break;
      default:
        break;
    }
    validateField(name, e.target.value);
  }

  function validateField(fieldName, value) {
    let fieldValidationErrors = formErrors;
    let lastnameValid1 = lastnameValid;
    let firstnameValid1 = firstnameValid;
    let birthdayValid1 = birthdayValid;
    let addressValid1 = addressValid;
    let postalcodeValid1 = postalcodeValid;
    let cityValid1 = cityValid;

    let phoneValid1 = phoneValid;
    let emailValid1 = emailValid;
    let passwordValid1 = passwordValid;

    switch (fieldName) {
      case "email":
        emailValid1 = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid1 ? "" : " is invalid";
        break;
      case "password0":
        passwordValid1 = value.length >= 8;
        fieldValidationErrors.password = passwordValid1 ? "" : " is too short";
        break;
      case "firstname":
        firstnameValid1 = value.length > 1 && value.match(/[a-z]/i);
        fieldValidationErrors.firstname = firstnameValid1 ? "" : " is required";
        break;
      case "lastname":
        lastnameValid1 = value.length > 1 && value.match(/[a-z]/i);
        fieldValidationErrors.lastname = lastnameValid1 ? "" : " is required";
        break;
      case "address":
        addressValid1 =
          value.length > 5 && value.match(/^([a-zA-Z0-9\s,'-])*$/i);
        fieldValidationErrors.address = addressValid1 ? "" : " is required";
        break;
      case "city":
        cityValid1 =
          value.length > 2 && value.match(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/i);
        fieldValidationErrors.city = cityValid1 ? "" : " is required";
        break;

      case "phone":
        phoneValid1 = value.match(
          /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/i
        );
        fieldValidationErrors.phone = phoneValid1 ? "" : " is required";
        break;
      case "birthday":
        birthdayValid1 = value.length > 0;
        fieldValidationErrors.birthday = birthdayValid1 ? "" : " is required";
        break;
      case "postalcode":
        postalcodeValid1 =
          value.length > 0 &&
          value.match(
            /^([ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ]) ?([0-9][ABCEGHJKLMNPRSTVWXYZ][0-9])$/
          );
        fieldValidationErrors.postalcode = postalcodeValid1
          ? ""
          : " is required";
        break;

      default:
        break;
    }
    setFormErrors(fieldValidationErrors);

    setPasswordValid(passwordValid1);
    setFirstnameValid(firstnameValid1);
    setAddressValid(addressValid1);
    setLastnameValid(lastnameValid1);
    setCityValid(cityValid1);
    setEmailValid(emailValid1);
    setPhoneValid(phoneValid1);
    setBirthdayValid(birthdayValid1);
    setPostalcodeValid(postalcodeValid1);

    validateForm();
  }
  function validateForm() {
    setFormValid(
      emailValid &&
        passwordValid &&
        addressValid &&
        firstnameValid &&
        lastnameValid &&
        cityValid &&
        phoneValid &&
        postalcodeValid &&
        birthdayValid
    );
  }
  function wait(ms) {
    return new Promise((rsv) => setTimeout(rsv, ms));
  }
  function handleSubmit(e) {
    e.preventDefault();

    //encrypt password
    var password = bcrypt.hashSync(password0, 10);

    axios
      .post(
        "http://127.0.0.1:8000/signup",
        JSON.stringify({
          lastname,
          firstname,
          birthday,
          address,
          postalcode,
          city,
          province,
          phone,
          email,
          password,
        })
      )
      .then((res) => {
        const data = res.data;

        if (data.status === "success") {
          Swal.fire({
            title: "Success",
            text: data.info.firstname + " registered !",
            icon: "success",
            confirmButtonText: "Ok",
          });
          wait(2000).then(() => {
            window.location.href = "/login";
          });
        } else if (data.status === "error") {
          Swal.fire({
            title: "Error !",
            text: "Try again",
            icon: "error",
            confirmButtonText: "Ok",
          });
        } else if (data.status === "exists") {
          Swal.fire({
            title: "Email/User already exists !",
            text: "Try using a different email.",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      });
  }

  const listProvinces = () => {
    var prvs = ["ON", "QC", "AB", "MB", "SK", "NL", "NB", "YT", "BC"];
    return prvs.map((current, index) => {
      if (index == 0) {
        if (current !== province) {
          return [<option> {province}</option>, <option> {current}</option>];
        } else {
          return <option> {province}</option>;
        }
      }
      if (current !== province) {
        return <option> {current}</option>;
      }
    });
  };

  const CapturePhoto = async () => {
    const img = webRef.current.getScreenshot();

    try {
      const storageRef = ref(storage, "images/" + "webcam_" + v4());
      uploadString(storageRef, img, "data_url").then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setWebcamPhoto(url);
        });
      });
    } catch (e) {
      console.log(e);
    }

    setTakePhoto(false);
  };

  const uploadPhotoId = (img) => {
    const imageRef = ref(storage, `images/${"PhotoId_" + v4()}`);
    uploadBytes(imageRef, img).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setPhotoId(url);
      });
    });
  };

  useEffect(() => {
    if (webcamPhoto.length > 0 && photoId.length > 0) {
      axios
        .post("http://127.0.0.1:8000/faceRecognition", { photoId, webcamPhoto })
        .then((res) => {
          const data = res.data;

          console.log(data);
        });
    }
  }, [webcamPhoto]);

  return (
    <div className="bgSignup">
      {takePhoto ? (
        <div className="webcamDiv">
          <Webcam
            screenshotFormat="image/jpeg"
            className="webcam"
            ref={webRef}
          />
          <input
            type="button"
            className="form-control"
            value="CAPTURE"
            onClick={() => CapturePhoto()}
          />
        </div>
      ) : (
        ""
      )}

      <div className="registerStyle">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="mb-3 col-6">
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                name="firstname"
                value={firstname}
                onChange={(e) => {
                  handleUserInput(e, "firstname");
                }}
              />
            </div>

            <div className="mb-3 col-6">
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                name="lastname"
                value={lastname}
                onChange={(e) => {
                  handleUserInput(e, "lastname");
                }}
              />
            </div>
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              name="address"
              value={address}
              onChange={(e) => {
                handleUserInput(e, "address");
              }}
            />
          </div>

          <div className="row">
            <div className="mb-3 col-6">
              <input
                type="text"
                className="form-control"
                placeholder="City"
                name="city"
                value={city}
                onChange={(e) => {
                  handleUserInput(e, "city");
                }}
              />
            </div>
            <div className="mb-3 col-6">
              <select
                onChange={(e) => {
                  setProvince(e.target.value);
                }}
                className="form-control"
              >
                {listProvinces()}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="mb-3 col-6">
              <input
                type="text"
                maxLength={7}
                className="form-control"
                placeholder="Postal Code"
                name="postalcode"
                value={postalcode}
                onChange={(e) => {
                  handleUserInput(e, "postalcode");
                }}
              />
            </div>

            <div className="mb-3 col-6">
              <input
                type="tel"
                className="form-control"
                placeholder="Phone"
                name="phone"
                value={phone}
                onChange={(e) => {
                  handleUserInput(e, "phone");
                }}
              />
            </div>
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => {
                handleUserInput(e, "email");
              }}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password0"
              value={password0}
              onChange={(e) => {
                handleUserInput(e, "password0");
              }}
            />
          </div>

          <div className="mb-3">
            <center>
              <label>DATE OF BIRTH</label>
            </center>
            <input
              type="date"
              className="form-control"
              name="birthday"
              value={birthday}
              onChange={(e) => {
                handleUserInput(e, "birthday");
              }}
            />
          </div>

          <div className="mb-3">
            <center>
              <label>PHOTO ID</label>
            </center>
            <input
              type="file"
              accept="image/*"
              multiple={false}
              className="form-control"
              placeholder="Image"
              onChange={(e) => uploadPhotoId(e.target.files[0])} //0 takes the first image
            />
          </div>

          <div className="mb-3">
            <input
              type="button"
              className="form-control"
              value="Take photo"
              onClick={() => setTakePhoto(true)}
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
              SIGN UP
            </button>
          </div>
        </form>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default SignUp;
