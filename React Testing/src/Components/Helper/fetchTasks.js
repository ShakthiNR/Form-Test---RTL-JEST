import Axios from "axios";
const url = "https://jsonplaceholder.typicode.com/todos/";

export const getTasks = async () => {
  try {
    const response = await Axios.get(url);
    if (response.status !== 200) {
      return {error:"Something is Wrong in Server, Get Back Later"}
    }
    const data = await response.data;
    return {data:data};
  } catch (err) {
    return {error:"Something is Wrong in Server, Get Back Later"}
  }
};
