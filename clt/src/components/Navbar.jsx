import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
   /* <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
          <img src="assets/images/logo.png" alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/h/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/h/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="/h/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/h/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link className="link" to="/h/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="/h/?cat=food">
            <h6>FOOD</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout} >Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>*/
    < div>
    

    <div className="section header">
        
        <div className="header-bottom-section">

            <div className="container-fluid custom-container">
                <div className="header-bottom-wrap">

                    <div className="header-logo-menu">

                        <div className="header-logo">
                            <Link to="/h"><img src="assets/images/logo.png" alt="logo"/></Link>
                        </div>

                        <div className="header-menu d-none d-lg-block">
                            <ul className="main-menu">
                                <li className="active-menu">
                                    <Link to="/h/?cat=art">Art</Link>
                                    
                                </li>
                                <li><Link to="/h/?cat=science">Science</Link>
                                    
                                </li>
                                <li><Link to="/h/?cat=technology">Technology</Link>
                                    
                                </li>
                                <li><Link to="/h/?cat=cinema">Cinema</Link>
                                    
                                </li>
                                <li><Link to="/h/?cat=design">Design</Link></li>
                                <li><Link to="/h/?cat=food">Food</Link></li>

                            </ul>
                        </div>

                    </div>


                   

                        <div className="header-login d-none d-lg-block" >
                        <span style={{marginRight:"100px"}}>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout} style={{marginRight:"100px"}}>Logout</span>
          ) : (
                            <Link className="link" to="/login" style={{marginRight:"100px"}}><i className="far fa-user"></i> Login</Link>
                            )}


<span className="write" style={{marginRight:"100px"}}>
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
                        </div>

                       
                        <div className="header-toggle d-lg-none">
                            <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu">
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                        </div>

                    </div>

                </div>
            </div>


        </div>
    </div>
    
  );
};

export default Navbar;
