import React, { useContext } from "react"; 
import { Navigate } from "react-router-dom"; 
import { UserContext } from "./UserContext"; 
const ProtectedRoute = ({ children }) => { 
 const { userInfo } = useContext(UserContext); 
  if (!userInfo || !userInfo.id) { 
    return <Navigate to="/login" />; 
  } 
  return children; 
}; 
export default ProtectedRoute; 