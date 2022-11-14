import TodoComponent from "./components/todo";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate, useParams } from "react-router-dom";
import Login from "./components/Login";
import { NeedLogin } from "./components/protectedRoute";
import { ToastContainer } from "react-toastify";

function Credentials(params) {}

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/todo"
          element={<NeedLogin>{<TodoComponent />}</NeedLogin>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
