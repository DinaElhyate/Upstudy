import React, { useContext } from "react";
import { Link , useLocation} from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import Logo from "../img/logo.png";

const Userh = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  const itemsPerRow = 4;
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
        <div className="header-top-section">
            <div className="container">
                <div className="header-top-wrap">
                    <div className="header-top-content text-center">
                        <p>Learn the latest trends indrive business innovation with the <span>Oxford  Fintech Programe</span></p>
                    </div>
                </div>
            </div>
        </div>
        <div className="header-bottom-section">

            <div className="container-fluid custom-container">
                <div className="header-bottom-wrap">

                    <div className="header-logo-menu">

                        <div className="header-logo">
                            <Link to="/"><img src="assets/images/logo.png" alt="logo"/></Link>
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
        <div className="container">
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
                  <h2 className="title">Course Sidebar</h2>
                  <ul className="breadcrumb justify-content-center">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Course Sidebar</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
      {posts.map((post) => (
          <div key={post.id} className={`col-lg-${12 / itemsPerRow} col-sm-6`}>
            <div className="single-course" style={{ margin: "20px" }}>
              <div className="courses-image">
                <Link to="/">
               
                  <img  src={`../upload/${post.img}`} alt="Courses" style={{ width: "100%", height: "200px" }}  />
                </Link>
              </div>
              <div className="courses-content">
              <div className="top-meta">
                 <div className="tag-time">

                 <h3 className="title"><Link to={`/singleu/${post.id}`}>{post.title}</Link></h3>

                                                        </div>

                                                    </div>
                                                    <p>{getText(post.desc)}</p>

                                                    <div className="courses-meta">
                                                        <div className="rating">
                                                            <div className="rating-star">
                                                                <div className="rating-active" style={{width: '60%'}}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
       
       
       </div>
              
            
        
          // Create a new row after every 4 images
        //   {(index + 1) % itemsPerRow === 0 && <div className="w-100"></div>}
       ) )}
      </div>
    </div>
    </div>
    
  );
};

export default Userh;
