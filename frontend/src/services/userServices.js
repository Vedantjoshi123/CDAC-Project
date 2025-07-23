import axios from 'axios'
import {config} from './config'

export async function insertData(firstName, lastName, email, password, dob, userRole){
    try {
    const signupUrl = `${config.serverUrl}/auth/register`
    const body = {
        firstName, lastName, email, password, dob, userRole
    }
    const response = await axios.post(signupUrl, body)
     return {
            status: 'success',
            ...response.data
        };
     } catch (error) {
            console.error("Registration error:", error.response?.data || error.message);
            return { status: "error", message: error.response?.data?.message || "Something went wrong" };
    }
}

// Login user
export async function loginUser(email, password) {
  try {
    const loginUrl = `${config.serverUrl}/auth/login`;
    const body = { email, password };
    const response = await axios.post(loginUrl, body);
    return {
      status: 'success',
      ...response.data
    };
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    return { status: "error", message: error.response?.data?.message || "Invalid credentials" };
  }
}

