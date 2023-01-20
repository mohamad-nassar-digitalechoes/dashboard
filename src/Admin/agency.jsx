import React, { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Middleware from "../Middleware/middleware";
import { toast } from "react-toastify";
import AuthToken from "../Middleware/AuthToken";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Switch from '@mui/material/Switch';
import bcrypt from "bcryptjs";
export default function Agencies() {
  const [agencys, setagencys] = useState([]);
  const [add, setAdd] = useState(false);
  const [edt, setEdt] = useState("");
  const [dlt, setDlt] = useState("");
  const [valadd, setValadd] = useState(false);
  const [firstname, setFirstName] = useState("");
  const [lastname, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  function handleCloseAdd() {
    setAdd(false);
    setTimeout(() => {
      setValadd(false);
    }, 500);
  }
  async function handleAdd(event) {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValadd(true);
    if (form.checkValidity() === true) {
      const req = {
        first_name: firstname,
        last_name: lastname,
        email: email,
        password: password,
        type: "agency",
        status: "active",
      };
      try {
        const response = await axios.post(
          `${Middleware.baseURL}/admin/create`,
          req,
          {
            headers: Middleware.header,
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
        setAdd(false);
      } catch (error) {
        AuthToken(error);
      }
    }
  }

  async function handleUpdate(event)
  {
    event.preventDefault();
    let req={id:edt};
    if(firstname!=="") req={...req,first_name:firstname}; 
    if(lastname!=="") req={...req,last_name:lastname}; 
    if(email!=="") req={...req,email:email}; 
    if(password!=="") {  var newhash=await bcrypt.hash(password,8); req={...req,password:newhash}; }
    if(status!=="") req={...req,status:status};
    try {
        const response=await axios.post(`${Middleware.baseURL}/admin/update`,req,{headers:Middleware.header});
        toast.success(`${response.data.msg}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
          setEdt("");
    } catch (error) {
        AuthToken(error);
    }
  }

  async function getagencys() {
    try {
      const response = await axios.get(`${Middleware.baseURL}/agencies`, {
        headers: Middleware.header,
      });
      setagencys(response.data.agencies);
    } catch (error) {
      AuthToken(error);
    }
  }
  useEffect(() => {
    getagencys();
  });
  const columns = [
    {
      field: "id",
      headerName: "#",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "first_name",
      headerName: "First Name",
      width: 260,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "last_name",
      headerName: "Last Name",
      width: 260,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      width: 180,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              className={
                params.value === "active" ? "btn btn-primary" : "btn btn-danger"
              }
              size="small"
            >
              {params.value.charAt(0).toUpperCase() + params.value.slice(1)}
            </Button>
          </Stack>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      width: 180,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              className="btn btn-warning"
              color="warning"
              size="large"
              onClick={(e) => {
                const currentRow = params.row;
                setFirstName(currentRow.first_name);
                setlastName(currentRow.last_name);
                setEmail(currentRow.email);
                setStatus(currentRow.status);
                setPassword("");

                return setEdt(currentRow.id);
              }}
            >
              <i className="fas fa-edit"></i>
            </Button>
            <Button
              variant="outlined"
              color="error"
              className="btn btn-danger"
              size="large"
              onClick={(e) => {
                const currentRow = params.row;
                return setDlt(currentRow.id);
              }}
            >
              <i className="fas fa-trash"></i>
            </Button>
          </Stack>
        );
      },
    },
  ];
  const rows = agencys.map((item, itemIndex) => {
    return {
      id: item._id,
      first_name: item.first_name,
      last_name: item.last_name,
      email: item.email,
      status: item.status,
    };
  });
  const modals = agencys.map((item) => {
    return [
      <Modal
        show={edt === item._id ? true : false}
        onHide={() => {
          setEdt("");
        }}
        size="lg"
        centered
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>Edit agency</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUpdate}>
        <Modal.Body>
        <Row className="mb-3">
            <Form.Group
              as={Col}
              md="12"
              className="mb-3"
              controlId="validationCustom01"
            >
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="first_name"
                value={firstname}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                type="text"
                placeholder="First Name"
              />
              <Form.Control.Feedback type="invalid">
                Please enter first name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="12"
              className="mb-3"
              controlId="validationCustom01"
            >
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="last_name"
                value={lastname}
                onChange={(e) => {
                  setlastName(e.target.value);
                }}
                type="text"
                placeholder="Last Name"
              />
              <Form.Control.Feedback type="invalid">
                Please enter last name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="12"
              className="mb-3"
              controlId="validationCustom02"
            >
              <Form.Label>Email address</Form.Label>
              <Form.Control
                autoComplete="off"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                name="email"
                type="email"
                placeholder="Email address"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group as={Col} md="12" controlId="validationCustomUsername">
              <Form.Label>Password</Form.Label>
              <Form.Control
                autoComplete="off"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                name="password"
                min="6"
                type="password"
                placeholder="Password"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a password
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" className="mt-3" controlId="validationCustomUsername">
              <Form.Label>Status</Form.Label>
              <Switch color="success" checked={status==="active" ? true : false} onChange={()=>{return status==="active" ? setStatus("blocked") : setStatus("active")}} />
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setEdt("");
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit">Save Changes</Button>
        </Modal.Footer>
        </Form>
      </Modal>,
      <Modal
        show={dlt === item._id ? true : false}
        onHide={() => {
          setDlt("");
        }}

        centered
      >
        <Modal.Header>
          <Modal.Title>Delete agency</Modal.Title>
        </Modal.Header>
        <Modal.Body>Areyou sure you want delete this agency?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setDlt("");
            }}
          >
            Cancel
          </Button>
          <Button variant="danger">Yes</Button>
        </Modal.Footer>
      </Modal>,
    ];
  });
  return [
    <div className="float-right m-3">
      <Fab
        onClick={() => {
          setAdd(true);
        }}
        color="primary"
        aria-label="add"
        sx={{ width: 45, height: 45, position: "inherit" }}
      >
        <AddIcon />
      </Fab>
    </div>,
    <Modal
      show={add}
      onHide={handleCloseAdd}
      backdrop="static"
      centered
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>Add new agency</Modal.Title>
      </Modal.Header>
      <Form
        validated={valadd}
        noValidate
        autoComplete={"off"}
        onSubmit={handleAdd}
      >
        <Modal.Body>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="12"
              className="mb-3"
              controlId="validationCustom01"
            >
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="first_name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                required
                type="text"
                placeholder="First Name"
              />
              <Form.Control.Feedback type="invalid">
                Please enter first name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="12"
              className="mb-3"
              controlId="validationCustom01"
            >
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="last_name"
                onChange={(e) => {
                  setlastName(e.target.value);
                }}
                required
                type="text"
                placeholder="Last Name"
              />
              <Form.Control.Feedback type="invalid">
                Please enter last name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="12"
              className="mb-3"
              controlId="validationCustom02"
            >
              <Form.Label>Email address</Form.Label>
              <Form.Control
                autoComplete="off"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                name="email"
                required
                type="email"
                placeholder="Email address"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group as={Col} md="12" controlId="validationCustomUsername">
              <Form.Label>Password</Form.Label>
              <Form.Control
                autoComplete="off"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                name="password"
                min="6"
                type="password"
                placeholder="Password"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a password
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdd}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>,
    <br />,
    <br />,
    <br />,
    <div
      style={{ display: "table", tableLayout: "fixed", width: "100%" }}
      className="mt-3"
    >
      <DataGrid
        className="m-1"
        style={{ height: 500 }}
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
      {modals}
    </div>,
  ];
}
