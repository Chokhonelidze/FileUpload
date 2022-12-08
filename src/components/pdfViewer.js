import React from 'react';
import {query} from "../functions/queries";
import {UserContext} from "../App";
import Loading from './loading';

export function PdfPage(props) {
    let id = props.id;
    let [user, setUser] = React.useContext(UserContext);
    let [data,setData] = React.useState(null);
    let [isLoading,setLoading] = React.useState(true);

    React.useEffect(()=>{
        const q = `
        query Query($query: QueryInput) {
            uploads(query: $query) {
                data
            }
          }
        `;
        query(q,{query:{id:id}},user,(d)=>{
            setData(d?.uploads[0].data);
            setLoading(false);
        })
    },[user,id]);
   // console.log(data)
  
    return <div style={{height:"600px",width:"100%"}}>
        {isLoading?<Loading />:
        <><div className="close"  style={{cursor:"pointer"}} onClick={()=>{props.clear(null)}}>❌</div><iframe src={data} width='100%' height='100%'/></>
        }
        </div>
}