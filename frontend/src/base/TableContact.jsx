import React, { useState, useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'
import axios from "axios"
const TableContact = () => {
    const [contacts, setContacts] = useState([])
    useEffect(() => {
        const contactsInfos = async () => {
            await axios.get("http://localhost:5000/allContact")
                .then(res => setContacts(res.data))
                .catch((err) => console.log("Not read contacts " + err))
        }; contactsInfos()
    }, [])
    return (
        <Container>
            <h1>Table Contact</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => {
                        return (
                            <tr key={contact._id}>
                                <td>{contact._id}</td>
                                <td>{contact.firstName}</td>
                                <td>{contact.lastName}</td>
                                <td>{contact.email}</td>
                                <td>{contact.comment}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Container>
    )
}

export default TableContact
