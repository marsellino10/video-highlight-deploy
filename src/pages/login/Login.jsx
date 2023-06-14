import React from "react";
import Style from "./AuthStyle.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { dispatch } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const userData = await res.data;
      console.log(userData);
      console.log(res.data);

      localStorage.setItem("vh_user", JSON.stringify(userData));

      dispatch({ type: "LOGIN", payload: userData });

      navigate("/");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className={Style.Auth_form_container}>
      <form className={Style.Auth_form} onSubmit={handleSubmit}>
        <div className={Style.Auth_form_content}>
          <h3 className={Style.Auth_form_title}>Sign In</h3>
          <div className="form-group mt-3">
            <label>Email </label>
            <input
              type="text"
              name="email"
              className="form-control mt-1"
              placeholder="Enter UserName"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn-primary " style={{color:'white' ,backgroundColor: '#6aac28', padding: '0.75rem 1.5rem', borderRadius: '5px', border: 'none', fontSize: '1.2rem' , fontWeight:'bold'}}>
              Submit
            </button>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error.response.data}
              </div>
            )}
          </div>
          <p
            className="forgot-password text-center mt-2"
            style={{ paddingTop: "10px" }}
          >
            <b>
              <a href="/SignUp">register?</a>
            </b>
          </p>
        </div>
      </form>

      {/* <div className="d-none d-sm-block"
      style={{backgroundColor:'#6aac28' ,maxWidth: '22rem' , height: '25.1rem' , width:'22rem'}}>
        
      </div> */}
    </div>
  );
};

export default Login;
