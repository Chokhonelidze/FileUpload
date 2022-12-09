import React from "react";
import {query} from "../functions/queries";
import {UserContext} from "../App";
import {FileCard} from "../components/cards";
import {PdfPage} from "../components/pdfViewer";
import "./viewAll.css";
export function ViewAllDocs() {
    let [user, setUser] = React.useContext(UserContext);
    let [allUsers,setAllUsers] = React.useState([]);
    let [data,setData] = React.useState([]);
    let [Doc,setDoc] = React.useState(null);
    let [search,setSearch] = React.useState('');
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
        query(q,{query:{search:search}},user,(data)=>{
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

    },[user,search]);
    let view = data?.map((val,index) => {
        return <FileCard key={index} 
        title={val.filename} 
        header="File"
        id = {val.id}
        allUsers = {allUsers}
        text = {Math.floor(val.size/1000)+"kb"}
        setDocument = {setDoc}
        />
    });
    let input = <input type='text' placeholder="Search" value={search}  className='searchInput rdn-control' onChange={(e)=>{
        setSearch(e.target.value);
        e.preventDefault();
        }} />

    return <>
        <div className="mid_container"> {input} </div>
        <div className="mid_container">
        {!Doc?<>{view}</>:<PdfPage id={Doc} clear={setDoc} />}
        </div></>
}