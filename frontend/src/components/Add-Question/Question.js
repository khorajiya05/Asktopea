import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; //quill's css important
import { TagsInput } from "react-tag-input-component";
import "./Question.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import axios from "axios";
import { useState } from "react"

function Question() {
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);

  const history = useHistory();

  const handleQuill = (value) => {
    setBody(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title !== "" && body !== "") {
      setLoading(true)
      const bodyJson = {
        title: title,
        body: body,
        tags: JSON.stringify(tags),
        user: user,
      };

      await axios
        .post("/api/question", bodyJson)
        .then((res) => {
          alert("Question added successfully");
          setLoading(false)
          history.push("/")
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  return (
    <div className="add-question">
      <div className="add-question-container">
        <div className="head-title">
          <h1>Ask Question</h1>
        </div>
        <div className="question-container">
          <div className="question-options">
            <div className="question-option">
              <div className="title">
                <h3>Title</h3>
                <small>
                  Be specific and imagin you're askinga question to another
                  person
                </small>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Add question title"
                />
              </div>
            </div>
            <div className="question-option">
              <div className="title">
                <h3>Body</h3>
                <small>
                  Include all the informaion someone would need to answer your
                  question
                </small>
                <ReactQuill
                  value={body}
                  onChange={handleQuill}
                  className="react-quill"
                  theme="snow"
                />
              </div>
            </div>
            <div className="question-option">
              <div className="title">
                <h3>Tags</h3>
                <small>
                  add up to 5 tags to describe what your question is about
                </small>
                <TagsInput
                  value={tags}
                  onChange={setTags}
                  className="tags-input"
                  name="tags"
                  placeHolder="press enter to add new tag"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="buttons"> */}
      <button
        type="submit"
        disabled={loading}
        onClick={handleSubmit}
        className="button"
      >
        {loading ? "Adding question..." : "Add question"}
      </button>
      {/* </div> */}
    </div>
  );
}

export default Question;
