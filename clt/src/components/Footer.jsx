import React from 'react'
import {Link} from 'react-router-dom'
export default function footer() {
  return (
    <div>
        <div className="footer-section section">
            <div className="container">

                <div className="footer-widget-wrap">
                    <div className="row">

                        <div className="col-lg-3 col-sm-6">
                            <div className="footer-widget widget-about">
                                <div className="footer-logo">
                                    <Link to="home"><img src="assets/images/logo-white.png" alt=""/></Link>
                                </div>
                                <p className="text">World largest online learning platform. Download our apps to start learning.</p>
                                <div className="widget-info">
                                    <div className="info-icon">
                                        <i className="flaticon-phone-call"></i>
                                    </div>
                                    <div className="info-text">
                                        <p className="call-text">Call Us Free</p>
                                        <Link to="tel:+91458654528">+91 458 654 528</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="footer-widget">
                                <h4 className="footer-widget-title">Trending Courses</h4>
                                <div className="widget-link">
                                    <ul className="link">
                                        <li><Link to="index.html">Home </Link></li>
                                        <li><Link to="#">Pricing</Link></li>
                                        <li><Link to="about.html">Compare plans</Link></li>
                                        <li><Link to="/contact">Contact us</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="footer-widget">
                                <h4 className="footer-widget-title">Study material</h4>
                                <div className="widget-link">
                                    <ul className="link">
                                        <li><Link to="blog.html">Blog</Link></li>
                                        <li><Link to="#">Weekly webinar</Link></li>
                                        <li><Link to="#">Academy</Link></li>
                                        <li><Link to="#">Free eBooks & checklists</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="footer-widget">
                                <h4 className="footer-widget-title">Download Now</h4>
                                <div className="widget-download">
                                    <Link to="#"><img src="assets/images/app-1.jpg" alt=""/></Link>
                                    <Link to="#"><img src="assets/images/app-2.png" alt=""/></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-copyright">
                    <div className="copyright-wrapper">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-6">
                                <div className="copyright-text">
                                    <p>© Copyright 2023 upstudy All rights reserved. </p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="copyright-social">
                                    <ul className="social">
                                        <li><Link to="#"><i className="fab fa-facebook-f"></i></Link></li>
                                        <li><Link to="#"><i className="fab fa-twitter"></i></Link></li>
                                        <li><Link to="#"><i className="fab fa-linkedin-in"></i></Link></li>
                                    </ul>
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
                        <div className="rating-active" style={{width:'60%'}}></div>
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
