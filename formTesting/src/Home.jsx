import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <React.Fragment>
      <center className="links">
        <Link to="/sign-in"> Sign In </Link>
        <Link to="/sign-up"> Sign Up </Link>
      </center>
    </React.Fragment>
  );
};

export default Home;
