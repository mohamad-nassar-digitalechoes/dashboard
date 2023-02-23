import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "../style.css";
import "./../dashboard/plugins/fontawesome-free/css/all.min.css";
import "./../dashboard/plugins/icheck-bootstrap/icheck-bootstrap.min.css";
import "./../dashboard/dist/css/adminlte.min.css";
import "./../dashboard/plugins/bootstrap/js/bootstrap.bundle.min.js";
import "./../dashboard/dist/js/adminlte.min.js";
import { toast } from "react-toastify";
import { gapi } from "gapi-script";
import "react-toastify/dist/ReactToastify.css";
import Middleware from "../Middleware/middleware";
import GoogleLogin from "react-google-login";
import AuthToken from "../Middleware/AuthToken";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export default function Login() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const client_id =
    "595665437391-1eiqranmgj46ttkn762t76av0kt8bqf6.apps.googleusercontent.com";
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [google, setGoogle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [validated, setValidated] = useState(false);
  const [signup, setSignup] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
    if (form.checkValidity() === true) {
      signin();
    }
  };
  async function signin() {
    if (navigator.onLine) {
      try {
        const req = { email: email, password: password };
        var response = await axios.post(
          `${Middleware.baseURL}/admin/login`,
          req,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (remember) {
          localStorage.setItem("admin-token", response.data["access-token"]);
          return (window.location.href = "/admin/blog");
        } else {
          sessionStorage.setItem("admin-token", response.data["access-token"]);
          return (window.location.href = "/admin/blog");
        }
      } catch (error) {
        AuthToken(error);
      }
    } else
      return toast.error(`Please check your connection.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
  }
  async function SigninByGoogle(response) {
    setFname(response.profileObj.givenName);
    setLname(response.profileObj.familyName);
    setGoogle(response.profileObj.googleId);
    setEmail(response.profileObj.email);
    setShow(true);
  }
  async function SignupByGoogle(event)
  {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setSignup(true);
    if (form.checkValidity() === true) {
    const req={first_name:fname,last_name:lname,email:email,password:password,googleId:google}
    await axios.post(`${Middleware.baseURL}/admin/create`,req,{headers:Middleware.header}).then((response)=>{
      localStorage.setItem("admin-token", response.data["access-token"]);
      window.location.href="/admin/blog";
    }).catch((error)=>{
      AuthToken(error);
    });
  }
  }
  async function SigninByGoogleFailed(error) {
    AuthToken(error);
  }
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: client_id,
        scope: "profile",
      });
    }
    gapi.load("client:auth2", start);
  });
  return [
    <div className="hold-transition login-page">

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Signup</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={signup} onSubmit={SignupByGoogle}>
          <Modal.Body>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <div className="input-group mb-3">
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user"></span>
                    </div>
                  </div>
                  { google!="" ?  <input
                    required
                    type="text"
                    name="fname"
                    className="form-control icon"
                    placeholder="First name"
                    readOnly
                    value={fname}
                  /> :
                  <input
                    required
                    type="text"
                    name="fname"
                    onChange={(e) => setFname(e.target.value)}
                    className="form-control icon"
                    placeholder="First name"
                    value={fname}
                  /> 
                  }
                 

                  <Form.Control.Feedback type="invalid">
                    Please enter your first name.
                  </Form.Control.Feedback>
                </div>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <div className="input-group mb-3">
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user"></span>
                    </div>
                  </div>
                  {google!="" ? 
                <input
                required
                type="text"
                name="lname"
                readOnly
                className="form-control icon"
                placeholder="Last name"
                value={lname}
              />
              :
              <input
                    required
                    type="text"
                    name="lname"
                    onChange={(e) => setLname(e.target.value)}
                    className="form-control icon"
                    placeholder="Last name"
                    value={lname}
                  />  
                }

                  <Form.Control.Feedback type="invalid">
                    Please enter your last name.
                  </Form.Control.Feedback>
                </div>
              </Form.Group>
            </Row>

            <div className="input-group mb-3">
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope"></span>
                </div>
              </div>
              {google!="" ? 
              <input
                required
                type="email"
                name="email"
                readOnly
                className="form-control icon"
                placeholder="Email"
                value={email}
              />
                :
                <input
                required
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="form-control icon"
                placeholder="Email"
                value={email}
              />
}
              <Form.Control.Feedback type="invalid">
                Please enter your email address.
              </Form.Control.Feedback>
            </div>

            <div className="input-group mb-3">
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock"></span>
                </div>
              </div>
              <input
                required
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="form-control icon"
                placeholder="Password"
              />

              <Form.Control.Feedback type="invalid">
                Please enter your password.
              </Form.Control.Feedback>
            </div>
            <div className="row">
            <div className="col-6">
                <button
                  type="button"
                  onClick={()=>{setShow(false);}}
                  className="btn btn-secondary btn-block btn-login"
                >
                  Cancel
                </button>
              </div>
              <div className="col-6">
                <button
                  type="submit"
                  className="btn btn-primary btn-block btn-login"
                >
                  Register
                </button>
              </div>
            </div>
          </Modal.Body>
        </Form>
      </Modal>
      <div className="login-box">
        <div className="card">
          <div className="card-body login-card-body">
            <div className="contaniner login-logo">
              <h2 style={{ fontWeight: "bold", color: "black" }}>
                Let's Get Started
              </h2>
            </div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
                <input
                  required
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control icon"
                  placeholder="Email"
                />

                <Form.Control.Feedback type="invalid">
                  Please enter your email address.
                </Form.Control.Feedback>
              </div>

              <div className="input-group mb-3">
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
                <input
                  required
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control icon"
                  placeholder="Password"
                />

                <Form.Control.Feedback type="invalid">
                  Please enter your password.
                </Form.Control.Feedback>
              </div>
              <div className="row">
                <div className="col-12 mb-3">
                  <div className="icheck-secondary  float-right">
                    <input
                      className="checkrem"
                      type="checkbox"
                      id="remember"
                      name="remember"
                      value={true}
                      onChange={(e) => setRemember(e.target.value)}
                    />
                    <label htmlFor="remember">Remember Me</label>
                  </div>
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block btn-login"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </Form>
            <br />
            <div style={{ textAlign: "center" }}>
              <span className="or">Or</span>
              <br />
              <br />
              <GoogleLogin
                className="btn btn-google btn-block mb-3"
                clientId={client_id}
                buttonText="Sign In with Google"
                onSuccess={SigninByGoogle}
                onFailure={SigninByGoogleFailed}
                cookiePolicy={"single_host_origin"}
              />
              <label className="mb-3 mt-3">
                Don't have an account? <a onClick={()=>{setShow(true);}} href="#">Sign Up</a>
              </label>
              <div class="word">
                <div class="word word-1">
                  <h3 style={{ fontWeight: "bold" }}>THE</h3>
                </div>
                <div class="word word-2">
                  <h3 style={{ fontWeight: "bold" }}>DASHBOARD</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
  ];
}
