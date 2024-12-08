import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate()

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
          navigate("/h")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add" style={{ marginTop: '200px',
      display: 'flex',
      gap: '20px'
}}>
      <div className="content" style={{ flex: '5',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'}}>
        <input style={{ padding: '10px',
          border: '1px solid lightgray'}}
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer" style={{height: '300px',
          overflow: 'scroll',
          border: '1px solid lightgray'}}>
          <ReactQuill
            className="editor" style={{height: '100%',
              border: 'none'}}
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu" style={{flex: '2',
        display: 'flex',
        flexDirection:' column',
        gap:'20px'
}}>
        <div className="item"
        style={{
          border: '1px solid lightgray',
          padding: '10px',
          flex:'1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: '#555'
        }}
        >
          <h1 style={{fontSize: '20px'}}>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file" style={{textDecoration: 'underline',
            cursor: 'pointer'}}>
            Upload Image
          </label>
          <div className="buttons" style={{
             display: 'flex',
             justifyContent: 'space-between',
 
             
           
          }}>
            <button style={{cursor: 'pointer',
              color:'teal',
              backgroundColor: 'white',
              border: '1px solid teal',
              padding: '3px 5px'}}>Save as a draft</button>
            <button onClick={handleClick} style={{cursor: 'pointer',
              color: 'white',
              backgroundColor: 'teal',
              border: '1px solid teal',
              padding: '3px 5px'}}>Publish</button>
          </div>
        </div>
        <div className="item" style={{
          border: '1px solid lightgray',
          padding: '10px',
          flex:'1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: '#555'
        }}>
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "design"}
              name="cat"
              value="design"
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
