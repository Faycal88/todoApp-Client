import "./todo.css";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Todo({ todo, index, markTodo, removeTodo }) {
  return (
    <div className="todo">
      <span
        style={{ textDecoration: todo.isDone === true ? "line-through" : "" }}
      >
        {todo.text}
      </span>
      <div>
        <Button variant="outline-success" onClick={() => markTodo(index)}>
          ✓
        </Button>{" "}
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>
          ✕
        </Button>
      </div>
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>
          <b>Add Todo</b>
        </Form.Label>
        <Form.Control
          type="text"
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add new todo"
        />
      </Form.Group>
      <Button variant="primary mb-3" type="submit">
        Submit
      </Button>
    </Form>
  );
}

function dispatchAction(newTodos) {
  const token = localStorage.getItem("todo");
  const options = {
    url: "http://localhost:4000/todo/add",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: token,
    },
    data: {
      list: newTodos,
    },
  };
  axios(options).then((response) => {
    const { data } = response;
    return data;
  });
}

function TodoComponent() {
  const [todos, setTodos] = React.useState([]);
  const [done, setDone] = React.useState([{}]);

  useEffect(() => {
    const token = localStorage.getItem("todo");
    const options = {
      url: "http://localhost:4000/todo/get",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: token,
      },
    };
    axios(options).then((response) => {
      const { data } = response.data;
      console.log(data);
      setTodos(data.list.todos);
    });
  }, []);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
    dispatchAction(newTodos);
  };

  const markTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
    setDone(newTodos);
    dispatchAction(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    dispatchAction(newTodos);
  };

  const logOut = () => {
    localStorage.removeItem("todo");
    localStorage.removeItem("list");
    window.location.reload();
  };

  return (
    <div className="app">
      <nav
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <div></div>
        <h1 className="text-center mb-4">Todo List</h1>
        <Button onClick={logOut} class="btn btn-danger mb-4">
          Logout
        </Button>
      </nav>
      <div className="container">
        <FormTodo addTodo={addTodo} />
        <div className="TodosBody">
          {todos.map((todo, index) => (
            <Card>
              <Card.Body>
                <Todo
                  key={index}
                  index={index}
                  todo={todo}
                  markTodo={markTodo}
                  removeTodo={removeTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoComponent;
