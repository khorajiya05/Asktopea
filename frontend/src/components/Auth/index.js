import React, { useState } from "react";
import "./index.css";
import { sendPasswordResetEmail, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useHistory } from "react-router-dom";



function Index() {
  

  const [register, setRegister] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  //-----------------------------------For SighUp with google----------------------------------
  const handleSignInGoogle = () => {
    signInWithPopup(auth, provider).then((res) => {
      history.push("/");
      console.log(res);
    });
  };

  //-----------------------------------------For Register-----------------------------------
  const handleRegister = (e) => {
    setError("");
    e.preventDefault();
    setLoading(true);
    if (email == "" || password == "" || username == "") {
      // console.log("pela lakh to khara");
      setError("Required field is missing");
      setLoading(false);
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          setLoading(false);
          history.push("/");
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
          setLoading(false);
        });
    }
  };

  //------------------------------------------For Login----------------------------
  const handleSignIn = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (email == "" || password == "") {
      setError("Required field is missing");
      setLoading(false);
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log(res);
          history.push("/");
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.code);
          setError(error.message);
          setLoading(false);
        });
    }
  };

  //-------------------------------------forget Password--------------------------------
  const handleForgotPassword = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (email == "") {
      setError("Require field is missing");
      setLoading(false);
    } else {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setLoading(false);
          alert(`We sent an email to ${email} with a link to reset password`);
          setForgotPassword(false);
          setEmail("");
        })
        .catch((error) => {
          console.log(error.code);
          setError(error.message);
          setLoading(false);
        });
    }
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <p>
          {register
            ? "Register"
            : "Log in using any of the following services" && forgotPassword
            ? "Forgot Password"
            : "Log in using any of the following services"}
        </p>
        <div className="sign-options">
          {forgotPassword ? (
            ""
          ) : (
            <div onClick={handleSignInGoogle} className="single-option">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEMAAABDCAMAAADwFEhBAAABDlBMVEX////qQzU0qFNChfT7vAUgd/M2f/Svxvo9g/T7uQBvnvbpOCcwp1D7twAjpEjqQTPqPS7pMyHtaWAYokL+9/f1sq7pLBfrUUX62tjxj4npNzf81IT95bj8wwD8yl7+7dD93Jz7wDH8yFT/+/T+9OP+8drm7f2Ss/hArFzS6NdXs23y+PScz6fvenLsYljsWE7whH3znpr3wb775eToGwD50c/0qaX0nXfoLi70lB35rhHuZS3yhiL3pRbsVTDwdyhelPX94Kry9v68siKHxpa90PqPrz9cq0up1LLWtySrsjVyrUfouhjX4/ytxYGhvfm219A2ondAi948lbc5no81pWVCkc46mqN8p/F1vobbkqsLAAADGklEQVRYha2Ua3+aMBTGQ0SqggFEEdu57tJVRKq11m7d1Vm7sYvbunu//xdZELFJSLjonpcJvz/Pec7JAUCo5rTVORm2JUkaNU7HZxPxlwI546Ftqoah65ih64Zq2sbJWbMAodW2VUNipBumeeLkAzTHtqqzgBhjj6Y5EBemiLCSYTeyknHaZhohooxTEWM7ixDKHKaE2zBzEEIrhijbpqTmQ+Bwz/nRTpLtFEpt8F0YeaJIR0g7uwBDHkJX8Yzb4dDrORCdZEd09XzUaU0dxzm7OMXPRc9ATO0EwR61yClwOqaaigA6m6fZTjSv2QkHUIgYq6yJC95nE0kVIiZMJYYuelaNoeACPH1GI9pFdk2kI/lyn0IUJgBwUO0+lzYUXS3uAoC6jPUihth5FhWreytG92UEUTtbIMB9eaXuq6iSbRCgKq9Vf70vqdzByNJhPWbI3Tf729l4sPGBIZdbpRHHEal6uBXjIcmQOR/MyqkqASLSUI84jFqllCoAHtfJUg6KM8r4sVCMt1sw5uAJxbhXnKEc04w6ry1ZjOV/8LHcPQ/M2L0vx7vPB+5L9pxm1QKY98JrTE1hRUMA/W7lq0WScb3HakYQKjVA7Q/5HUScYhIiXVR64cmdj/cQoiAbsSSLUa4BEcgHGCqHkR4ZMh51EO91+SOMGJxEaM3pTKNDzKjKn+BaVr+QjV50eFCVP8M7oUEqYlmmpmMZnR7VrwgE1NzUSuiJq8TnXzRIQ8RO5iWKoXyNLwYWpCGaKJNjGlFS5purBWIgls9FfCsziB5xqdHV4GDdpJW+Z90wpczJa6aa0IobkLEMAs/SoAa/E9Oh7FH/8BELgRqyvEXQDxUsXAtpEfrHBlKZMUY9tpooXGRhIUTUav1UKuSYk14hD8IT+jVbWSlfJxIbJHIVSbN+K0xPikOg9UdRahwEhrj5ITd/uYgw2ESLRYyUDeFbeaxoVuq267vJQWGFUt5kpAClU1CelTvw1zPJqwJZfpaJ2IvLw2CAm8PDRn3fwzOurUdGWw2952et2mRN+Kndei6Erufd+kFfWMM/vOlQ0TvCFEoAAAAASUVORK5CYII="
                alt="google"
              />
              <p>Login with google</p>
            </div>
          )}
        </div>
        <div className="auth-login">
          <div className="auth-login-container">
            {register ? (
              <>
                <div className="input-field">
                  <p>Username</p>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                  />
                </div>

                <div className="input-field">
                  <p>Email</p>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                  />
                </div>

                <div className="input-field">
                  <p>Password</p>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                  />
                </div>
                <button
                  onClick={handleRegister}
                  disabled={loading}
                  style={{ marginTop: "10px" }}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </>
            ) : forgotPassword ? (
              <>
                <div className="input-field">
                  <p>Email</p>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                  />
                </div>

                <button
                  onClick={handleForgotPassword}
                  disabled={loading}
                  style={{ marginTop: "15px" }}
                >
                  {loading ? "Email sending..." : "Reset Password"}
                </button>
              </>
            ) : (
              <>
                <div className="input-field">
                  <p>Email</p>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                  />
                </div>
                <div className="input-field">
                  <p>Password</p>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                  />
                </div>
                <button
                  onClick={handleSignIn}
                  disabled={loading}
                  style={{ marginTop: "15px" }}
                >
                  {loading ? "Signing In..." : "Login"}
                </button>
                <p
                  onClick={() => {
                    setForgotPassword(true);
                    setError("");
                    setEmail("");
                  }}
                  style={{
                    marginTop: "5px",
                    textAlign: "center",
                    color: "#0095ff",
                    textDecoration: "none",
                    cursor: "pointer",
                    fontSize: "15px",
                  }}
                >
                  Forgot Password ?
                </p>
              </>
            )}
            <p
              onClick={(e) => {
                forgotPassword ? setRegister(false) : setRegister(!register);
                setError("");
                setForgotPassword(false);
                setPassword("");
                setEmail("");
                setUsername("");
              }}
              style={{
                // marginTop: "10px",
                textAlign: "center",
                color: "#0095ff",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              {register
                ? "Login"
                : "Register" && forgotPassword
                ? "Login"
                : "Register"}
            </p>
          </div>
        </div>
        {error !== "" && (
          <p style={{ marginTop: "-20px", fontSize: "16px", color: "red" }}>
            {" "}
            {error}{" "}
          </p>
        )}
      </div>
    </div>
  );
}

export default Index;
