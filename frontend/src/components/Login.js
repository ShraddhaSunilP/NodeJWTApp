import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
 
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem("user");
        if(auth) {
            navigate("/");
        }
    })

    const handleLogin = async () => {
        console.log(email, password);
        let result = await fetch('http://localhost:5000/login', {
            method : 'post',
            body:JSON.stringify({email, password}),
            headers : {
                'Content-Type' : 'application/json'
            },
        });
        result = await result.json();
        console.log(result);
        if(result.auth){
            // save data in local storage
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));

            navigate("/");
        } else {
            alert('please enter correct details');
        }
    }
    return(
        <div className="login">
            <h1>Login</h1>
            <input type="text" className="inputBox" value={email} 
                onChange={(e)=>setEmail(e.target.value)}placeholder="Enter Email"
            />

            <input type="password" className="inputBox" value={password} 
                onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"
            />

            <button onClick={handleLogin} className="button" type="button">Sign Up</button>

        </div>
    )
}
export default Login;