import React from 'react'
import {Card, Button} from "react-bootstrap"
const PropsItem = ({_id, name, photo}) => {
  return (
  <Card className="h-100">
      <Card.Img variant="top" 
      src={"http://localhost:5000/images/"+photo} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Button variant="primary" href={'/readOneItem/'+_id}>
        Read more</Button>
      </Card.Body>
    </Card>
  )
}

export default PropsItem
