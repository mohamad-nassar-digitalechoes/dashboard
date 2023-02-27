import React,{useState,useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
export default function Emails()
{
    const [sub,setSub]=useState("");
    
    return[
        <div>
            <Form noValidate className='m-3'>
            <div className="input-group mb-3">
              <input
                required
                type="text"
                className="form-control"
                placeholder="What do you want to talk about"
              />

              <Form.Control.Feedback type="invalid">
                Please enter your subject.
              </Form.Control.Feedback>
            </div>
            <Button variant='primary' type='submit'>Get</Button>
            </Form>
           
        </div>
    ];
}