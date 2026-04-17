import React, { useState, useContext, useEffect } from "react"; 
import { UserContext } from "./UserContext"; 
import axios from "axios"; 
import { Container, Table, Button } from "react-bootstrap"; 
import { useNavigate } from "react-router-dom"; 
const UserProfile = () => { 
  const { userInfo, setUserInfo } = useContext(UserContext); 
  const [items, setItems] = useState([]); 
  const nav = useNavigate(); 
  useEffect(() => { 
    const allitems = async () => { 
      await axios 
        .get("http://localhost:5000/readItems/", { withCredentials: true }) 
 
        .then((res) => { 
          const userItems = res.data.filter( 
            (item) => item.userItem === userInfo.id, 
          ); 
          setItems(userItems); 
        }) 
        .catch((err) => console.log("Items not read " + err)); 
    }; 
    allitems(); 
  }, [userInfo]); 
  const handleDelete = async (id) => { 
    await axios 
      .delete("http://localhost:5000/deleteItem/" + id) 
      .then((res) => { 
        setItems((prevItems) => prevItems.filter((item) => item._id !== id)); 
      }) 
      .catch((err) => console.log("Not deleted" + err)); 
  }; 
  return ( 
    <Container> 
      <h1>Username:{userInfo.username}</h1> 
      <p>Email: {userInfo.email}</p> 
      {items.length === 0 ? ( 
        <p>No data</p> 
      ) : ( 
        <Table striped bordered hover> 
          <thead> 
            <tr> 
              <th>ID</th> 
              <th>Item Name</th> 
              <th>Description Item</th> 
              <th>Photo Item</th> 
              <th>Update</th> 
              <th>Delete</th> 
            </tr> 
          </thead> 
          <tbody> 
            {items.map((item) => { 
              return ( 
                <tr key={item._id}> 
                  <td>{item._id}</td> 
                  <td>{item.itemName}</td> 
                  <td>{item.description}</td> 
                  <td> 
                    <img 
                      src={"http://localhost:5000/images/" + item.photo} 
                      className="img-fluid" 
                    /> 
                  </td> 
                  <td> 
                    <Button variant="warning" href={`/updateItem/${item._id}`}> 
                      Update 
 
                    </Button> 
                  </td> 
                  <td> 
                    <Button 
                      variant="danger" 
                      onClick={() => handleDelete(item._id)} 
                    > 
                      Delete 
                    </Button> 
                  </td> 
                </tr> 
              ); 
            })} 
          </tbody> 
        </Table> 
      )} 
    </Container> 
  ); 
};

export default UserProfile