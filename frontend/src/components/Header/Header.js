import React from "react";
import "./CSS/Header.css";
import SearchIcon from "@material-ui/icons/Search";
import InboxIcon from "@material-ui/icons/Inbox";
import { Avatar } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
// import { signOut } from "firebase/auth";

function Header() {
  const user = useSelector(selectUser);
  const history = useHistory();

  return (
    <header>
      <div className="header-container">
        <div className="header-left">
          <Link to="/">
            <h1 id="title">Asktopea</h1>
          </Link>
          {/* <h3>Products</h3> */}
        </div>
        <div className="header-middle">
          <div className="header-search-container">
            <SearchIcon />
            <input type="text" placeholder="Search..." />
          </div>
        </div>
        <div className="header-right">
          <div className="header-right-container">
            <span
              onClick={() => {
                auth.signOut();
                history.push("/auth");
              }}
              className="avtar"
            >
              <Avatar src={user?.photo} />
            </span>
            {/* <div
              id="logout"
              onClick={() => {
                auth.signOut();
                history.push("/auth");
              }}
            >
              <p>Logout</p>
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
