import React from "react";
import axios from "axios";
import { useState } from "react";
import '../style.css';
import "./../dashboard/plugins/fontawesome-free/css/all.min.css";
import "./../dashboard/plugins/icheck-bootstrap/icheck-bootstrap.min.css";
import "./../dashboard/dist/css/adminlte.min.css";
import "./../dashboard/plugins/bootstrap/js/bootstrap.bundle.min.js";
import "./../dashboard/dist/js/adminlte.min.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Middleware from "../Middleware/middleware";

import AuthToken from "../Middleware/AuthToken";
import Form from "react-bootstrap/Form";

export default function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
    if (form.checkValidity()===true) {
      signin();
    }
  };
  async function signin() {
    if(navigator.onLine)
    {
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
          return (window.location.href = "/admin/dashboard");
        } else {
          sessionStorage.setItem("admin-token", response.data["access-token"]);
          return (window.location.href = "/admin/dashboard");
        }
      } catch (error) {
        AuthToken(error);
      }
    }
    else return toast.error(`Please check your connection.`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  }

  return [
   
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="card">
          <div className="card-body login-card-body">
            <div className="contaniner login-logo">
              <img src={require('../logo.png')} width="100%" />
            </div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  required
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="Email"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
                <Form.Control.Feedback type="invalid">
                  Please enter your email address.
                </Form.Control.Feedback>
              </div>
              
              <div className="input-group mb-3">
                <input
                  required
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Password"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
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
                    <label htmlFor="remember" >Remember Me</label>
                  </div>
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    // onClick={signin}
                    className="btn btn-primary btn-block"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  ];
}