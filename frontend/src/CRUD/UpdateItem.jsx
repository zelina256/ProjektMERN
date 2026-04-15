import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Button, Container, Form, Image} from "react-bootstrap"
import { useParams, useNavigate } from 'react-router-dom'
const UpdateItem = () => {
   const [updateItem, setUpdateItem] = useState({})
    const {id} = useParams()
    const nav = useNavigate()
    const [uploadedImage, setUploadedImage] = useState(null);

      // Read one
    useEffect(()=>{
      const oneItem = async()=>{
        await axios.get("http://localhost:5000/readItem/"+id)
        .then(res=> setUpdateItem(res.data))
        .catch(err=>console.log("Not read "+err))
      }; 
      oneItem()
  },[id])
  // Update
    const handleChange = (e)=>{
        setUpdateItem({...updateItem, [e.target.name]:e.target.value})
    }
      const handlePhoto = (e)=>{
        setUpdateItem({...updateItem, photo:e.target.files[0]})
        setUploadedImage(URL.createObjectURL(e.target.files[0]));
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const formData = new FormData()
        Object.entries(updateItem).forEach(([key, value])=>{
            formData.append(key, value)
        })

        await axios.patch("http://localhost:5000/updateItem/"+id,  formData)
        .then(res=>nav("/readAllItem/"))
        .catch(err=>console.log(err))
    }
  return (
<Container>
      <h1>Update Item</h1>
         <Form onSubmit={handleSubmit} encType='multipart/form-data'>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" value={updateItem.name} name="name" onChange={handleChange}/>
      </Form.Group>
         <Form.Group className="mb-3" controlId="image">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" accept=".jpeg, .png, .jpg" name="photo" onChange={handlePhoto}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} value={updateItem.description} name="description" onChange={handleChange}/>
      </Form.Group>
      <Button type="Submit" variant="warning">Update Item</Button>
    </Form>
    {uploadedImage ? (
<Image
src={uploadedImage}
alt='Uploaded'
rounded
className='img-fluid'
/>
) : (
<Image
src={`http://localhost:5000/images/${updateItem.photo}`}
alt='Uploaded'
rounded
className='img-fluid'
/>
)}
    </Container>
  )
}

export default UpdateItem
