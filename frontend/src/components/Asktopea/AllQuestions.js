import React from "react";
import {Link} from "react-router-dom";
import {Avatar} from "@mui/material";
import "./CSS/AllQuestions.css";

function AllQuestions( {question} ) {

  // let tags = JSON.parse(question?.tags[0])
  let tags = [];

  return (
    <div>
      <div className="all-questions">
        <div className="all-questions-container">
          <div className="all-questions-left">
            <div className="all-options">
              <div className="all-option">
                <p>0</p>
                <span>Votes</span>
              </div>
              <div className="all-option">
                <p>0</p>
                <span>Answers</span>
              </div>
              <div className="all-option">
                <p>{question?.answerDetails?.length}</p>
                <small>0 views</small>
              </div>
            </div>
          </div>
          <div className="question-answer">
            <Link to='/question'>{question.title}</Link>
            <div
              style={{
                maxwidth: "90%",
              }}
            >
              <div>
               {question?.body}
              </div>
            </div>
            <div
              style={{
                display: "flex",
              }}
            >
              {
                tags.map((_tag) =>(
                  <>
                    <span className="quesiton-tags">{_tag}</span>
                  </>
                ))
              }
              {/* <span className="question-tags">react</span>
              <span className="question-tags">ant</span>
              <span className="question-tags">frontend</span> */}
            </div>
            <div className="author">
              <small>{new Date(question?.created_at).toLocaleString()}</small>
              <div className="author-details">
                <Avatar src={question?.uesr?.photo} />
                <p>{question?.user?.displayName ? question?.user?.displayName : String(question?.user?.email).split('@')[0]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllQuestions;
