import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log("Erreur lors de la récupération des données:", err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const itemsPerRow = 4;

  return (
    <div className="container">
      {/* Page Banner Section */}
      <div
        className="section page-banner-section"
        style={{ backgroundImage: "url(assets/images/bg/page-banner.jpg)" }}
      >
        <div className="container">
          <div className="page-banner-wrap">
            <div className="row">
              <div className="col-lg-12">
                <div className="page-banner text-center">
                  <h2 className="title">Course Sidebar dina</h2>
                  <ul className="breadcrumb justify-content-center">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li
                      className="breadcrumb-item active"
                      aria-current="page"
                    >
                      Course Sidebar
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="row">
        {posts.map((post) => (
          <div
            key={post.id}
            className={`col-lg-${12 / itemsPerRow} col-sm-6`}
          >
            <div className="single-course" style={{ margin: "20px" }}>
              <div className="courses-image">
                <Link to="/">
                  <img
                    src={post.img}
                    alt="Courses"
                    style={{ width: "100%", height: "200px" }}
                  />
                </Link>
              </div>
              <div className="courses-content">
                <h3 className="title">
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </h3>
                <p>{getText(post.desc)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Us Section */}
      <div className="contact-form-section" style={{ marginTop: "50px" }}>
        <h2 className="title text-center">Contact Us</h2>
        <form
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Form submitted!");
          }}
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <input
            type="text"
            placeholder="Your Name"
            required
            style={{
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            style={{
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          <input
            type="text"
            placeholder="Subject"
            required
            style={{
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            required
            style={{
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          ></textarea>
          <button
            type="submit"
            style={{
              padding: "10px",
              fontSize: "16px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
