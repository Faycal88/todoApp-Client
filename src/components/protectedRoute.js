import React from "react";
import { Await, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Login from "./Login";

export const NeedLogin = ({ children }) => {
  const [child, setChild] = useState(children);
  console.log(child);

  if (!localStorage.getItem("todo")) {
    return <Login />;
  } else {
    const token = localStorage.getItem("todo");
    const options = {
      url: "https://todo-app-fv6xa.ondigitalocean.app/getToken",
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    };

    axios(options)
      .catch((error) => {
        console.log(error);
        return null;
      })
      .then((e) => {
        const { status } = e;
        console.log(status);
        if (requestApproval(children, status)) {
          return setChild(children);
        } else if (!requestApproval(children, status)) {
          setChild(<Login />);
        }
      });
    return child;
  }
};

function requestApproval(child, value) {
  return child ? value === 202 : <Navigate to="/" />;
}
