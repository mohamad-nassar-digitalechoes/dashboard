import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../style.css";
import { NavLink } from "react-router-dom";
import "../../dashboard/plugins/fontawesome-free/css/all.min.css";
import "../../dashboard/dist/css/adminlte.min.css";
import "../../dashboard/plugins/bootstrap/js/bootstrap.bundle.min.js";
import "../../dashboard/dist/js/adminlte.min.js";
import Middleware from "../../Middleware/middleware";
import AuthToken from "../../Middleware/AuthToken";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import bcryptjs from "bcryptjs";
import { toast, ToastContainer } from "react-toastify";

function Myheader() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [show, setShow] = useState(false);
  const [admin, setAdmin] = useState({
    first_name: "",
    last_name: "",
    email: "",
    type: "",
    status: "",
  });
  const [li, setLi] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  async function userInfo() {
    try {
      const response = await axios.get(`${Middleware.baseURL}/admin/info`, {
        headers: Middleware.header,
      });
      setAdmin({
        first_name: response.data.admin.first_name,
        last_name: response.data.admin.last_name,
        email: response.data.admin.email,
        type: response.data.admin.type,
        status: response.data.admin.status,
      });
    } catch (error) {
      AuthToken(error);
    }
  }
  async function logout() {
    try {
      localStorage.removeItem("admin-token");
      sessionStorage.removeItem("admin-token");
      window.location.href = "/login";
    } catch (error) {
      AuthToken(error);
    }
  }

  async function updateaccount(event) {
    event.preventDefault();
    try {
      let req = {};

      if (name !== "") req = { ...req, name: name };
      if (password !== "") {
        if (password !== confirm) {
          return toast.error("Confirm password incorrect", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
        }
        var newhash = await bcryptjs.hash(password, 8);
        req = { ...req, password: newhash };
      }
      console.log(req);
      const response = await axios.post(
        `${Middleware.baseURL}/admin/update/admin`,
        req,
        {
          headers: {
            "admin-token":
              localStorage.getItem("admin-token") ||
              sessionStorage.getItem("admin-token"),
          },
        }
      );
      toast.success(`${response.data.msg}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } catch (error) {
      AuthToken(error);
    }
  }

  useEffect(() => {
    userInfo();
    // console.clear();
  }, []);

  return [
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="pushmenu"
            href="#"
            role="button"
            id="bars"
          >
            <i className="fas fa-bars"></i>
          </a>
        </li>
      </ul>
    </nav>,
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Alert!
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">Are you sure you want to logout?</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              No
            </button>
            <button type="button" onClick={logout} className="btn btn-danger">
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>,

    // <div
    //   className="modal fade"
    //   id="profile"
    //   tabIndex={-1}
    //   role="dialog"
    //   aria-labelledby="exampleModalLabel"
    //   aria-hidden="true"
    // >
    //   <div className="modal-dialog modal-dialog-centered" role="document">
    //     <div className="modal-content">
    //       <div className="modal-header">
    //         <h5 className="modal-title" id="exampleModalLabel">
    //           Update Account
    //         </h5>
    //         <button
    //           type="button"
    //           className="close"
    //           data-dismiss="modal"
    //           aria-label="Close"
    //         >
    //           <span aria-hidden="true">&times;</span>
    //         </button>
    //       </div>
    //       <Form noValidate onSubmit={updateaccount}>
    //         <div className="modal-body">
    //           <Row className="mb-3">
    //             <Form.Group
    //               as={Col}
    //               md="12"
    //               className="mb-3"
    //               controlId="validationCustom01"
    //             >
    //               <Form.Label>Name</Form.Label>
    //               <Form.Control
    //                 name="name"
    //                 onChange={(e) => {
    //                   setName(e.target.value);
    //                   console.log(name);
    //                 }}
    //                 required
    //                 type="text"
    //                 placeholder="Admin Name"
    //               />
    //               <Form.Control.Feedback type="invalid">
    //                 Please enter a name
    //               </Form.Control.Feedback>
    //             </Form.Group>
    //             <br />
    //             <Form.Group
    //               as={Col}
    //               md="12"
    //               controlId="validationCustomUsername"
    //             >
    //               <Form.Label>Password</Form.Label>
    //               <Form.Control
    //                 name="password"
    //                 onChange={(e) => {
    //                   setPassword(e.target.value);
    //                 }}
    //                 min="6"
    //                 type="password"
    //                 placeholder="Password"
    //               />
    //             </Form.Group>
    //             <br />
    //             <Form.Group
    //               as={Col}
    //               md="12"
    //               className="mt-3"
    //               controlId="validationCustomUsername"
    //             >
    //               <Form.Label>Confirm Password</Form.Label>
    //               <Form.Control
    //                 name="confirm"
    //                 onChange={(e) => {
    //                   setConfirm(e.target.value);
    //                 }}
    //                 min="6"
    //                 type="password"
    //                 placeholder="Confirm Password"
    //               />
    //             </Form.Group>
    //           </Row>
    //         </div>
    //         <div className="modal-footer">
    //           <button
    //             type="button"
    //             className="btn btn-secondary"
    //             data-dismiss="modal"
    //           >
    //             Ignore
    //           </button>
    //           <button type="submit" className="btn btn-primary">
    //             Save Changes
    //           </button>
    //         </div>
    //       </Form>
    //     </div>
    //   </div>
    // </div>,

    <Modal
      show={show}
      size="lg"
      onHide={() => {
        setShow(false);
      }}
      centered
    >
      <Modal.Header>
        <Modal.Title>Update Profile</Modal.Title>
      </Modal.Header>
      <Form noValidate onSubmit={updateaccount}>
        <Modal.Body>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="12"
              className="mb-3"
              controlId="validationCustom01"
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                required
                type="text"
                placeholder="Admin Name"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a name
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group as={Col} md="12" controlId="validationCustomUsername">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                min="6"
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <br />
            <Form.Group
              as={Col}
              md="12"
              className="mt-3"
              controlId="validationCustomUsername"
            >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                name="confirm"
                onChange={(e) => {
                  setConfirm(e.target.value);
                }}
                min="6"
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => {
              setShow(false);
            }}
          >
            Ignore
          </button>
          <button className="btn btn-primary" type="submit">
            Save changes
          </button>
        </Modal.Footer>
      </Form>
    </Modal>,
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <div align="center">
        <div class="word">
          <div class="word word-1"><h2 style={{ "fontWeight":"bold" }}>THE</h2></div>
          <div class="word word-2"><h2 style={{ "fontWeight":"bold" }}>DASHBOARD</h2></div>
        </div>
      </div>
      <Divider />
      <div className="sidebar mt-3">
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li
              onClick={() => {
                setLi("aitools");
              }}
              className={
                window.location.pathname === "/admin/blog" || li == "aitools"
                  ? "nav-item  menu-open"
                  : "nav-item"
              }
            >
              <a
                href="#"
                className={
                  window.location.pathname === "/admin/blog" || li == "aitools"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                <i class="fas fa-cogs"></i>
                <p>
                  All AI Tools
                  <i className="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul
                className="nav nav-treeview"
                style={
                  window.location.pathname === "/admin/blog" || li == "aitools"
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <li className="nav-item">
                  <NavLink
                    to="/admin/blog"
                    className="nav-link"
                    activeClassName="nav-link active"
                    exact
                  >
                    Blog & Article Writing
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </aside>,
  ];
}

export default Myheader;
