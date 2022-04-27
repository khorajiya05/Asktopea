import { Avatar } from "@material-ui/core";
import { History } from "@mui/icons-material";
import { Bookmark } from "@mui/icons-material";
import React from "react";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";
import "react-quill/dist/quill.snow.css"; //quill's css important
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import "./MainQuestion.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

function MainQuestion() {
  const [show, setShow] = useState(false);
  const [answer, setAnswer] = useState("");
  const [comment, setComment] = useState("");
  const [questionData, setQuestionData] = useState();

  let search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("q");
  const user = useSelector(selectUser);

  const handleQuill = (value) => {
    setAnswer(value);
  };

  //-----------------------Post Comment----------------------

  const handleComment = async () => {
    if (comment !== "") {
      const body = {
        question_id: id,
        comment: comment,
        user: user,
      };
      await axios.post("/api/comment", body).then((res) => {
        console.log(res.data);
        setComment("");
        setShow(false);
        getUpdatedAnswer();
      });
    }
  };

  //------------------------Post Asnwer----------------------

  const handleSubmit = async () => {
    if (answer !== "") {
      const body = {
        question_id: id,
        answer: answer,
        user: user,
      };
      const config = {
        header: {
          "Content-type": "application/json",
        },
      };
      await axios
        .post("/api/answer", body, config)
        .then((res) => {
          console.log(res.data);
          alert("Answer added successfully");
          setAnswer("");
          getUpdatedAnswer();
        })
        .catch((err) => console.log(err));
    }
  };

  //------------------------------Get Question & Update after submit answer---------------------------
  useEffect(() => {
    async function getQustionDetails() {
      await axios
        .get(`api/question/${id}`)
        .then((res) => {
          console.log(res.data[0]);
          setQuestionData(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getQustionDetails();
  }, [id]);

  async function getUpdatedAnswer() {
    await axios
      .get(`api/question/${id}`)
      .then((res) => {
        console.log(res.data[0]);
        setQuestionData(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //---------------------------------------------------Profile-------------------------------------

  return (
    <div className="main1">
      <div className="main-container">
        <div className="main-top">
          <h2 className="main-question">{questionData?.title}</h2>
          <Link to="/add-question">
            <button>Ask Question</button>
          </Link>
        </div>
        <div className="main-desc">
          <div className="info">
            <p>{new Date(questionData?.created_at).toLocaleDateString()}</p>
            <p>
              View <span>13 times</span>
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
                {/* <Bookmark /> */}
                <History />
              </div>
            </div>
            <div className="question-answer">
              <p>{ReactHtmlParser(questionData?.body)}</p>
              <div className="author">
                <small>
                  asked {new Date(questionData?.created_at).toLocaleString()}
                </small>
                <div className="author-details">
                  <Avatar src={questionData?.user?.photo} />
                  <p>
                    <Link to={`/profile?q=${questionData?._id}`}>
                      {questionData?.user?.displayName
                        ? questionData?.user?.displayName
                        : String(questionData?.user?.email).split("@")[0]}
                    </Link>
                  </p>
                </div>
              </div>

              {
                //-------------------------------------------For Comment--------------------------------------------------------
              }
              <div className="comments">
                <div className="comment">
                  {questionData?.comments &&
                    questionData?.comments?.map((_qd) => (
                      <p>
                        {_qd?.comment} -{" "}
                        <span>
                          <Link to={`/profile?q=${questionData?._id}?qc=${_qd._id}`}>
                            {_qd?.user?.displayName
                              ? _qd?.user?.displayName
                              : String(_qd?.user?.email).split("@")[0]}
                          </Link>
                        </span>
                        <small>
                          {new Date(_qd?.created_at).toLocaleString()}
                        </small>
                      </p>
                    ))}
                </div>
                <p onClick={() => setShow(!show)}>Add a comment</p>
                {show && (
                  <div className="title">
                    <textarea
                      style={{
                        margin: "5px 0px",
                        padding: "10px",
                        border: "1px solid rgba(0,0,0,0.2)",
                        borderRadius: "30x",
                        outline: "none",
                      }}
                      type="text"
                      placeholder="Add your comment..."
                      rows="5"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                      onClick={handleComment}
                      style={{
                        maxWidth: "fit-content",
                      }}
                    >
                      Add Comment
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {
          //-------------------------------------------------------For Answer-----------------------------------
        }

        <div
          className="all-questions"
          style={{
            flexDirection: "column",
          }}
        >
          <p
            style={{
              marginBottom: "20px",
              fontSize: "1.3rem",
              fontWeight: "300",
            }}
          >
            {questionData?.answerDerails?.length} Answers
          </p>
          {questionData?.answerDetails?.map((_q) => (
            <div key={_q?._id} className="all-questions-container">
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
                <p>{ReactHtmlParser(_q?.answer)}</p>
                <div className="author">
                  <small>
                    posted {new Date(_q?.created_at).toLocaleString()}
                  </small>
                  <div className="author-details">
                    <Avatar src={_q?.user?.photo} />
                    <p>
                      {_q?.user?.displayName
                        ? _q?.user?.displayName
                        : String(_q?.user?.email).split("@")[0]}
                    </p>
                  </div>
                </div>
                <div className="comments"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="main-answer">
        <h3
          style={{
            fontSize: "22px",
            margin: "10px 0",
            fontWeight: "400",
          }}
        >
          Your Answer
        </h3>
        <ReactQuill
          value={answer}
          onChange={handleQuill}
          className="react-quill1"
          theme="snow"
          style={{
            height: "150px",
          }}
        />
        <button
          type="submit"
          onClick={handleSubmit}
          style={{ maxWidth: "fit-content", marginTop: "50px" }}
        >
          Post Your Answer
        </button>
      </div>
    </div>
  );
}

export default MainQuestion;
