const fs = require('fs')


exports.getUsers =()=>{
    const jsonData = fs.readFileSync("./Utils/users.json")
    return JSON.parse(jsonData)
}


exports.saveUserData =(data)=>{
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync("./Utils/users.json",stringifyData)
}