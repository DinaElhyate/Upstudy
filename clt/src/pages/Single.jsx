import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import Comments from "../components/Comments";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";
import "../style.scss";

const Single = () => {
  const [post, setPost] = useState({});
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

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

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/h");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setContactForm({
      ...contactForm,
      [name]: value,
    });
  };

  const handleSubmitContact = async (e) => {
    e.preventDefault();

    // Validation des champs requis
    if (!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message) {
      setFormError("Tous les champs sont obligatoires.");
      return;
    }

    try {
      const res = await axios.post("/contact", contactForm);
      setFormSuccess(res.data.message);
      setFormError(""); // Réinitialiser les erreurs
      setContactForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.log(err);
      setFormError(err.response ? err.response.data.message : "Erreur lors de l'envoi du message.");
    }
    
  };

  return (
    <div className="single" style={{ marginTop: "200px", display: "flex", gap: "50px" }}>
      <div
        className="content"
        style={{
          flex: "5",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        <img
          src={`../upload/${post?.img}`}
          alt=""
          style={{ height: "400px", width: "400px", marginLeft: "300px" }}
        />

        {/* Ajouter le titre et la description ici */}
        <h3
          style={{
            fontSize: "14px",
            color: "#333",
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          {post.title}
        </h3>
        <p
          style={{
            textAlign: "justify",
            lineHeight: "15px",
            margin: "0 50px",
          }}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>

        <div
          className="user"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "14px",
          }}
        >
          {post.userImg && (
            <img
              style={{
                width: "100px",
                height: "50px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              src={post.userImg}
              alt=""
            />
          )}
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Auteur: {post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <div className="edit" style={{ display: "flex", gap: "10px" }}>
              <Link to={`/write?edit=2`} state={post}>
                <img
                  src={Edit}
                  alt="Edit"
                  style={{ cursor: "pointer", width: "40px", height: "40px" }}
                />
              </Link>
              <img
                onClick={handleDelete}
                src={Delete}
                alt="Delete"
                style={{ cursor: "pointer", width: "40px", height: "40px" }}
              />
            </div>
          )}
        </div>

        <Comments postId={postId} currentUser={currentUser} />

         {/* Formulaire de contact */}
    {/* Formulaire de contact */}
<div className="contact-form-section" style={{ marginTop: "50px" }}>
  <h2 className="title text-center"style={{ marginLeft: "500px" }} >Contact Us</h2>
  <form
    className="contact-form"
    onSubmit={handleSubmitContact}
    style={{
      maxWidth: "600px",
      margin: "0 auto",
      marginLeft: "500px", // Ajout de la marge gauche
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      marginBottom: "50px", 
    }}
  >
    <input
      type="text"
      name="name"
      placeholder="Votre nom"
      value={contactForm.name}
      onChange={handleFormChange}
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
      name="email"
      placeholder="Votre email"
      value={contactForm.email}
      onChange={handleFormChange}
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
      name="subject"
      placeholder="Sujet"
      value={contactForm.subject}
      onChange={handleFormChange}
      required
      style={{
        padding: "10px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    />
    <textarea
      name="message"
      placeholder="Votre message"
      value={contactForm.message}
      onChange={handleFormChange}
      required
      rows="5"
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
        backgroundColor: "#28A745", // Couleur verte
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Send Message
    </button>
  </form>
  {formError && <p style={{ color: "red" }}>{formError}</p>}
  {formSuccess && <p style={{ color: "green" }}>{formSuccess}</p>}
</div>

  </div>


      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
