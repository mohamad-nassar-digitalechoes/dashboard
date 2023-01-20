import  { Component } from 'react';



class Middleware extends Component
{
    static baseURL="http://localhost:3001/api";
    static mediaURL="http://localhost:3001";
    static header={
        "admin-token":
          localStorage.getItem("admin-token") ||
          sessionStorage.getItem("admin-token"),
      };
}

export default Middleware;