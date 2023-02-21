import './App.css';
import {BrowserRouter as Router,Switch,Route, Redirect} from 'react-router-dom'
import login from './Admin/login';
import { useState } from 'react';
import {ProtectedRoute, PublicRoute} from "./routes/routes";
import { ToastContainer } from "react-toastify";
import Dashboard from './Admin/dashbaord';
import Admins from './Admin/admin';
import Agencies from './Admin/agency';
import Resizing from './Admin/resizing';
function App() {
  // eslint-disable-next-line
  var [isAuth]=useState(false);
  if(localStorage.getItem("admin-token") || sessionStorage.getItem("admin-token")) {isAuth=true;}
  return [
    <Router>
       <ToastContainer />
      <Switch>
        <ProtectedRoute exact path="/" component={Dashboard} />
        <PublicRoute exact path="/login" component={login} />
        <ProtectedRoute isAuth={isAuth} path="/admin/blog" component={Dashboard} />
        <ProtectedRoute role={["Admin"]} isAuth={isAuth} path="/admin/admins" component={Admins} />
        <ProtectedRoute role={["Admin"]} isAuth={isAuth} path="/admin/agency" component={Agencies} />
        <ProtectedRoute role={["Admin","Agency"]} isAuth={isAuth} path="/admin/brand" component={Dashboard} />
        <ProtectedRoute isAuth={isAuth} path="/admin/users" component={Dashboard} />
        <ProtectedRoute isAuth={isAuth} path="/admin/resizing" component={Resizing} />
      </Switch>
    </Router>
    
  ];
}

export default App;
