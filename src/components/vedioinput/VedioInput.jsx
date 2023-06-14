import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Row, Col } from "react-bootstrap";

import { MdCloudUpload, MdDelete } from "react-icons/md";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

import { ProgressBar } from "react-bootstrap";

import LoaderBall from "../loader/LoaderBall";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "aos/dist/aos.css";
import AOS from "aos";

import "./input.css";

const VedioInput = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 400,
    });
  }, []);

  const { user } = useAuthContext();
  const inputRef = React.useRef();
  const navigate = useNavigate();

  const [vedio, setVedio] = useState();
  const [filevideo, setFileVideo] = useState();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [highlightedVideo, setHighlightedVideo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isHighlight, setIsHighlight] = useState(false);
  const [fileName, setFileName] = useState("No selected file");
  const [cancelId, setCancelId] = useState(uuidv4);

  /*start of handle file function */

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setFileVideo(url);
    setVedio(file);
    setFileName(file.name);

    const formData = new FormData();
    formData.append("video", file);
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        setUploadProgress(progress);
      }
    });

    xhr.open("POST", "/upload-video");
    xhr.send(formData);
  };

  /*End of handle file function */

  /*start of handle new click */

  const handleNewClick = () => {
    setIsLoading(false);
    setIsHighlight(false);
  };

  /*Endof handle file function */

  /*start of handle click */
  let videoUrl = "";
  const handleClick = () => {
    if (user) inputRef.current.click();
    else navigate("/login");
  };

  /*End of handle click */

  /*start of the generate function */
  const genVideo = async (e) => {
    console.log(vedio);
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/upload`,
          {
            video: vedio,
            requestId: cancelId,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: JSON.parse(localStorage.getItem("vh_user")).token,
            },
          }
        )
        .then((res) => {
          videoUrl = JSON.stringify(res.data.urlH);
          setHighlightedVideo(videoUrl);
          setIsLoading(false);
          setIsHighlight(true);
          console.log("This is video  " + videoUrl);
        });
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("It is not a soccer !", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (error.response?.status === 401) {
        toast.error("Please enter video bigger than 5 minutes", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error("There is error please try again later", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      setIsLoading(false);
      setVedio(false);
      setIsHighlight(false);
    }
  };

  /*End of Generate function */

  const handleDelete = () => {
    setFileName("No selected file");
    setVedio(null);
  };

  const handleCancelClick = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/generate/cancel`,
        {
          requestId: cancelId,
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("vh_user")).token,
          },
        }
      )
      .then((res) => console.log(res));
    toast.success("The process is cancelled sucessecfully", {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setCancelId(uuidv4());
    setIsLoading(false);
    setIsHighlight(false);
  };

  return (
    <div>
      <Row style={{ margin: "10rem 0 5rem" }}>
        <Col
          className="main-col"
          style={{
            backgroundColor: "#161616",
            borderRadius: "1rem",
          }}
          data-aos="zoom-in"
        >
          <h1 className="input-main-header">Highlight your match now</h1>
          {!isLoading && !isHighlight ? (
            <div id="gene">
              {vedio ? (
                <video
                  className="VideoInput_video"
                  width={600}
                  height={305}
                  controls
                  src={filevideo}
                />
              ) : (
                <form
                  action=""
                  className="input-form"
                  onClick={() => handleClick()}
                >
                  <input
                    type="file"
                    accept=".mkv,.mp4"
                    ref={inputRef}
                    hidden
                    onChange={handleFileChange}
                    name="video"
                  />

                  <>
                    <MdCloudUpload color="#6aac28" size={60} />
                    <p style={{ fontWeight: "bold" }}>Upload The Match</p>
                  </>
                </form>
              )}

              <div style={{ marginTop: "1rem !important" }}>
                {vedio && uploadProgress < 100 && (
                  <ProgressBar
                    animated
                    now={uploadProgress}
                    label={`${Math.trunc(uploadProgress)}%`}
                    color="#6aac28 !important"
                  />
                )}
              </div>

              <div className="data-div">
                <span className="span" style={{ color: "#6aac28" }}>
                  {fileName}
                  <MdDelete
                    onClick={() => handleDelete()}
                    style={{ cursor: "pointer" }}
                  />
                </span>
                <button
                  type="button"
                  className="btn"
                  onClick={(e) => genVideo(e)}
                  disabled={!vedio}
                >
                  Highlight Now
                </button>
              </div>
            </div>
          ) : isLoading && !isHighlight ? (
            <div className="d-flex flex-column">
              <LoaderBall message={"It will take few minutes"} />
              <button
                type="button"
                className="btn"
                onClick={() => handleCancelClick()}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <video
                className="VideoInput_video"
                width={600}
                height={305}
                controls
                src={highlightedVideo.replace(/"/g, "")}
              />
              <div className="data-div" style={{ flexDirection: "row" }}>
                <button type="button" className="btn">
                  <a
                    download=""
                    href={highlightedVideo.replace(/"/g, "")}
                    style={{ color: "unset", textDecoration: "none" }}
                  >
                    download
                  </a>
                </button>

                <button
                  type="button"
                  className="btn"
                  onClick={() => handleNewClick()}
                >
                  New
                </button>
              </div>
            </div>
          )}
        </Col>
      </Row>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default VedioInput;
