const { validationResult } = require("express-validator")
const { getUsers, saveUserData } = require("../Utils/userModelFn")

//Get Users
exports.getUsers = (req,res)=>{
    const usersData = getUsers()
    res.status(200).send(usersData)
}

//Get Unique User
exports.getUniqueUser = (req,res)=>{

    const userId = req.params.id
    const usersData = getUsers()
    const findUser= usersData.find(user =>user.id === parseInt(userId))

    if(!findUser){
        return res.status(404).json({msg:"User Not Found"})
    }
    return res.status(200).json(findUser)
}


//Create User
exports.createUser = (req,res)=>{

    const existUserData = getUsers()
    const newUserData = req.body;

    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(422).json({error:error.errors[0].msg})
    }
   


    // if( !newUserData.id || !newUserData.username || !newUserData.email || newUserData.id ===null || newUserData.username ===null || newUserData.email ===null){
    //     return res.status(401).send({error:"Id, Username, Email fields are required"})
    // }

    const findUser = existUserData.find(user => user.email === newUserData.email)

    if(findUser){
        return res.status(409).send({error:"User Mail Already exists"})
    }
   
    newUserData.id = Date.now()
    
    
    

    existUserData.push(newUserData)

    saveUserData(existUserData)

    res.status(200).send({msg:"User Created Successfully"})

}


//Update User
exports.updateUser = (req,res)=>{

    const userId = req.params.id 
    const patchUserData = req.body
    const existUserData = getUsers()
    const findUser = existUserData.find(user => user.id === parseInt(userId))

    if(!findUser){
        return res.status(404).json({msg:"UserID not Found"})
    }

    const updateUser = existUserData.filter(user => user.id !== parseInt(userId))
    patchUserData.id = parseInt(userId) //change it to number 

    updateUser.push(patchUserData)  
    saveUserData(updateUser)
    return res.status(200).json({msg:"User Data Updated Successfully!!!"})
}

//Delete User
exports.deleteUser = (req,res)=>{

    const userId = req.params.id;
    const existUser = getUsers();
    const findUser = existUser.find((user)=>user.id === parseInt(userId))

    if(!findUser){
        return res.status(404).json({msg:"UserId Not Exists"})
    }

    const filterUser = existUser.filter((user)=>user.id !== parseInt(userId))
    saveUserData(filterUser)

    return res.status(200).json({msg:"User Details Deleted Successfully!!!"})

}