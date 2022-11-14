import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function validateEmail(a) {
  const emailFeild = document.getElementById("email");
  console.log(a);
  var filter =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (!filter.test(a)) {
    emailFeild.style.border = "2px solid red";

    return false;
  }
  emailFeild.style.border = "none";
  const options = {
    url: "https://todo-app-fv6xa.ondigitalocean.app/login",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Access-Control-Allow-Headers": "*",
    },
    data: {
      email: a,
    },
  };
  axios(options).then((response) => {
    const { data } = response;
    console.log(data);
    localStorage.setItem("todo", data.token);
    toast.success(data.message);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  });
}

function Login() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(localStorage.getItem("todo"));
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (user) {
      navigate("/todo");
    }
  }, [user]);

  return (
    <div>
      <div>
        <h1>Login Todo</h1>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          validateEmail(email);
        }}
      >
        <div class="form-group">
          <label for="inputEmail">Email</label>
          <input
            id="email"
            class="form-control"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div class="form-group">
          <label class="form-check-label">
            <input id="rememberMe" type="checkbox" /> Remember me
          </label>
        </div>
        <button class="btn btn-primary">Sign in</button>
      </form>
    </div>
  );
}

export default Login;
