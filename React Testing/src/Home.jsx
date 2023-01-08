import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <React.Fragment>
      <center>
        <h1> Welcome, User </h1>
      </center>
      <center className="links">
        <Link to="/sign-in"> Sign In </Link>
        <Link to="/sign-up"> Sign Up </Link>
        <Link to="/get-tasks"> Fetch API(Tasks) </Link>
      </center>
    </React.Fragment>
  );
};

export default Home;
