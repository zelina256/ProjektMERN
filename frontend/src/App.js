import logo from './logo.svg';
import './App.css';
import NavigationBar from './base/NavigationBar';
import Home from "./base/Home"
import Contact from "./base/Contact"
import {Routes, Route} from "react-router-dom"
import TableContact from './base/TableContact';
import CreateItem from './CRUD/CreateItem';
import AllItems from './CRUD/AllItems';
import OneItem from './CRUD/OneItem';
import UpdateItem from "./CRUD/UpdateItem"
function App() {
  return (
    <div>
     <NavigationBar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/contact" element={<Contact/>} />
       <Route path="/table-contact" element={<TableContact/>} />
       <Route path="/createItem" element={<CreateItem/>} />
       <Route path="/readAllItem" element={<AllItems/>} />
        <Route path="/readOneItem/:id" element={<OneItem/>} />
         <Route path="/updateItem/:id" element={<UpdateItem/>} />
    </Routes>
    </div>
  );
}

export default App;
