import {UserContext} from "../App";
import React from "react";
function Home() {
    const [user,setUser] = React.useContext(UserContext);
    return (<div><h2>Welcome {user?.user?.name}</h2><h3>Case Study</h3></div>);
}
export {Home} ;