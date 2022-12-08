import React from "react";
import {query} from "../functions/queries";
import {UserContext} from "../App";
import {FileCard} from "../components/cards";
import "./viewAll.css";
export function ViewAllDocs() {
    let [user, setUser] = React.useContext(UserContext);
    let [allUsers,setAllUsers] = React.useState([]);
    let [data,setData] = React.useState([]);
    React.useEffect(()=>{
        let q = `
        query Query($query: QueryInput) {
            uploads(query: $query) {
              id
              filename
              size
              type
              
            }
          }
        `;
        query(q,{query:{}},user,(data)=>{
            setData(data.uploads);
        });
        q = `
        query Query($query: UsersQuery) {
            users(query: $query) {
              id
              name
            }
        }
        `;
        query(q,{query:{}},user,(data) => {
            let users = data.users;
            let obj = {};
            users.forEach((val) => {
                obj[val.id] = val.name
            });
            setAllUsers(obj);
        });

    },[user]);
    let view = data?.map((val,index) => {
        return <FileCard key={index} 
        title={val.filename} 
        header="File"
        id = {val.id}
        allUsers = {allUsers}
        />
    });


    return <div className="mid_container">{view}</div>
}