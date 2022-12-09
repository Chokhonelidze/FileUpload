
import {FormBuilder} from "../components/FormBuilder"
import React from "react";
import {UserContext} from "../App";
import {query} from "../functions/queries";

function CreateUser(...props) {
    let [user,setUser] = React.useContext(UserContext);
    let [email,setEmail] = React.useState('');
    let [name,setName] = React.useState('');
    let [password,setPassword] = React.useState('');
    let [password2,setPassword2] = React.useState('');
    let [role,setRole] = React.useState(0);
    let [errors,setErrors] = React.useState([]);
    function submit () { 
        if(password !== password2){
            setErrors(...errors,'Passwords does not match'); 
        }
        const q = `
        mutation Mutation($user: createUser!) {
            createUser(user: $user)
          }
        `;
        query(q,{user:{name:name,email:email,password:password,role:Number(role)}},user,()=>{
            alert("success");
        })
    }
    let obj = [
        {
            key:'email',
            label:'EMAIL ADDRESS',
            val:[email,setEmail],
            type:'email',
            help:'Enter email',
            placeholder: 'enter your email'
        },
        {
            key:'name',
            label:'USER NAME',
            val:[name,setName],
            type:'text',
            help:'Enter your username',
            placeholder: 'enter user name'
        },
        {
            key:'password',
            label:'Password',
            val:[password,setPassword],
            type:'password',
            help:'password',
            placeholder: 'enter user password'
        },
        {
            key:'password',
            label:'Confirm Password',
            val:[password2,setPassword2],
            type:'password',
            help:'Confirm your password',
            placeholder: 'password'
        },
        {
            key:'option',
            label:'role',
            options:[[0,'User'],[1,'Admin']],
            type:'options',
            val:[role,setRole],
        },
        {
            type:'submit',
            submit:submit,
            label:'save',
        }
    ]
    return (
        <FormBuilder {...obj} />
    )
}
export {CreateUser};