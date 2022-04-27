import React from "react";
import "./index.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Profile() {
  let search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("q");
  const qcc = params.get("qc");
  const [questionData, setQuestionData] = useState();
  const history = useHistory();

  //--------------------------------------Get Question Deails------------------

  useEffect(() => {
    async function getQustionDetails() {
      await axios
        .get(`api/question/${id}`)
        .then((res) => {
          // console.log(res.data[0]);
          setQuestionData(res.data[0]);
          console.log(qcc);
          console.log(id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getQustionDetails();
  }, [id]);



  return (
    <div>
      <div class="container mt-5">
        <div class="row d-flex justify-content-center">
          <div class="col-md-7">
            <div class="card p-3 py-4">
              <div class="text-center">
                <img src={questionData} width="100" class="rounded-circle" />
              </div>
              <div class="text-center mt-3">
                <span class="bg-secondary p-1 px-4 rounded text-white">
                  Pro
                </span>
                <h5 class="mt-2 mb-0">
                  {questionData?.user?.displayName
                    ? questionData?.user?.displayName
                    : String(questionData?.user?.email).split("@")[0]}
                </h5>
                <span>{questionData?.user?.email}</span>
                <div class="px-4 mt-1">
                  <p class="fonts">
                    {/* Consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. */}
                  </p>
                </div>
                <ul class="social-list">
                  <li>
                    <i class="fa fa-facebook"></i>
                  </li>
                  <li>
                    <i class="fa fa-dribbble"></i>
                  </li>
                  <li>
                    <i class="fa fa-instagram"></i>
                  </li>
                  <li>
                    <i class="fa fa-linkedin"></i>
                  </li>
                  <li>
                    <i class="fa fa-google"></i>
                  </li>
                </ul>
                <div class="buttons">
                  <button class="btn btn-outline-primary px-4">Message</button>
                  <button class="btn btn-primary px-4 ms-3">Contact</button>
                </div>
              </div>
            </div>
            <div>
              <button onClick={() => history.goBack()} className="button1">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
