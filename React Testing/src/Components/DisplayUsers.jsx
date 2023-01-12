import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { addUser, deleteUser, getUsers } from './Helper/handleCrudUsers'

const DisplayUsers = () => {

    const [user,setUser] = useState({username:"",email:""})
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");
    const [successMsg,setSuccessMsg] = useState("")


    const fetchUsers = async ()=>{
        const resp= await getUsers()
        if (resp.error) {
            setResults([]);
            setError(resp.error);
            return;
        }
          setResults(resp.data);
          setError("");
    }
    
    useEffect(()=>{
        fetchUsers()
    },[])

    const handleChange =(e)=>{
        setUser({
            ...user,[e.target.name]:e.target.value
        })
    }

    const createUser =async (userDetails)=>{
        try{
           const resp = await addUser(userDetails)
           if(resp.error){
            setError(resp.error)
            setSuccessMsg("")
            return
           }
           setSuccessMsg(resp.data)
           fetchUsers()
           setError("")
        }catch(err){
            console.log("Error in fetching",err.message);
        }
        
    }

    const handleSubmit =(e)=>{
        e.preventDefault()
        if(user.username ==="" || user.email === ""){
            setError("Please Enter All Input Fields")
            return
        }
        createUser(user)
    }


    

    const removeUser = async (userId)=>{
        try{
            await deleteUser(userId)
            fetchUsers()
            setSuccessMsg("User Deleted Successfully")
        }catch(err){
            console.log("Error ",err)
        }

    }
    const handleDelete =(userId)=>{

        removeUser(userId)
    }

    const removeSuccessErrorMsg =()=>{
        if(successMsg){
            setTimeout(()=>{
                setSuccessMsg("")
             },5000)
        }else if(error){
            setTimeout(()=>{
                setError("")
             },5000)
        }else{
            return
        }
        
    }

  return (
    <React.Fragment>

      <center>
        <Link to="/"> Go Home</Link>
      </center> <br/>

        <center>
            <h2>CRUD - Users</h2>
        </center>
        {error && <center className="error">{error}</center>} 
        {successMsg && <center className='success'>{successMsg}</center>} 
        { (error || successMsg )&& removeSuccessErrorMsg()} 
        <div className='form'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Name Of The User</label> <br/>
                <input type="text" name="username" id="username" value={user.username} placeholder="Enter User's Name" onChange={handleChange}/>
                <br/>
                <label htmlFor="email">Email Address</label><br/>
                <input type="email" id="email" name='email' value={user.email} placeholder="Enter User's Email Address" onChange={handleChange} />
                <br/>
                <center>
                    <button type="submit">Create User</button>
                </center>
            </form>

        </div>


    {!error && results?.length === 0 ? (
        <p className="loading"> Loading ....</p>
      ) : (
       <div className='layout'>
            <ul className="users--layout">
            {results?.map((result) => {
                const {id, username, email, phone} = result;
                return (
                    <SingleUser key={email}
                    handleDelete={handleDelete}
                    userId={id}
                    username={username}
                    email={email}
                    phone={phone}
                    />
                );
            })}
            </ul>
        </div> 
      )}

    </React.Fragment>
  )
}

export default DisplayUsers



const SingleUser =({ userId,username, email, phone,handleDelete,handleUpdate})=>{

    return (
    <div  className='user'>
        <div className='icons'>
            <button onClick={()=>{handleDelete(userId)}} 
            className='delete--icon' title='Delete-User'
            data-testid ={`delete-btn-${userId}`}
            >X</button>
        </div>
    <li data-testid="user">
        <p> {username}</p>
        <p>{email}</p>
        <p>{phone}</p>
        {/* <center>
            <div onClick={()=>{handleUpdate(userId)}} className='update--icon' title='Update-User'>Update </div>
        </center> */}
    </li>
  </div>)
}