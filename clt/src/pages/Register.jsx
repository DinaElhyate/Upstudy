import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    userType:"",
    userKey:"",
    
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    if(inputs.userType === "Admin" && inputs.userKey !== "A") {
      e.preventDefault();
      alert("Admin invalid");
  }else{
    
    e.preventDefault();
    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  }};

  return (
    <div>
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
            <h2 className="title" style={{textAlign:"center"}}>Register</h2>
        </div>
        
        <div className="login-register-form" >
        <div>
                                <input type="radio" name="userType" value="user" onChange={handleChange}/>user
                                <input type="radio" name="userType" value="Admin" onChange={handleChange}/>Admin
                               </div>
        
            <form action="#" >  
            {inputs.userType === "Admin" ? (
                                    <div className="single-form">
                                    <input type="text" className="form-control" id="userkey" name="userKey" placeholder="UserKey "  onChange={handleChange} />
                                    </div>
                                                                    ) : null } 
           
             
             <div className="single-form" style={{textAlign:"center"}}>

             <div className="single-form">
            <input  required type="text" className="form-control" id="username" name="username"  placeholder="username"   onChange={handleChange}/>
    </div>
    <div className="single-form">
<input  required type="text" className="form-control" id="email " name="email"  placeholder=" email "   onChange={handleChange}/>
</div>
                <div className="single-form">
                    <input required type="password" className="form-control " id="password" name="password" placeholder="Password"  onChange={handleChange} />

                </div>
                
                <div className="form-btn">
                    <button onClick={handleSubmit} className="btn" > Register</button> 
                </div>
                {err && <p>{err}</p>}
        <span>
          Do you have  account?<br/> <Link to="/login">Login</Link>
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

export default Register;
