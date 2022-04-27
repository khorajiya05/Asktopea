import { confirmPasswordReset } from "firebase/auth";
import React, { useEffect, useState } from "react";
import "./index.css";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";

function ResetPassword({ location }) {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();
  const queryParams = new URLSearchParams(location.search);
  const oobCode = queryParams.get("oobCode");

  useEffect(() => {
    if (!oobCode) {
      history.push("/auth");
    }
  }, []);

  //-----------------------------------Reset Password---------------------------------------

  const handleResetPassword = () => {
    setError("");
    setLoading(true);
    if (newPassword == "" || confirmPassword == "") {
      setLoading(false);
      setError("Required field is missing");
    } else if (newPassword !== confirmPassword) {
      setLoading(false);
      setError("Confirm password does not match");
    } else {
      confirmPasswordReset(auth, oobCode, newPassword)
        .then(() => {
          setLoading(false);
          alert("Successfully password changed! You can login now");
          history.push("/auth");
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
          setLoading(false);
        });
    }
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <p>Reset Password</p>
        <div className="auth-login">
          <div className="auth-login-container">
            <div className="input-field">
              <p>Enter New Password</p>
              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
              />
            </div>

            <div className="input-field">
              <p>Enter Confirm Password</p>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
              />
            </div>

            <button
              onClick={handleResetPassword}
              disabled={loading}
              style={{ marginTop: "15px" }}
            >
              {loading ? "Password Reseting..." : "Reset Password"}
            </button>
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

export default ResetPassword;
