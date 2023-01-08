import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import DisplayTasks from "./Components/DisplayTasks"
import Home from "./Home";

const App = () => {
  return (
    <React.Fragment>
      <center>
        <h1 aria-label="app-heading">React - Testing Library [JEST] </h1>
      </center>
      
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/get-tasks" element={<DisplayTasks/>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;

const ErrorPage = () => {
  return (
    <center>
      Error 404, Page Not Found !!! <Link to="/">Go Home</Link>
    </center>
  );
};
