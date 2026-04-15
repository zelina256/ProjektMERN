import React, {useState, useEffect} from 'react'
import axios from "axios"
import { Container, Row, Col } from 'react-bootstrap'
import PropsItem from './PropsItem'
const AllItems = () => {
  const [allItems, setAllItems] = useState([])
  useEffect(()=>{
      const allInfoItems = async()=>{
        await axios.get("http://localhost:5000/readItems")
        .then(res=>setAllItems(res.data))
        .catch(err=>console.log("Not read "+err))
      }; 
      allInfoItems()

  },[])
  return (
    <Container>
      <h1>Show all items</h1>
      <Row>
        {allItems.map((item)=>{
          return(
          <Col xs={12} md={6} lg={4} key={item._id}>
            <PropsItem {...item}/>
          </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default AllItems
