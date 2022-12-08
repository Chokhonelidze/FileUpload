import React from "react";
import {query} from "../functions/queries";
import {UserContext} from "../App";
function Card(props) {
    function classes() {
      const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
      const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
      return "card mb-3 " + bg + txt;
    }
  
    return (
      <div className={classes()} style={{ maxWidth: "20rem" }}>
        <div className="card-header">{props.header}</div>
        <div className="card-body">
          {props.title && <h5 className="card-title">{props.title}</h5>}
          {props.text && <p className="card-text">{props.text}</p>}
          {props.body}
          {props.status && <div id="createStatus">{props.status}</div>}
        </div>
      </div>
    );
  }
  function FileCard(props) {
    const [user, setUser] = React.useContext(UserContext);
    const allUsers = props.allUsers;
    
    const [setting,setSettng] = React.useState(false);

    const Display = () => {
      return (
        <>
        <div className="card-header">{props.header}</div>
        <div className="card-body">
          {props.title && <h6 className="card-title">{props.title}</h6>}
          {props.text && <p className="card-text">{props.text}</p>}
        </div>
        </>
      )
    }
    const SettingsPage = (props) => {
      const [selected,setSelected] =React.useState([]);
      React.useEffect(()=>{
        let q = `
        query Query($query: QueryInput) {
          uploads(query: $query) {
            users
          }
        }
        `;
        query(q,{query:{id:Number(props.id)}},user,(data)=>{
          setSelected(data.uploads[0].users);
        });
      },[]);
      const update = React.useCallback((val)=>{
        let q = `
        mutation UpdateOwners($file: UserUpdate!) {
          updateOwners(file: $file) {
            users
            id
          }
        }
        `;
        query(q,{file:{id:props.id,users:val}},user,(data)=>{
          console.log(data)
        });
      });
      const allUsers = props.allUsers;
      function check(e) {
        let val = e.target.value;
        setSelected([Number(val),...selected]);
        update([Number(val),...selected]);
      }
      function uncheck(e) {
        let val = e.target.value;
        let data = selected.filter((v)=>{
          return Number(val) != Number(v);
        });
        setSelected([...data]);
        update([...data]);
       
      }
      if(!allUsers) return <>no users!</>;
 
      let list = Object.keys(allUsers).map((val,i) => {
        if(selected.includes(Number(val))){
          return <li key={"checkbox"+val} ><input type={"checkbox"} value={val}  
          onChange={uncheck} checked/>{allUsers[val]}</li>
        }
        return <li key={"checkbox"+val}><input  type={"checkbox"} value={val} onChange={check} />{allUsers[val]}</li>
        
      });
      return <div> <div style={{float:"right",cursor:"pointer"}} onClick={props.close}>❌</div><br></br><ul>{list}</ul></div>
    }
 
    return (
    <div className="small_card card mb-3 text-black">
      {!setting? <Display />:<SettingsPage 
      id={props.id} 
      allUsers={allUsers} 
      close={()=>{
        setSettng(false);
      }} />}
      {!setting && user.user.role === "1" && (<div onClick={()=>{setSettng(true)}}>⚙️</div>)}
    </div>
    );
  }

  export {Card,FileCard};