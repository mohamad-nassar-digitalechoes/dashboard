import  { Component } from 'react';



class Middleware extends Component
{
    static baseURL="http://localhost:3001/api";
    static openaiURL="https:api.openai.com/v1/completions";
    static openaiImageURL=`https://api.openai.com/v1/images/generations`;
    static openaiKEY="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";
    static header={
        "admin-token":
          localStorage.getItem("admin-token") ||
          sessionStorage.getItem("admin-token"),
      };
}

export default Middleware;