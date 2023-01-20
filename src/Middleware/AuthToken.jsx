import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
function AuthToken(error) {
  if(error.response){
    switch (error.response.status) {
      case 400:
        toast.error(`${error.response.data.msg}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        break;
      case 401:
        localStorage.removeItem("admin-token");
        sessionStorage.removeItem("admin-token");
        window.location.href = "/login";
        break;
      case 500:
        toast.error(`Internal Server Error. Please try again later.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        break;
      default:
        
        break;
    }
  }
  else return toast.error(`Internal Server Error. Please try again later.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });

}

export default AuthToken;
