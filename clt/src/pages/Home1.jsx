
import React from 'react'
import {Link} from 'react-router-dom'
import { useEffect } from "react";
import { useState } from "react";
import {  useLocation } from "react-router-dom";
import axios from "axios";

export default function Home() {
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
    <div style={{ margin:"0px"}}>
        <div className="offcanvas offcanvas-start" id="offcanvasMenu">

<div className="offcanvas-header">
    <div className="offcanvas-logo">
        <Link to="/"><img src="assets/images/logo-white.png" alt=""/></Link>
    </div>

    <button type="button" className="close-btn" data-bs-dismiss="offcanvas"><i className="flaticon-close"></i></button>

</div>

</div>


<div className="upstudy-hero-section section" style={{backgroundImage: 'url(assets/images/bg/hero-bg.jpg)'}}>
<div className="shape-3">
    <img src="assets/images/shape/shape-1.png" alt=""/>
</div>
<div className="shape-4"></div>
<div className="shape-5">
    <img src="assets/images/shape/hero-shape2.png" alt=""/>
</div>
<div className="svg-shape">
    <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 390">
        <path d="M 0,400 C 0,400 0,200 0,200 C 247.5,166.5 495,133 735,133 C 975,133 1207.5,166.5 1440,200 C 1440,200 1440,400 1440,400 Z" stroke="none" stroke-width="0" fill-opacity="1"></path>
    </svg>
</div>
<div className="container">
    <div className="row align-items-center">
        <div className="col-lg-6">
            <div className="hero-content">
                <p className="text"  data-aos-delay="800"><img src="assets/images/energy.png" alt=""/> Learn From 20,000+ Powerful Courses</p>
                <h2 className="title"  data-aos-delay="700">Best <span>platform</span> to Empower Skills</h2>
                <div className="hero-btn"  data-aos-delay="900">
                    <Link className="btn" to="/login">Try 7 days Free Trial</Link>
                </div>
                <p className="link-text" data-aos="fade-up" data-aos-delay="1000"><span>No credit card required.</span> By clicking ‘Start a Free Trial’</p>
            </div>
           
        </div>
        <div className="col-lg-6">
            <div className="hero-images">
                <img className="shape-1" src="assets/images/shape/hero-shape1.png" alt=""/>
                <div className="shape-2"></div>
                <div className="shape-6">
                    <img src="assets/images/shape/shape-7.png" alt=""/>
                </div>
                <div className="image">
                    <img src="assets/images/hero-img.png" alt=""/>
                    <div className="image-content text-center">
                        <img src="assets/images/student-img.png" alt=""/>
                        <div className="image-text">
                            <h3 className="number">100k+</h3>
                            <p>Total Enrolled Students</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</div>



<div className="section upstudy-offer-section section-padding-03">
<div className="container">
    <div className="offer-wrap">
        <div className="row">
            <div className="col-lg-6">
                <div className="single-offer">
                    <div className="offer-images">
                        <img src="assets/images/offer-1.jpg" alt="offer"/>
                    </div>
                    <div className="offer-content">
                        <h4 className="sub-title">Learn together with</h4>
                        <h3 className="title">For Enterprise!</h3>
                        <p>If you’ve been researching exactly what skill you want</p>
                        <Link to="/" className="btn">Join for Business</Link>
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="single-offer">
                    <div className="offer-images">
                        <img src="assets/images/offer-2.jpg" alt="offer"/>
                    </div>
                    <div className="offer-content">
                        <h4 className="sub-title">Get the skills</h4>
                        <h3 className="title">For Individuals</h3>
                        <p>If you’ve been researching exactly what skill you want</p>
                        <Link to="/" className="btn">Try It For Free Now</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>

<div className="section section-padding">
<div className="container">

    <div className="course-header">
        <div className="section-title">
            <h2 className="title"><span>Popular</span> Courses</h2>
        </div>

       
    </div>

    <div className="courses-wrapper">

        <div className="courses-tab">

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

                 <h3 className="title"><Link to={`/post/${post.id}`}>{post.title}</Link></h3>

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
</div>
</div>

<div className="section upstudy-counter-section section-padding-02" style={{backgroundImage: 'url(assets/images/bg/counter-bg.png)'}}>
<div className="shape-1">
    <img src="assets/images/shape/counter-shape1.png" alt=""/>
</div>
<div className="shape-2">
    <img src="assets/images/shape/counter-shape2.png" alt=""/>
</div>
<div className="shape-3">
    <img src="assets/images/shape/counter-shape3.png" alt=""/>
</div>
<div className="container">
    <div className="counter-wrap">
        <div className="row">
            <div className="col-lg-3 col-sm-6">
                <div className="single-counter text-center">
                    <div className="counter-icon">
                        <img src="assets/images/counter-1.png" alt=""/>
                    </div>
                    <div className="counter-content">
                        <h3 className="title">
                            <sapn className="counter">24</sapn>k+
                        </h3>
                        <p>Total Students Enrolled</p>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-sm-6">
                <div className="single-counter text-center">
                    <div className="counter-icon">
                        <img src="assets/images/counter-2.png" alt=""/>
                    </div>
                    <div className="counter-content">
                        <h3 className="title">
                            <sapn className="counter">3</sapn>M+
                        </h3>
                        <p>Total Video Lessons</p>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-sm-6">
                <div className="single-counter text-center">
                    <div className="counter-icon">
                        <img src="assets/images/counter-1.png" alt=""/>
                    </div>
                    <div className="counter-content">
                        <h3 className="title">
                            <sapn className="counter">2.5</sapn>k+
                        </h3>
                        <p>Daily live classNamees</p>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-sm-6">
                <div className="single-counter text-center">
                    <div className="counter-icon">
                        <img src="assets/images/counter-4.png" alt=""/>
                    </div>
                    <div className="counter-content">
                        <h3 className="title">
                            <sapn className="counter">75</sapn>+
                        </h3>
                        <p>Total Exam Categories</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>

<div className="section upstudy-brand-section section-padding">
<div className="container">
    <div className="brand-wrap">
        <div className="row align-items-center">
            <div className="col-lg-6">
                <div className="brand-title-wrap">
                    <h2 className="title">The trusted market leader in talent transformation through education </h2>
                    <Link to="/" className="btn">Start Learning Now</Link>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="brand-content-wrap">
                    <div className="row g-0">
                        <div className="col-sm-4">
                            <div className="upstudy-brand-box">
                                <div className="single-brand">
                                    <img src="assets/images/brand/brand-1.png" alt=""/>
                                </div>
                                
                                <div className="single-brand">
                                    <img src="assets/images/brand/brand-4.png" alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="upstudy-brand-box">
                                <div className="single-brand">
                                    <img src="assets/images/brand/brand-2.png" alt=""/>
                                </div>
                                
                                <div className="single-brand">
                                    <img src="assets/images/brand/brand-5.png" alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="upstudy-brand-box brand-box-03">
                                <div className="single-brand">
                                    <img src="assets/images/brand/brand-3.png" alt=""/>
                                </div>
                               
                                <div className="single-brand">
                                    <img src="assets/images/brand/brand-6.png" alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
<div className="section upstudy-testimonial-section">
<div className="container">
    <div className="testimonial-wrap" style={{backgroundImage: 'url(assets/images/bg/testi-bg.jpg)'}}>
        <div className="shape-1">
            <img src="assets/images/shape/testi-shape1.png" alt=""/>
        </div>

        <div className="testimonial-content testimonial-content-active">
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    <div className="swiper-slide single-testimonial-content">

                        <h3 className="title">Success Stories</h3>
                        <p>In total, it was a big success, I would get emails about what a fantastic resource it was.</p>
                        <h5 className="name">Vergenia Radar</h5>
                    </div>
                    <div className="swiper-slide single-testimonial-content">
                        <h3 className="title">Success Stories</h3>
                        <p>In total, it was a big success, I would get emails about what a fantastic resource it was.</p>
                        <h5 className="name">Martney Holder</h5>
                    </div>
                    <div className="swiper-slide single-testimonial-content">
                        <h3 className="title">Success Stories</h3>
                        <p>In total, it was a big success, I would get emails about what a fantastic resource it was.</p>
                        <h5 className="name">Andrew Paker</h5>
                    </div>
                </div>

                <div className="swiper-pagination"></div>
            </div>
        </div>

        <div className="testimonial-author">
            <div className="testimonial-author-wrap">
                <div className="author-images-wrap author-images-active">
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide author-image">
                                <img src="assets/images/testi-1.jpg" alt=""/>
                            </div>
                            <div className="swiper-slide author-image">
                                <img src="assets/images/testi-3.jpg" alt=""/>
                            </div>
                            <div className="swiper-slide author-image">
                                <img src="assets/images/testi-1.jpg" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
</div>

<div className="section upstudy-blog-section section-padding">
<div className="container">
    <div className="blog-wrap">
        <div className="section-title text-center">
            <h2 className="title">Latest <span>News</span></h2>
        </div>
        <div className="blog-content-wrap">
            <div className="row">
                <div className="col-lg-4 col-sm-6">
                    <div className="single-blog text-center">
                        <div className="blog-img">
                            <Link to="/"><img src="assets/images/blog/blog-1.jpg" alt=""/></Link>
                        </div>
                        <div className="blog-content">
                            <div className="blog-meta">
                                <span><i className="far fa-user"></i> <Link to="#">Admin</Link></span>
                                <span><i className="far fa-calendar-alt"></i> 09 Jun, 2023</span>
                            </div>
                            <h3 className="title"><Link to="/">How to Make Your UX Design Portfolio Stand Out</Link></h3>
                            <Link className="/" to="/"> Read More</Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                    <div className="single-blog text-center">
                        <div className="blog-img">
                            <Link to="/"><img src="assets/images/blog/blog-2.jpg" alt=""/></Link>
                        </div>
                        <div className="blog-content">
                            <div className="blog-meta">
                                <span><i className="far fa-user"></i> <Link to="#">Admin</Link></span>
                                <span><i className="far fa-calendar-alt"></i> 11 Jun, 2023</span>
                            </div>
                            <h3 className="title"><Link to="/">The Complete Digital Marketing Learning Path</Link></h3>
                            <Link className="blog-btn" to="/"> Read More</Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                    <div className="single-blog text-center">
                        <div className="blog-img">
                            <Link to="/"><img src="assets/images/blog/blog-3.jpg" alt=""/></Link>
                        </div>
                        <div className="blog-content">
                            <div className="blog-meta">
                                <span><i className="far fa-user"></i> <Link to="#">Admin</Link></span>
                                <span><i className="far fa-calendar-alt"></i> 15 Jun, 2023</span>
                            </div>
                            <h3 className="title"><Link to="/">How To Start Learn Online Study From Your Home</Link></h3>
                            <Link className="blog-btn" to="/"> Read More</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>

<div className="section upstudy-cta-section section-padding-03" style={{backgroundImage: 'url(assets/images/bg/cta-bg.jpg)'}}>
<div className="container">

    <div className="cta-wrap">
        <div className="row">
            <div className="col-lg-3 d-none d-lg-block">
                <div className="cta-image">
                    <div className="shape-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="42px" height="62px">
                            <image x="0px" y="0px" width="42px" height="62px" xmlns="data:img/png;base64,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" />
                        </svg>
                    </div>
                    <div className="image">
                        <img src="assets/images/cta-1.png" alt="Call To Action"/>
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="cta-content text-center">

                    <div className="section-title">
                        <h2 className="title">A subscription that's more than just classNamees</h2>
                    </div>
                    <Link className="btn" to="#">Get Subscription</Link>

                </div>
            </div>
            <div className="col-lg-3 d-none d-lg-block">
                <div className="cta-image">
                    <div className="shape-2 parallaxed">
                        <svg xmlns="http://www.w3.org/2000/svg" width="329.5px" height="187.5px">
                            <path fill-rule="evenodd" stroke="rgb(246, 177, 61)" stroke-width="3px" stroke-dasharray="12, 6" stroke-linecap="butt" stroke-linejoin="miter" fill="none" d="M1.499,19.499 C31.499,4.573 135.999,-24.65 201.499,58.499 C266.999,141.64 250.499,193.435 331.500,178.499 " />
                        </svg>
                    </div>
                    <div className="image">
                        <img src="assets/images/cta-2.png" alt="Call To Action"/>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
</div>



    
                            
            
               
            

    
                    


<div className="progress-wrap">
<svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
    <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
</svg>
</div>


<div id="course-hover">
<div className="course-hover">
    <div className="courses-content">
        <div className="top-meta"><Link className="tag" to="#">Beginner</Link></div>
        <h3 className="title"><Link to="/">Design 101: Product & Web Design Course</Link></h3>
    </div>
    <div className="rating">
        <div className="rating-star">
            <div className="rating-active"style={{width: '60%'}}></div>
        </div>
        <span>(4.5)</span>
    </div>
    <p className="price">Free</p>
    <p>World-className training and programs developed by top teachers Lorem ipsum dolor sit amet consectur adip iscing elit sed eiusmod tempor.</p>
    <div className="courses-meta">
        <p className="student"><i className="flaticon-google-docs"></i> 10 Lessons</p>
        <p className="student"><i className="far fa-clock"></i> 03 Hours</p>
    </div>
    <div className="courses-btn"><Link className="btn" to="/">Course Full Details</Link></div>
</div>
</div>

</div>



)
}


