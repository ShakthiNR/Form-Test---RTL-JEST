import React, { useState } from "react";
import { Link } from "react-router-dom";
import validator from "validator";


const SignUp = () => {
  const [values,setValues] = useState({
    email:"",
    password:"",
    confirmPassword:""
  })
const [error,setError] = useState("")
  const handleChange =(e)=>{
    setValues({
      ...values,[e.target.name]:e.target.value
    })
  }

  const handleSubmit =(e)=>{
    e.preventDefault();
    if(values.email===""){
      setError("Please Enter User's Email Address")
    }else if(!validator.isEmail(values.email)){
      setError("Please Enter Valid Email Address")
    }else if(values.password ===""){
      setError("Please Enter Password")
    }else if(values.password.length < 5){
      setError("Please Enter Password with more than 5 Characters")
    }
    else if(values.confirmPassword ===""){
      setError("Please Enter Confirm Password")
    }else if(values.confirmPassword !== values.password){
      setError("Passwords are Not Matched!!!")
    }else{
      setError("")
    }


    
  }
  return (
    <React.Fragment>
      <center>
        <Link to="/">Go Home</Link>
      </center>
      <header>
        <h1>Sign - Up Form</h1>
      </header>
      {
        error && <center className="error">{error}</center>
      }
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="user-email">Enter User Email Address</label> <br/>
            <input
              type="email"
              name="email"
              id="user-email"
              placeholder="Enter User's Email Address"
              onChange={handleChange}
            /><br/>
          </div>

          <div>
            <label htmlFor="password">Enter Password</label><br/>
            <input
              type="password"
              name="password"
              aria-label="password"
              id="password"
              placeholder="Enter Password"
              onChange={handleChange}
            /><br/>
          </div>

          <div>
            <label htmlFor="confirm-password">Enter Confirm Password</label><br/>
            <input
              type="password"
              name="confirmPassword"
              id="confirm-password"
              placeholder="Enter Confirm Password"
              onChange={handleChange}
            /><br/>
          </div>

          <center>
              <button type="submit">Sign Up</button>
          </center>
        </form>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
