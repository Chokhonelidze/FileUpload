
import './App.css';
import * as React from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import NavBar from './pages/navbar';
import {Home} from './pages/home';
import { CreateUser } from './pages/createUser';
import {FileUploadPage} from "./pages/fileUpload";
import {ViewAllDocs} from "./pages/viewAll";
import Login from './pages/login';


const UserContext = React.createContext(null);
function App() {
  const [user,setUser] = React.useState();
  return (
    <UserContext.Provider value={[user,setUser]}>
    <HashRouter>
      <NavBar user = {user} />
      <div className='container' style={{padding:"20px"}}>
      <Routes>
        <Route path = "/" exact element = {<Home/>} />
        <Route path = "/createUser" element = {<CreateUser />} />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/fileUpload" element ={<FileUploadPage />} />
        <Route path = "/viewFiles" element ={<ViewAllDocs />} />
      </Routes>
        
      </div>
    </HashRouter>
    </UserContext.Provider>
  )
}

export  {App,UserContext};
