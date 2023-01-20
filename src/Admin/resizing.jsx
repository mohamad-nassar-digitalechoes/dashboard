import React,{useState} from 'react';
import axios from 'axios';
import Middleware from '../Middleware/middleware';
import "./../dashboard/plugins/fontawesome-free/css/all.min.css";
import "./../dashboard/plugins/icheck-bootstrap/icheck-bootstrap.min.css";
import "./../dashboard/dist/css/adminlte.min.css";
import "./../dashboard/plugins/bootstrap/js/bootstrap.bundle.min.js";
import "./../dashboard/dist/js/adminlte.min.js";
import { saveAs } from 'file-saver'
import { toast } from 'react-toastify';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
export default function Resizing() {
    const [file,setFile]=useState(null);
    const [width,setWidth]=useState(0);
    const [height,setHeight]=useState(0);
    function handleFilenew(e){
            var output = document.getElementById("out");

            output.src = URL.createObjectURL(e.target.files[0]);
            output.onload = function() {
                URL.revokeObjectURL(output.src) 

        };
            setFile(e.target.files[0])
    }

    async function postfile(event)
    {
        event.preventDefault();
        if(file!=null)
        {
            const formData = new FormData();
            formData.append("image", file,file.name);
            if(width>0)
            {
                formData.append("width", width);
            }
            if(height>0)
            {
                formData.append("height", height);
            }
            const resposne=await axios.post(`${Middleware.baseURL}/resize`,formData).then((res) => {
                toast.success(`${res.data.msg}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                  });
                  saveAs(`${Middleware.mediaURL}/uploads/${res.data.file}`,`${res.data.file}`);
            })
            .catch((err) => {
                console.error(err);
            });
        }
        else
        {
            toast.error('Please select an image', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
              });
        }
        
    }



   
    return[
        <div align="center">
        <img id="out" width={width>0 ? width : ""} height={height>0 ? height : ""} /></div>,
         <Row style={{width:"90%"}} className="m-3">
         <Col md={6}><label htmlFor="">Width</label></Col>
         <Col md={6}><label htmlFor="">Height</label></Col>
     </Row>,
     <Row style={{width:"90%"}} className="m-3">
     <Col md={6}><input type="number" name="width" id="width" className='form-control' value={width} onChange={(e)=>{setWidth(e.target.value)}} step={100} min={0} /></Col>
     <Col md={6}><input type="number" name="height" id="height" className='form-control' value={height} onChange={(e)=>{setHeight(e.target.value)}} step={100} min={0} /></Col>
 </Row>,
        <input type="file" onChange={handleFilenew} className="form-control" />,
       <br />,
        <div align="center">
            <button onClick={postfile} className="btn btn-primary">Download</button>
        </div>
    ];
}