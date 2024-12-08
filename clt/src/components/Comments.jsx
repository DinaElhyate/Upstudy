
import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const Comments = ({ postId, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${postId}`);
        setComments(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const res = await axios.post("/comments", {
        postId,
        userId: currentUser.id,
        text,
      });

      // Add new comment to the list without reloading
      setComments([...comments, res.data]);
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h4>Comments</h4>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: "100%",
            height: "80px",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        />
        <button
          type="submit"
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#28A745", 
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Post Comment
        </button>
      </form>
      <div style={{ marginTop: "20px" }}>
        {comments.map((comment) => (
          <div
            key={comment.id}
            style={{
              marginBottom: "15px",
              padding: "10px",
              borderBottom: "1px solid #ddd",
            }}
          >
            <p>
              <strong>{comment.username}</strong>{" "}
              <span style={{ color: "#777", fontSize: "12px" }}>
                {moment(comment.date).fromNow()}
              </span>
            </p>
            <p style={{ margin: "5px 0" }}>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
