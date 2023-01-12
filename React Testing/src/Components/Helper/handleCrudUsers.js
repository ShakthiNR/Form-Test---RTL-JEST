import Axios from "axios";
const url = "http://localhost:5000/api";

const errorMsg = { error: "Something is Wrong in Server, Get Back Later" };
const successMsg = [
  { data: "User Created Successfully!!" },
  { data: "User Deleted Successfully!!" },
  { data: "User Updated Successfully!!" },
];

export const getUsers = async () => {
  try {
    const resp = await Axios.get(`${url}/get/users`);
    const data = await resp.data;
    return { data: data };
  } catch (err) {
    if(err.response){
      return {error:err.response.data.error || errorMsg.error  };
    }
    return errorMsg;
  }
};

export const addUser = async (userData) => {
  try {
   await Axios.post(`${url}/create/user`, userData);
 
    return successMsg[0];
  } catch (err) {
    if(err.response.data.error){
      return {error:err.response.data.error};
    }
    return errorMsg;
    
  }
};

export const deleteUser = async (userId) => {

  try {
     await Axios.delete(`${url}/delete/user/${userId}}`);
   
    return successMsg[1];
  } catch (err) {
    if(err.response){
      return {error:err.response.data.error};
    }
    return errorMsg;
  }
};

/// Not Used in Component
export const updateUser = async (userId, userData) => {
  try {
    await Axios.put(`${url}/update/user/${userId}`, userData);
   
    return successMsg[2];
  } catch (err) {
    console.log("Error", err);
    return errorMsg;
  }
};
