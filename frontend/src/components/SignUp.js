import React, { useState, useEffect }from 'react'
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    const[name, setName] = useState("");
    const[password, setPassword] = useState("");
    const[email, setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem("user");
        if(auth) {
            navigate("/");
        }
    })

    const collectData = async () => {
        console.log(name, password, email);
        let result = await fetch('http://localhost:5000/register', {
            method:'post', 
            body:JSON.stringify({name, email, password}),
            headers : {
                'Content-Type' : 'application/json'
            },
        });
        result = await result.json();
        console.log(result);
        // save data in localstorag
        localStorage.setItem('user', JSON.stringify(result.result));
        localStorage.setItem('token', JSON.stringify(result.auth));
        navigate('/')
     };

    return(
        <div className="register">
            <h1>Register</h1>
            <input className="inputBox" type="text" value={name} 
                onChange={(e)=>setName(e.target.value)} placeholder="Enter Name" 
            />

            <input className="inputBox" type="password" value={password} 
                onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" 
            />

            <input className="inputBox" type="text" value={email} 
                onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" 
            />

            <button onClick={collectData} className="button" type="button">Sign Up</button>
        </div>
    )
}
export default SignUp;