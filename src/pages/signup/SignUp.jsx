import React, { useState } from "react";
import Style from "./AuthStyle.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const SignUp = () => {

  const [error, setError] = useState(null)
  //const [isLoading, setIsLoading] = useState(null)
  const[profilePic,setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  

  const navigate = useNavigate();

  const handleChange = (event) => {
    const file = event.target.files[0];
    setProfilePic(file);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);


    console.log(file);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      let response = await axios.post(
        `${process.env.REACT_APP_API_URL}/signup`,
        {
          firstName: e.target.firstName.value,
          lastName: e.target.secondName.value,
          email: e.target.email.value,
          password: e.target.password.value,
          image:profilePic
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      
  
      let user = await response.data;
      console.log(user);
      navigate('/login');
    }catch(err){
      console.log(err);
      setError(err);
    }
    
    
    //console.log(res2);

    /* if (response.status === 200){

      setIsLoading(false);

      navigate('/login');
    }
    else{
      console.log("snjdnjkan");
      setIsLoading(false)
      setError("Email is already exist")
    } */
    

  };
  return (
    <div className={Style.Auth_form_container}>
      <form className={Style.Auth_form} onSubmit={handleSubmit}>
        <div className={Style.Auth_form_content}>
          <h3 className={Style.Auth_form_title}>Sign up</h3>

      <div>

        <div className="d-flex justify-content-center mb-4">
            <img src={profilePic?previewUrl:"https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg"}
            className="rounded-circle" alt="example placeholder" style={{width:'5rem',height:'5rem'}} />
        </div>

        <div className="d-flex justify-content-center">
            <div className="btn-primary btn-rounded" style={{color:'white' ,backgroundColor: '#6aac28', padding: '0.75rem 1.5rem', borderRadius: '5px', border: 'none', fontSize: '1.2rem' , fontWeight:'bold'}}>
                <label className="form-label text-white m-1" htmlFor="customFile2">Choose file</label>
                <input type="file" className="form-control d-none" id="customFile2" onChange={handleChange}
                multiple accept="image/*" required/>
            </div>
        </div>

      </div>


          <div className="form-group mt-3">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-control mt-1"
              placeholder="Enter FirstName"
              required
            />
          </div>

          <div className="form-group mt-3">
            <label>Second Name</label>
            <input
              type="text"
              name="secondName"
              className="form-control mt-1"
              placeholder="Enter SecondName"
              required
            />
          </div>

          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              className="form-control mt-1"
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              name="password"
              required
            />
          </div>
          {/* <input type="file" name="image" multiple accept="image/*" required onChange={handleChange}/> */}

          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn-primary" style={{color:'white' ,backgroundColor: '#6aac28', padding: '0.75rem 1.5rem', borderRadius: '5px', border: 'none', fontSize: '1.2rem' , fontWeight:'bold'}}>
              Submit
            </button>

            {error && <div class="alert alert-danger" role="alert">
                            {error.response?.data}
                       </div>
            }
          </div>
          <p
            className="forgot-password text-center mt-2"
            style={{ paddingTop: "10px" }}
          >
            <b>
              <a href="/login">login?</a>
            </b>
          </p>
        </div>
      </form>
      
    </div>
  );
}

export default SignUp;
