import './App.css';
import {BrowserRouter as Router,Switch,Route, Redirect} from 'react-router-dom'
import login from './Admin/login';
import { useState } from 'react';
import {ProtectedRoute, PublicRoute} from "./routes/routes";
import { ToastContainer } from "react-toastify";
import Dashboard from './Admin/dashbaord';
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
      </Switch>
    </Router>
    
  ];
}

export default App;
