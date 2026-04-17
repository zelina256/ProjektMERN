import React, { useContext, useEffect }  from 'react'
import {Navbar, Container, Nav} from "react-bootstrap"
import { UserContext } from '../Auth/UserContext' 
import axios from "axios" 
import { useNavigate } from 'react-router-dom' 
const NavigationBar = () => {
  const nav = useNavigate() 
  const { userInfo, setUserInfo } = useContext(UserContext) 
  useEffect(() => { 
    const userData = async () => { 
      if (!userInfo.email) { 
        await axios.get('http://localhost:5000/user/', { withCredentials: true }) 
          .then(res => setUserInfo(res.data)) 
          .catch(err => { 
            console.log("No data " + err) 
          })}} 
    userData()}, [userInfo]) 
  const handleLogout = async()=>{ 
    await axios.post('http://localhost:5000/logout/', null, { withCredentials: true }) 
    .then(res=>{ 
      setUserInfo({}) 
      nav('/login',{ replace: true }) 
 
    }) 
    .catch(err=>console.log("Not logut")) 
  } 
  return (
     <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">MERN</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/contact/">Contact</Nav.Link>
             <Nav.Link href=" /table-contact/">Table Contact</Nav.Link>
             <Nav.Link href=" /createItem/">Create Item</Nav.Link>
             <Nav.Link href=" /readAllItem/">All Items</Nav.Link>
            {userInfo.email ? ( 
              <> 
              <Nav.Link href="/createItem/">Create</Nav.Link> 
               <Nav.Link href="/user/">Profile:{userInfo.username}</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link> 
              </> 
            ) : ( 
              <> 
                <Nav.Link href="/register/" className="btn btn-primary">Register</Nav.Link> 
                <Nav.Link href="/login/"  className="btn btn-primary">Login</Nav.Link> 
              </> 
            ) } 
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar
