import React, {useState} from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
const Contact = () => {
    const nav = useNavigate()
    const [newContact, setNewContact] = useState({
        firstName: "",
        lastName: "",
        email:"",
        comment:""
    })
    const handleChange = (e)=>{
        setNewContact({...newContact, [e.target.name]:e.target.value})
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        await axios.post("http://localhost:5000/addContact", newContact)
        .then(res=>{
            console.log("Send")
            nav("/table-contact")
        })
        .catch((err)=>{
            console.log("Error Not Send" + err)
        })
    }
    return (
        <Container className='my-5'>
            <h1>Contact Page</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="firstname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="firstName" value={newContact.firstName} onChange={handleChange}/>
                </Form.Group>
                   <Form.Group className="mb-3" controlId="lastname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="lastName" value={newContact.lastName} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" 
                    value={newContact.email}
                     onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control as="textarea" name="comment" rows={3} value={newContact.comment} onChange={handleChange}/>
                </Form.Group>
                <Button type="submit" variant="primary">Send</Button>
            </Form>
        </Container>
    )
}

export default Contact
