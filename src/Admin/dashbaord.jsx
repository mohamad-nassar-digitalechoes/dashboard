import React, { useState, useEffect } from "react";
import "./../dashboard/plugins/fontawesome-free/css/all.min.css";
import "./../dashboard/plugins/icheck-bootstrap/icheck-bootstrap.min.css";
import "./../dashboard/dist/css/adminlte.min.css";
import "./../dashboard/plugins/bootstrap/js/bootstrap.bundle.min.js";
import "./../dashboard/dist/js/adminlte.min.js";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import {OpenAIApi,Configuration} from "openai"; 
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Countries from "../countries";
// import Autocomplete from '@mui/material/Autocomplete';
// import { TextField,Box } from "@mui/material";
import axios from "axios";
import Middleware from "../Middleware/middleware";
import AuthToken from "../Middleware/AuthToken";
export default function Dashboard() {
  const [brand,setBrand]=useState({
    name:'',
    industry:'',
    slogan:'',
    website:'',
    address:'',
    country:'',
    state:'',
    country:'',
    city:'',
    zip:'',
    code:'',
    phone:'',
    email:''
  });
  const [brd,setBrd]=useState(false);
  const [valbrand,setValbrand]=useState(false);
  const [blog, setBlog] = useState("");
  const [img, setImg] = useState("");
  const [article, setArticle] = useState("");
  const [rel, setRel] = useState(false);
  const [description, setDescription] = useState("");
  const [description1, setDescription1] = useState("");
  const [validated, setValidated] = useState(false);
  const [validated1, setValidated1] = useState(false);
  const API_KEY = "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";
  const MODEL_ENDPOINT = "https:api.openai.com/v1/completions";

  async function submitbrand(event)
  {
    event.preventDefault();
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValbrand(true);
    if (form.checkValidity() === true) {
      const req={name:brand.name,industry:brand.industry,slogan:brand.slogan,website:brand.website,address:brand.address,country:brand.country,state:brand.state,city:brand.city,zip:brand.zip,phone:brand.code+""+brand.phone,email:brand.email};
      await axios.post(`${Middleware.baseURL}/admin/brand/create`,req,{headers:Middleware.header}).then(()=>{
        window.location.reload();
      }).catch((error)=>{
        AuthToken(error);
      });
    }
  }
  async function check()
  {
    await axios.post(`${Middleware.baseURL}/admin/brand/check`,{},{headers:Middleware.header}).then((response)=>{
      if(response.data.status===200)
      {
        setBrd(true);
      }
      else setBrd(false);
    });
  }
  async function generateDescription(event) {
    event.preventDefault();
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
    if (form.checkValidity() === true) {
      setRel(true);
      // const prompt = `Please write short blog post about ${blog} in english`;
      // const prompt = `Write a blog article with at least 1000 words with new line for each paragraph.Write title, sub-titles and conclusion with new line for each section. The blog article is about ${blog}`;
      const prompt=`Write one idea title for an article about ${blog}`
      const response = await fetch(Middleware.openaiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Middleware.openaiKEY}`,
        },
        body: JSON.stringify({
          model: 'text-davinci-003',
          prompt: prompt,
          max_tokens: 2048,
          temperature: 1.0,
          top_p: 1.0,
          frequency_penalty: 0.5,
          presence_penalty: 0.0,
        }),
      });


        // const image=await fetch(Middleware.openaiImageURL, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${process.env.REACT_APP_OPENAIKEY}`,
        //   },
        //   body: JSON.stringify({
        //     model: "image-alpha-001",
        //     prompt: `i need facebook logo`,
        //     n:1,
        //     size:'512x512',
        //     response_format:"url"
        //     // max_tokens: 2048,
        //     // temperature: 1.0,
        //     // top_p: 1.0,
        //     // frequency_penalty: 0.5,
        //     // presence_penalty: 0.0,
        //   }),
        //   }).then((response)=>{
        //     console.log(response);
        //   })

       
      const data = await response.json();

      setDescription(data.choices[0].text);
      setArticle(data.choices[0].text);
      setRel(false);


    }
  }
    async function generateDescription1(event) {
    event.preventDefault();
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated1(true);
    if (form.checkValidity() === true) {
      setRel(true);
       // const prompt = `Please write short blog post about ${blog} in english`;
      // const prompt = `Write a blog article with at least 1000 words with new line for each paragraph.Write title, sub-titles and conclusion with new line for each section. The blog article is about ${blog}`;
      const prompt=`Write a blog post about ${article}. Your post should be at least 1000 words long and should include a catchy title, several subheadings, and a conclusion. Make sure to provide valuable insights and useful information for your readers`
      const response = await fetch(Middleware.openaiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Middleware.openaiKEY}`,
        },
        body: JSON.stringify({
          model: 'text-davinci-003',
          prompt: prompt,
          max_tokens: 2048,
          temperature: 1.0,
          top_p: 1.0,
          frequency_penalty: 0.5,
          presence_penalty: 0.0,
        }),
      });
      const config=new Configuration({
        apiKey:Middleware.openaiKEY,
      });
    const openai=new OpenAIApi(config);
    const image=await openai.createImage({
      prompt:`${article}`,
      n:1,
      size:'512x512'
    });
    setImg(image.data.data[0].url)
      const data = await response.json();

      setDescription1(data.choices[0].text);
      setRel(false);
    }
  }
// useEffect(()=>{
//   check();
// },[])
return[
//   !brd? 
//   <fieldset>
//   <legend>General Information</legend>
//   <Form noValidate autoComplete="off" validated={valbrand} onSubmit={submitbrand}>
//     <Row>
//   <Form.Group className="mb-3" as={Col} md="12">
//       <Form.Control type="text" placeholder="Business name" required onChange={(e)=>{setBrand({
//         ...brand,
//         name:e.target.value
//       })}} />
//       <Form.Control.Feedback type="invalid">
//         Please provide a valid name.
//       </Form.Control.Feedback>
//     </Form.Group>
//     <Form.Group as={Col} md="12" className="mb-3">
//       <Form.Control type="text" placeholder="Industry" required onChange={(e)=>{setBrand({
//         ...brand,
//         industry:e.target.value
//       })}} />
//       <Form.Control.Feedback type="invalid">
//         Please provide a valid industry.
//       </Form.Control.Feedback>
//     </Form.Group>
//     <Form.Group as={Col} md="12" className="mb-3">
//       <Form.Control type="text" placeholder="Slogan" required onChange={(e)=>{setBrand({
//         ...brand,
//         slogan:e.target.value
//       })}}/>
//       <Form.Control.Feedback type="invalid">
//         Please provide a valid slogan.
//       </Form.Control.Feedback>
//     </Form.Group>
//     <Form.Group as={Col} md="12" className="mb-3">
//       <Form.Control type="text" placeholder="Website" required onChange={(e)=>{setBrand({
//         ...brand,
//         website:e.target.value
//       })}}/>
//       <Form.Control.Feedback type="invalid">
//         Please provide a valid website.
//       </Form.Control.Feedback>
//     </Form.Group>
//     <Form.Group as={Col} md="12" className="mb-3">
//       <Form.Control type="text" placeholder="Address" required onChange={(e)=>{setBrand({
//         ...brand,
//         address:e.target.value
//       })}}/>
//       <Form.Control.Feedback type="invalid">
//         Please provide a valid address.
//       </Form.Control.Feedback>
//     </Form.Group>
//     <Form.Group as={Col} md="6" className="mb-3">
//     <Autocomplete
    
//   id="country-select-demo"
//   options={Countries.country}
//   getOptionLabel={(option) => option.name}
//   renderOption={(props, option) => (
//     <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
//       <img
//         loading="lazy"
//         width="20"
//         src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
//         srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
//         alt=""
//       />
//       {option.name} ({option.code})
//     </Box>
//   )}
//   renderInput={(params) => (
//     <TextField
//     onChange={(e)=>{setBrand({
//       ...brand,
//       country:e.target.value
//     })}}
//     required
//       {...params}
//       label="Choose a country"
//       inputProps={{
//         ...params.inputProps,
//         autoComplete: 'new-password', // disable autocomplete and autofill
//       }}
//     />
//   )}
// />
//       <Form.Control.Feedback type="invalid">
//         Please provide a valid country.
//       </Form.Control.Feedback>
//     </Form.Group>
//     <Form.Group as={Col} md="6" className="mb-3">
//       <Form.Control type="text" placeholder="State" required style={{ "height":"60px" }} onChange={(e)=>{setBrand({
//         ...brand,
//         state:e.target.value
//       })}}/>
//       <Form.Control.Feedback type="invalid">
//         Please provide a valid state.
//       </Form.Control.Feedback>
//     </Form.Group>
//     <Form.Group as={Col} md="6" className="mb-3">
//       <Form.Control type="text" placeholder="City" required onChange={(e)=>{setBrand({
//         ...brand,
//         city:e.target.value
//       })}}/>
//       <Form.Control.Feedback type="invalid">
//         Please provide a valid City.
//       </Form.Control.Feedback>
//     </Form.Group>
//     <Form.Group as={Col} md="6" className="mb-3">
//       <Form.Control type="text" placeholder="Zip Code" required onChange={(e)=>{setBrand({
//         ...brand,
//         zip:e.target.value
//       })}}/>
//       <Form.Control.Feedback type="invalid">
//         Please provide a valid zip code.
//       </Form.Control.Feedback>
//     </Form.Group>
//     <Form.Group as={Col} md="3" className="mb-3">
//     <Autocomplete
//   id="country-select-demo"
//   options={Countries.country}
  
//   getOptionLabel={(option) => option.dial_code}
//   renderOption={(props, option) => (
//     <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
//       <img
//         loading="lazy"
//         width="20"
//         src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
//         srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
//         alt=""
//       />
//       {option.name} ({option.dial_code})
//     </Box>
//   )}
//   renderInput={(params) => (
//     <TextField
//     onChange={(e)=>{setBrand({
//       ...brand,
//       code:e.target.value
//     })}}
//     required
//       {...params}
//       label="Choose a country"
//       inputProps={{
//         ...params.inputProps,
//         autoComplete: 'new-password', // disable autocomplete and autofill
//       }}
//     />
//   )}
// />
//       <Form.Control.Feedback type="invalid">
//         Please provide a valid country.
//       </Form.Control.Feedback>
//     </Form.Group>
//     <Form.Group as={Col} md="9" className="mb-3">
//       <Form.Control type="text" placeholder="Phone" required style={{ "height":"60px" }} onChange={(e)=>{setBrand({
//         ...brand,
//         phone:e.target.value
//       })}}/>
//       <Form.Control.Feedback type="invalid">
//         Please provide a valid phone number.
//       </Form.Control.Feedback>
//     </Form.Group>
//     <Form.Group as={Col} md="12" className="mb-3">
//       <Form.Control type="email" placeholder="Email" required onChange={(e)=>{setBrand({
//         ...brand,
//         email:e.target.value
//       })}}/>
//       <Form.Control.Feedback type="invalid">
//         Please provide a valid email.
//       </Form.Control.Feedback>
//     </Form.Group>
//     <Form.Group as={Col} md="12" className="mb-3" align="center">
//       <button className="btn btn-primary">Save & Continue</button>
//     </Form.Group>
//     </Row>
//   </Form>
// </fieldset>
// :
<div>
<div className="m-3">
      <br />
      <Form noValidate validated={validated} onSubmit={generateDescription}>
        <label htmlFor="blog">Title</label>
        <div className="input-group mb-3">
          <input
            type={"text"}
            required
            className="form-control"
            placeholder="Subject"
            onChange={(e) => {
              setBlog(e.target.value);
            }}
          />

          <Form.Control.Feedback type="invalid">
            Please enter your subject here.
          </Form.Control.Feedback>
        </div>
        <div>
          <br />
          {rel === false ? (
            <button type="submit" className="btn btn-primary m-3">Generate</button>
          ) : (
            <button type="button" className="btn btn-primary">
              <Spinner animation="border" variant="light" />
            </button>
          )}
        </div>
      </Form>
      <br />
      <div className="m-3">{description.split("\n").slice(1).map((line,index)=>(
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}</div>
    </div>
    <div className="m-3">
      <br />
      <Form noValidate validated={validated1} onSubmit={generateDescription1}>
        <label htmlFor="article">Article</label>
        <div className="input-group mb-3">
          <input
            type={"text"}
            required
            className="form-control"
            placeholder="Subject"
            value={description}
            onChange={(e) => {
                setArticle(e.target.value);
            }}
          />

          <Form.Control.Feedback type="invalid">
            Please enter your subject here.
          </Form.Control.Feedback>
        </div>
        <div>
          <br />
          {rel === false ? (
            <button type="submit" className="btn btn-primary m-3">Generate</button>
          ) : (
            <button type="button" className="btn btn-primary">
              <Spinner animation="border" variant="light" />
            </button>
          )}
        </div>
      </Form>
      <br />
      <div className="m-3">
        <img src={img} alt="" />
        {description1.split("\n").slice(1).map((line,index)=>(
          <React.Fragment key={index}>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }}>{line}</div>
          <br />
        </React.Fragment>
        
      ))}</div>
    </div>
    </div>
];  
}
