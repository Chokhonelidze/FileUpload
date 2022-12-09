import {UserContext} from "../App";
import React from "react";
import archdiag from '../archdiag.png';
function Home() {
    const [user,setUser] = React.useContext(UserContext);
    return (<div>
        <h2>Welcome {user?.user?.name}</h2>
        <h3>Case Study</h3>
        <img src={archdiag} alt="NO IMAGE" className="diagram" />
    </div>);
}
export {Home} ;