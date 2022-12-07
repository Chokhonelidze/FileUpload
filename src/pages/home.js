import {UserContext} from "../App";
import React from "react";
function Home() {
    const [user,setUser] = React.useContext(UserContext);
    console.log(user);
    return (<div><h2>user ={user?.user?.email}</h2></div>);
}
export {Home} ;