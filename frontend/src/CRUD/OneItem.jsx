import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Button, Container, Row, Col} from "react-bootstrap"
import { useParams, useNavigate } from 'react-router-dom'
const OneItem = () => {
  const [infoItem, setInfoItem] = useState({})
  const {id} = useParams()
  const nav = useNavigate()
  // Read one
    useEffect(()=>{
      const oneItem = async()=>{
        await axios.get("http://localhost:5000/readItem/"+id)
        .then(res=> setInfoItem(res.data))
        .catch(err=>console.log("Not read "+err))
      }; 
      oneItem()
  },[id])
  // Delete One
  const handleDelete = async(id)=>{
    await axios.delete("http://localhost:5000/deleteItem/"+id)
     .then(res=> nav("/readAllItem/"))
        .catch(err=>console.log("Not read "+err))
  }
  return (
    <Container>
      <Row>
        <Col>
          <h1>{infoItem.name}</h1>
          <p>{infoItem.description}</p>
          <Button variant="danger" onClick={()=>handleDelete(infoItem._id)}>Delete</Button>
          <Button variant="warning" href={"/updateItem/"+infoItem._id}>Update</Button>
        </Col>
        <Col>
        <img src={"http://localhost:5000/images/"+infoItem.photo} className="img-fluid" alt={infoItem.description}/>
        </Col>
      </Row>
    </Container>
  )
}

export default OneItem
