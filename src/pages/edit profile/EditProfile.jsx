import React, { useEffect, useState } from "react";
import Style from "./AuthStyle.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const EditProfile = () => {
  const user = JSON.parse(localStorage.getItem("vh_user"));
  const logUser = user.userData;
  console.log(logUser);

  const [error, setError] = useState(null);
  const { dispatch, toggleNavItems } = useAuthContext();

  const logOut = () => {
    localStorage.removeItem("vh_user");
    dispatch({ type: "LOGOUT" });
    toggleNavItems(false);
    navigate("/");
  };

  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (event) => {
    const file = event.target.files[0];
    setProfilePic(file);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);

    console.log(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.post(
        `${process.env.REACT_APP_API_URL}/profile/editProfile`,
        {
          firstName: e.target.firstName.value,
          lastName: e.target.secondName.value,
          email: e.target.email.value,
          newPassword: e.target.Newpassword.value,
          oldPassword: e.target.Oldpassword.value,
          image: profilePic,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: JSON.parse(localStorage.getItem("vh_user")).token,
          },
        }
      );

      /* let user = await response.data;
      console.log(user); */

      logOut();

      navigate("/login");
    } catch (err) {
      setError(err);
    }
  };
  return (
    <div className={Style.Auth_form_container}>
      <form className={Style.Auth_form} onSubmit={handleSubmit}>
        <div className={Style.Auth_form_content}>
          <h3 className={Style.Auth_form_title}>Edit Profile</h3>

          <div>
            <div className="d-flex justify-content-center mb-4">
              <img
                src={
                  profilePic
                    ? previewUrl
                    : `data:${logUser.pic?.image.contentType};base64,${logUser.pic.image.data}`
                }
                className="rounded-circle"
                alt="example placeholder"
                style={{ width: "5rem", height: "5rem" }}
              />
            </div>

            <div className="d-flex justify-content-center">
              <div className="btn-primary btn-rounded"  style={{ backgroundColor: '#6aac28', padding: '0.75rem 1.5rem', borderRadius: '5px', border: 'none', fontSize: '1.2rem' , fontWeight:'bold'}}>
                <label
                  className="form-label text-white m-1"
                  htmlFor="customFile2"
                >
                  Choose file
                </label>
                <input
                  type="file"
                  className="form-control d-none"
                  id="customFile2"
                  onChange={handleChange}
                  multiple
                  accept="image/*"
                />
              </div>
            </div>
          </div>

          <div className="form-group mt-3">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-control mt-1"
              placeholder="Update FirstName"
              id="validationDefault02"
            />
          </div>

          <div className="form-group mt-3">
            <label>Second Name</label>
            <input
              type="text"
              name="secondName"
              className="form-control mt-1"
              placeholder="Update SecondName"
            />
          </div>

          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              className="form-control mt-1"
              placeholder="Update email"
            />
          </div>

          <div className="form-group mt-3">
            <label>New Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="New password"
              name="Newpassword"
            />
          </div>

          <div className="form-group mt-3">
            <label>Old Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Old password"
              name="Oldpassword"
              required
            />
          </div>

          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn-primary" style={{color:'white' ,backgroundColor: '#6aac28', padding: '0.75rem 1.5rem', borderRadius: '5px', border: 'none', fontSize: '1.2rem' , fontWeight:'bold'}}>
              Update
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
            {/* <b>
              <a href="/login">login?</a>
            </b> */}
          </p>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
