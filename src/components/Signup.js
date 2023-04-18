import React,{useState, useContext} from 'react'
import authContext from "../context/auth/authContext";

const Signup = () => {

  const [credentials, setcredentials] = useState({name:"",email:"",password:"",cPassword:""})
  const context = useContext(authContext);
  const {signup} = context;

  const onChange =(e)=>{
    setcredentials({...credentials,[e.target.name]:e.target.value})

}

const handleSubmit=(e)=>{
    e.preventDefault();
    if(credentials.password===credentials.cPassword){
      signup(credentials)
    }
    else{
      console.log("Password did not match confirm password");
    }
}

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            name="name"
            value={credentials.name}
            onChange={onChange}
            min={3}
            required
          />
        </div>
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
            minLength={5}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cPassword"
            name="cPassword"
            value={credentials.cPassword}
            placeholder="Confirm Password"
            onChange={onChange}
            min={5}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary my-2">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Signup