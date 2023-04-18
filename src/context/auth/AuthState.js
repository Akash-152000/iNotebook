import { useNavigate } from "react-router-dom";
import authContext from "./authContext";

const AuthState =(props)=>{
    let navigate = useNavigate();

const login = async (credentials) =>{
    const response = await fetch("http://localhost:5000/api/auth/login",{
        method:'POST',
        headers:{
            'Content-Type':"application/json"
        },
        body: JSON.stringify({email:credentials.email, password:credentials.password})
    })

    const json = await response.json();
    if(json.success){
        localStorage.setItem('token',json.authToken)
        navigate("/")
    }
    
}


const signup = async (credentials) =>{
    const response = await fetch('http://localhost:5000/api/auth/createuser',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password})
    })
    const json = await response.json();
    console.log(json);
    if(json.success){
        localStorage.setItem('token',json.authToken)
        navigate("/")
    }
    else{
        console.log("false");
    }
}


    return(
        <authContext.Provider value={{login, signup}}>
            {props.children}
        </authContext.Provider>
    )
}
export default AuthState;