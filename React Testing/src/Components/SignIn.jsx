import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import validator from 'validator'

const SignIn = () => {
    const [values,setValues] = useState({
        email:"",
        password:""
      })
    const [errors,setErrors] = useState("")
    
    const handleSubmit =(e)=>{
        e.preventDefault();
        if(values.email === ""){
          setErrors("Please Enter User's Email and Password")
        }
        else if(!validator.isEmail(values.email)){
          setErrors("Please Enter Valid Email-Address")
        }
        else if(values.password ===""){
          setErrors("Please Enter User's Password")
        }else{
          setErrors("")
        }
      }
    
      const handleChange =(e)=>{
        setValues({
          ...values,[e.target.name]:e.target.value
        })
      }
  return (
    <React.Fragment>
      <center>
        <Link to="/"> Go Home</Link>
      </center>
      <header>
        <h1 aria-label='form-heading'>Sign In Form</h1>
      </header>
         { errors && <center className='error'>{errors}</center>  }
      <div className='form'>
        <form onSubmit={handleSubmit}>          
          <div>
            <label htmlFor='email' > Enter Your Email Address</label><br/>
            <input type="email" id='email' aria-label='email' name='email' 
            onChange={handleChange} value={values.email} 
            placeholder='Enter User-Name'  />
          </div> <br/>
          <div>
            <label htmlFor='password' > Enter Your Password</label><br/>
            <input type="password" id='password' aria-label="password" name='password' 
            onChange={handleChange} value={values.password}
            placeholder='Enter User-Name'  />
          </div>
          <center>
            <button type="submit">Sign In</button>
          </center>
        </form>
      </div>
    </React.Fragment>
  )
}

export default SignIn