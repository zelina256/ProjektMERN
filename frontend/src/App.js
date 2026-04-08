import logo from './logo.svg';
import './App.css';
import NavigationBar from './base/NavigationBar';
import Home from "./base/Home"
import Contact from "./base/Contact"
import {Routes, Route} from "react-router-dom"
import TableContact from './base/TableContact';
function App() {
  return (
    <div>
     <NavigationBar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/contact" element={<Contact/>} />
       <Route path="/table-contact" element={<TableContact/>} />
    </Routes>
    </div>
  );
}

export default App;
