import React, {useState, useContext} from 'react'
import { Container, Form, Button, Image} from 'react-bootstrap'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { UserContext } from "../Auth/UserContext";
const CreateItem = () => {
    const nav = useNavigate()
    const [newItem, setNewItem] = useState({
        name: "",
        description: "",
        photo: ""

    })
    const { userInfo, setUserInfo } = useContext(UserContext);
    const [uploadedImage, setUploadedImage] = useState(null);
    const handleChange = (e)=>{
        setNewItem({...newItem, [e.target.name]:e.target.value})
    }
      const handlePhoto = (e)=>{
        setNewItem({...newItem, photo:e.target.files[0]})
        setUploadedImage(URL.createObjectURL(e.target.files[0]));
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const formData = new FormData()
        Object.entries(newItem).forEach(([key, value])=>{
            formData.append(key, value)
        })
        formData.append('userId', userInfo.id)
        await axios.post("http://localhost:5000/addItem",  formData)
        .then(res=>nav("/readAllItem/"))
        .catch(err=>console.log(err))
    }
  return (
    <Container>
      <h1>Create Item</h1>
         <Form onSubmit={handleSubmit} encType='multipart/form-data'>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" value={newItem.name} name="name" onChange={handleChange}/>
      </Form.Group>
         <Form.Group className="mb-3" controlId="image">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" accept=".jpeg, .png, .jpg" name="photo" onChange={handlePhoto}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} value={newItem.description} name="description" onChange={handleChange}/>
      </Form.Group>
      <Button type="Submit" variant="primary">Add Item</Button>
    </Form>
    {uploadedImage && (
<Image
src={uploadedImage}
alt='Uploaded'
rounded
className='img-fluid'
/>
)}
    </Container>
  )
}

export default CreateItem
