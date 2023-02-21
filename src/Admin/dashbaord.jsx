import React, { useState, useEffect } from "react";
import "./../dashboard/plugins/fontawesome-free/css/all.min.css";
import "./../dashboard/plugins/icheck-bootstrap/icheck-bootstrap.min.css";
import "./../dashboard/dist/css/adminlte.min.css";
import "./../dashboard/plugins/bootstrap/js/bootstrap.bundle.min.js";
import "./../dashboard/dist/js/adminlte.min.js";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
export default function Dashboard() {
  const [blog, setBlog] = useState("");
  const [article, setArticle] = useState("");
  const [rel, setRel] = useState(false);
  const [description, setDescription] = useState("");
  const [description1, setDescription1] = useState("");
  const [validated, setValidated] = useState(false);
  const [validated1, setValidated1] = useState(false);
  const API_KEY = "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";
  const MODEL_ENDPOINT =
    "https://api.openai.com/v1/engines/davinci/completions";

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
      const prompt = `Please generate a blog about ${blog} in english`;
      const response = await fetch(MODEL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: 100,
          n: 1,
          stop: "\n",
        }),
      });

      const data = await response.json();

      setDescription(data.choices[0].text);
      setRel(false);
    }
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
      const response = await fetch(MODEL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          prompt: `Please generate an blog about ${blog}`,
          max_tokens: 10,
          n: 1,
          stop: "\n",
        }),
      });

      const data = await response.json();

      setDescription(data.choices[0].text);
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
      const prompt = `Please generate a article about ${article} in english`;
      const response = await fetch(MODEL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: 10,
          n: 1,
          stop: "\n",
        }),
      });

      const data = await response.json();

      setDescription1(data.choices[0].text);
      setRel(false);
    }
  }
  return [
    <div className="m-3">
      <br />
      <Form noValidate validated={validated} onSubmit={generateDescription}>
        <label htmlFor="blog">Blog</label>
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
            <button className="btn btn-primary m-3">Generate</button>
          ) : (
            <button type="submit" className="btn btn-primary">
              <Spinner animation="border" variant="light" />
            </button>
          )}
        </div>
      </Form>
      <br />
      <div className="m-3">{description}</div>
    </div>,
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
            <button className="btn btn-primary m-3">Generate</button>
          ) : (
            <button type="submit" className="btn btn-primary">
              <Spinner animation="border" variant="light" />
            </button>
          )}
        </div>
      </Form>
      <br />
      <div className="m-3">{description1}</div>
    </div>,
  ];
}
