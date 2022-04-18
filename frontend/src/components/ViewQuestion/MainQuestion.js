import { Avatar } from "@material-ui/core";
import { History } from "@mui/icons-material";
import { Bookmark } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";
import "react-quill/dist/quill.snow.css"; //quill's css important

function MainQuestion() {
  const [show, setShow] = useState(false);
  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2 className="main-question">This is question title</h2>
          <Link to="/add-question">
            <button>Ask Question</button>
          </Link>
        </div>
        <div className="mian-desc">
          <div className="info">
            <p>Timestamp</p>
            <p>
              View <span>43 times</span>
            </p>
          </div>
        </div>
        <div className="all-questions">
          <div className="all-questions-container">
            <div className="all-questions-left">
              <div className="all-options">
                <p className="arrow">▲</p>
                <p className="arrow">0</p>
                <p className="arrow">▼</p>
                <Bookmark />
                <History />
              </div>
            </div>
            <div className="question-answer">
              <p>This is question body</p>
              <div className="author">
                <small>asked "Timstamp"</small>
                <div className="auth-details">
                  <Avatar />
                  <p>Author name</p>
                </div>
              </div>
              <div className="comments">
                <div className="comment">
                  <p>
                    This is comment <span>User name</span>
                    <small>Timestamp</small>
                  </p>
                </div>
                <p onClick={() => setShow(!show)}>Add a comment</p>
                {show && (
                  <div className="title">
                    <textarea
                      style={{
                          margin:"5px 0px",
                          padding: "10px",
                          border: "1px solid rgba(0,0,0,0.2)",
                          borderRadius: "30x",
                          outline: "none",
                      }}
                      type="text"
                      placeholder="Add your comment..."
                      rows="5"
                    ></textarea>
                    <button style={{
                        maxWidth: "fit-content"
                    }}>Add Comment</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="all-questions" style={{
            flexDirection: "column"
        }}>
          <p style={{marginBottom: "20px", fontSize: "1.3rem", fontWeight: "300"}}>No. of answer</p>
          <div className="all-questions-container">
            <div className="all-questions-left">
              <div className="all-options">
                <p className="arrow">▲</p>
                <p className="arrow">0</p>
                <p className="arrow">▼</p>
                <Bookmark />
                <History />
              </div>
            </div>
            <div className="question-answer">
              <p>This is question body</p>
              <div className="author">
                <small>asked "Timstamp"</small>
                <div className="auth-details">
                  <Avatar />
                  <p>Author name</p>
                </div>
              </div>
              <div className="comments"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-answer">
          <h3 style={{
              fontSize: "22px",
              margin: "10px 0",
              fontWeight: "400"
          }}>Your Answer</h3>
          <ReactQuill className="react-quill" theme="snow" style={{
              height: "150px"
          }}/>
      </div>
      <button style={{maxWidth: "fit-content"}}>Post Your Answer</button>
    </div>
  );
}

export default MainQuestion;
