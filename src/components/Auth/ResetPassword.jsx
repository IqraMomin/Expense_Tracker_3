import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

function ResetPassword() {
  const resetInputRef = useRef();

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDu64KsXOLbIT6KN-z3lc1ieSfC1emiObU",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: resetInputRef.current.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error.message);
        return;
      }

      alert("Password reset link sent to your email!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="p-4 shadow-lg bg-white"
        style={{ width: "380px", borderRadius: "16px" }}
      >
        <h3 className="text-center mb-4" style={{color: "#6f42c1"}}>Reset Password</h3>

        <form onSubmit={formSubmitHandler}>
          <label htmlFor="resetEmail">Registered Email</label>
          <input
            id="resetEmail"
            type="email"
            className="form-control my-2 py-2"
            ref={resetInputRef}
            required
          />

          <button className="btn btn-primary w-100 mt-3" style={{backgroundColor: "#6f42c1"}}>
            Send Reset Link
          </button>
        </form>

        <div className="text-center mt-3">
          <Link to="/authpage" style={{color: "#6f42c1"}}>Already a user? Login</Link>
        </div>
      </div>
    </Container>
  );
}

export default ResetPassword;
