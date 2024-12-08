import React, { useContext } from "react";
import { Link , useLocation, useNavigate} from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import moment from "moment";
import DOMPurify from "dompurify";
import Menu from "../components/Menu";

function SingleU() {
    const { currentUser, logout } = useContext(AuthContext);
    const [post, setPost] = useState({});

    const location = useLocation();
    const navigate = useNavigate();
  
    const postId = location.pathname.split("/")[2];
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(`/posts/${postId}`);
            setPost(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
      }, [postId]);
      const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
      }
  return (
    <div>
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
        <div className="single" style={{marginTop:"200px"}}>
      <div className="content">
        <img src={`../upload/${post?.img}`} alt=""  style={{ height:'500px', width:'auto'}}/>
        <div className="user">
          {post.userImg && <img
            src={post.userImg}
            alt=""
          />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          
          
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>      </div>
      <Menu cat={post.cat}/>
    </div>
    </div>
  )
}

export default SingleU