import React from "react";
import { Link } from "react-router-dom";
import AllQuestions from "./AllQuestions";
import FilterListIcon from "@material-ui/icons/FilterList";
import "./CSS/Main.css";

function main({ questions }) {
  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2>All Questions</h2>
          <Link to="/add-question">
            <button>Ask Question</button>
          </Link>
        </div>
        <div className="main-desc">
          <p>{questions && questions.length} Questions</p>
          <div className="main-filter">
            <div className="main-tabs">
              <div className="main-tab">
                <Link>Newest</Link>
              </div>
              <div className="main-tab">
                <Link>Active</Link>
              </div>
              <div className="main-tab">
                <Link>More</Link>
              </div>
            </div>
            <div className="main-filter-item">
              <FilterListIcon />
              <p>Filter</p>
            </div>
          </div>
        </div>
        <div className="questions">
          {questions.map((_q) => (
            <div className="question">
              <AllQuestions question = {_q} />
              {/* <p>{_q?.tags}</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default main;
