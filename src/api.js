import axios from "axios";

//const API_URL = "https://jsonplaceholder.typicode.com/users";
const API_URL = ""
export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// You can add more API functions here if necessary for Add, Edit, Delete.
