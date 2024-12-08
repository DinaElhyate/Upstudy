import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    userType:"",
  });
 // const [username, setUsername] = useState("");
  //const [password, setPassword] = useState("");
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);


  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
     const response =  await login(inputs);
     console.log(response);
navigate("/h")  
      
   
  };
  
   /* e.preventDefault();
    axios.post("http://localhost:3000/auth/login" , {
        username: username,
        password: password,
    }).then((response) => {
        if(response.data.message){
        setError(response.data.message);
        }else{
       // setLoginStatus(response.data[0].email);
        if((response.data[0].userType) === "Admin"){
            navigate("/h");
        }else if((response.data[0].userType) === "user"){
            navigate("/userh");

        }else{
            navigate("/");

        }

        }*/
       
        
    


      
    

      
      
        // L'utilisateur est un administrateur, redirigez-le vers une page d'administration.
        
   
       
    
  
  return (
    /*<div className="auth">
      <h1>Login</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>*/
    <div style={{textAlign:"center"}} >

    <div className="section page-banner-section" style={{backgroundImage: 'url(assets/images/bg/page-banner.jpg)'}}>
            <div className="shape-1">
                <img src="assets/images/shape/shape-7.png" alt=""/>
            </div>
            <div className="shape-2">
                <img src="assets/images/shape/shape-1.png" alt=""/>
            </div>
            <div className="shape-3"></div>
            <div className="container">
                <div className="page-banner-wrap">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="page-banner text-center">
                                <h2 className="title">Login & Register</h2>
                                <ul className="breadcrumb justify-content-center">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Login & Register</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="section login-register-section section-padding">
            <div className="container">

                <div className="login-register-wrap">
                    <div className="row gx-5">
                        <div className="col-lg-12" >
        <div className="login-register-box" style={{marginLeft:"300px",marginRight:"300px"}}>
        <div className="section-title">
            <h2 className="title">Login</h2>
        </div>
        
        <div className="login-register-form" >
            <form action="#" >    
        
             <div className="single-form">

                    <input  required type="text" 
className="form-control" id="username" name="username"  placeholder="Username or email "   onChange={handleChange}/>
 
                

                <div className="single-form">
                    <input required type="password" className="form-control " id="password" name="password" placeholder="Password"  onChange={handleChange} />

                </div>
                
                <div className="form-btn">
                    <button onClick={handleSubmit} className="btn" >Login</button> 
                </div>
                {err && <p>{err}</p>}
        <span>
          Don't you have an account?<br/> <Link to="/register">Register</Link>
        </span>
        </div>
            </form>
        </div>
      
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default Login;
