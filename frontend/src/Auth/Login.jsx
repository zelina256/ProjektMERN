import React, { useState , useContext, useEffect } from "react"; 
import { Form, Button, Container } from "react-bootstrap"; 
import axios from "axios"; 
import {useNavigate} from "react-router-dom" 
import { UserContext } from "./UserContext"; 
const LogIn = () => { 
  const { userInfo, setUserInfo } = useContext(UserContext); 
 
  const [userLog, setUserLog] = useState({ 
    email: "", 
    password: "", 
  }); 
  const nav = useNavigate() 
  const handleChange = (e) => { 
    setUserLog({ ...userLog, [e.target.name]: e.target.value }); 
  }; 
    useEffect(() => { 
    if (userInfo && userInfo.id) { 
      nav("/user"); 
    } 
  }, [userInfo, nav]); 
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    await axios 
      .post("http://localhost:5000/login/", userLog, {withCredentials:true}) 
      .then((res) => nav("/user/")) 
      .catch((err) => console.log("Error not loged" + err)); 
       const userRes = await axios.get("http://localhost:5000/user", { withCredentials: true }); 
         setUserInfo(userRes.data); 
  }; 
  return ( 
    <Container> 
      <h1>Login Form</h1> 
      <Form onSubmit={handleSubmit}> 
        <Form.Group className="mb-3" controlId="email"> 
          <Form.Label>Email address</Form.Label> 
          <Form.Control type="email" value={userLog.email} name="email" onChange={handleChange}/> 
        </Form.Group> 
         <Form.Group className="mb-3" controlId="password"> 
          <Form.Label>Password</Form.Label> 
          <Form.Control type="password" value={userLog.password} name="password" onChange={handleChange}  /> 
        </Form.Group> 
        <Button variant="primary" type="submit"> 
          Login 
        </Button> 
      </Form> 
    </Container> 
  ); 
}; 
export default LogIn;