import React from 'react'
import {Card, Button} from "react-bootstrap"
const PropsItem = ({_id, name, photo}) => {
  return (
  <Card>
      <Card.Img variant="top" src={photo} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Button variant="primary" href={'/readOneItem/'+_id}>Go somewhere</Button>
      </Card.Body>
    </Card>
  )
}

export default PropsItem
