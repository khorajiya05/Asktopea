import React from "react";
import PublicIcon from "@material-ui/icons/Public";
import StarsIcon from "@material-ui/icons/Stars";
import WorkIcon from "@material-ui/icons/Work";
import "./CSS/Sidebar.css";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-options">
          <div className="sidebar-option">
            <Link to="/">Home</Link>
          </div>
          <div className="sidebar-option">
            <p>PUBLIC</p>
            <div className="link">
              <div className="link-tag">
                <PublicIcon />
                <Link to="/">Question</Link>
              </div>

              <div className="tags">
                <p>Tags</p>
                <p>Users</p>
              </div>
            </div>
          </div>
          <div className="sidebar-option">
            <p>COLLECTIVES</p>
            <div className="link">
              <div className="link-tag">
                <StarsIcon />
                <Link to="/">Explore</Link>
              </div>
            </div>
          </div>
          <div className="sidebar-option">
            <p>FIND A JOB</p>
            <div className="link">
              <Link
                style={{
                  margin: "10px 20px",
                }}
                to="/"
              >
                Jobs
              </Link>
              <Link
                style={{
                  marginLeft: "20px",
                }}
                to="/"
              >
                Companies
              </Link>
            </div>
          </div>
          <div className="sidebar-option">
            <p>TEAMS</p>
            <div className="link-tag">
              <WorkIcon />
              <Link to="/">Companies</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
