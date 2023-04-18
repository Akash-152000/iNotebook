import React, {useState, useContext} from "react";
import authContext from "../context/auth/authContext";

 
const Login = () => {

    const context = useContext(authContext);
    const {login} = context;

    const [credentials, setcredentials] = useState({email:"",password:""})

    const onChange =(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
 
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        login(credentials)
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            placeholder="Password"
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary my-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
