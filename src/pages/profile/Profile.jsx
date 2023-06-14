import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

import { MdOutlineVideoLibrary, MdOutlineFavorite } from "react-icons/md";
import { AiOutlineCloudDownload } from "react-icons/ai";

import { MdDelete } from "react-icons/md";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import LoaderBall from "../../components/loader/LoaderBall";

import axios from "axios";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import "react-loading-skeleton/dist/skeleton.css";

import "./profile.css";

const Profile = () => {
  const { id } = useParams();
  let logUser;
  let enc;
  if(id == 1){
    const user = JSON.parse(localStorage.getItem("vh_user"));
    logUser = user.userData;

    enc = logUser.pic.image.data;
  }
  
  //console.log(id);

  const [activeClass, setActiveClass] = useState("left");
  const [userHighlightedVideos, setUserHighlightedVideos] = useState([]);
  const [userFavVideos, setUserFavVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [deletedVideo, setDeletedVideo] = useState("");
  const [userProfileData, setUserProfileData] = useState();

  useEffect(() => {
    setIsLoading(true);
    const getVideos = async () => {
      try {
        await axios
          .get(`${process.env.REACT_APP_API_URL}/profile/getData`, {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("vh_user")).token,
            },
          })
          .then((response) => {
            console.log(response);
            setUserHighlightedVideos(response.data.done);
            //console.log(userHighlightedVideos);
            setUserFavVideos(response.data.fav);
          });

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    const getUserData = async () => {
      await axios.get(`${process.env.REACT_APP_API_URL}/videos/user/${id}`).then((res) => {
        //console.log("the data  " + res.data.user);
        setUserHighlightedVideos(res.data.videoData);
        setUserProfileData(res.data.user);
        console.log(userProfileData)
        setIsLoading(false);
      });
    };

    id == 1 ? getVideos() : getUserData();
  }, []);

  const handleDeleteVideo = async (videoid) => {
    setDeleteLoader(true);
    try {
      await axios
        .delete(`${process.env.REACT_APP_API_URL}/profile/deleteHighlight`, {
          data: { videoId: videoid },
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem("vh_user")).token,
          },
        })
        .then((res) => console.log(res));
      const updated = userHighlightedVideos.filter(
        (video) => video._id !== videoid
      );
      setDeleteLoader(false);
      setUserHighlightedVideos(updated);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFavVideo = async (videoid) => {
    setDeleteLoader(true);
    setDeletedVideo(videoid);
    //console.log(vid)
    try {
      await axios
        .delete(`${process.env.REACT_APP_API_URL}/profile/removeFromFav`, {
          data: { videoId: videoid },
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem("vh_user")).token,
          },
        })
        .then((res) => console.log(res));
      const updated = userFavVideos.filter((video) => video._id !== videoid);
      setDeleteLoader(false);
      setUserFavVideos(updated);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile-page">
      <div className="main-cont">
        <div className="profile-data d-flex">
          <img
            className="profile-img"
            src={id==1?`data:${logUser.pic.image.contentType};base64,${enc}`
            : isLoading ? (
              <SkeletonTheme color="#202020" highlightColor="#444">
                <Skeleton height={10} width={250} />
              </SkeletonTheme>
            ) : (
              `data:${userProfileData?.pic?.image?.contentType};base64,${userProfileData.pic?.image?.data}`
            )}
          />
          <div className="name-data mt-4">
            <p className="profileName">
              {id == 1 ? (
                `${logUser.firstName} ${logUser.lastName}`
              ) : isLoading ? (
                <SkeletonTheme color="#202020" highlightColor="#444">
                  <Skeleton height={10} width={250} />
                </SkeletonTheme>
              ) : (
                `${userProfileData.firstName} ${userProfileData.lastName}`
              )}
            </p>

            <div className="stat-data">
              <div className="highlighted d-flex gap-2 fw-bold">
                {isLoading ? (
                  <ThreeDots
                    height="15"
                    width="15"
                    radius="12"
                    color="white"
                    ariaLabel="loading"
                    wrapperStyle
                    wrapperClass
                  />
                ) : (
                  <p>{userHighlightedVideos?.length}</p>
                )}
                <p>Highlighted</p>
              </div>

              <div className="fav d-flex gap-2 fw-bold">
                {isLoading ? (
                  <ThreeDots
                    height="15"
                    width="15"
                    radius="12"
                    color="white"
                    ariaLabel="loading"
                    wrapperStyle
                    wrapperClass
                  />
                ) : (
                  <p>{userFavVideos?.length}</p>
                )}
                <p>Favourites</p>
              </div>
            </div>

            {id == 1 && (
              <button className="py-2 px-4 rounded">
                <Link to="/edit" className="editLink">
                  Edit Profile
                </Link>
              </button>
            )}
          </div>
        </div>
        <hr
          className="hrr"
          style={{
            color: "#fff",
            height: "1",
            margin: "auto",
            width: "80%",
          }}
        />
        <div className="mobile-data">
          <div className="highlighted d-flex flex-column align-items-center fw-bold">
            <p>{userHighlightedVideos.length}</p>
            <p>Highlighted</p>
          </div>

          <div className="fav d-flex flex-column align-items-center fw-bold">
            <p>{userFavVideos.length}</p>
            <p>Favourites</p>
          </div>
        </div>
      </div>

      <hr
        style={{
          color: "#fff",
          height: "1",
          margin: "auto",
          width: "80%",
        }}
      />

      <div className="vedio-states mt-2 d-flex gap-5">
        <div
          className={
            activeClass === "left" ? "active d-flex gap-2" : "d-flex gap-2"
          }
          onClick={() => setActiveClass("left")}
        >
          <MdOutlineVideoLibrary size={27} />
          <p>Highlighted</p>
        </div>

        <div
          className={
            activeClass === "right" ? "active d-flex gap-2" : "d-flex gap-2"
          }
          onClick={() => setActiveClass("right")}
        >
          <MdOutlineFavorite size={27} />
          <p>Favourites</p>
        </div>
      </div>

      <div className="vedio-div">
        {activeClass === "left" ? (
          <div className="vedio-cont">
            {isLoading ? (
              <LoaderBall message={"loading highlighted videos"} />
            ) : userHighlightedVideos.length ? (
              userHighlightedVideos.map((vod) => (
                <div
                  className="vedio-card"
                  key={vod._id}
                  style={{ width: "450px" }}
                >
                  <video
                    src={vod.highlightUrl}
                    controls
                    style={{ width: "90%" ,  maxHeight: '224px'}}
                  >
                    {" "}
                  </video>
                  <div
                    className="d-flex w-100 mt-2"
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <OverlayTrigger
                      overlay={
                        <Tooltip placement="bottom" id={vod._id}>
                          {vod.title}
                        </Tooltip>
                      }
                    >
                      <p className="paragraph-text">{vod.title}</p>
                    </OverlayTrigger>
                    <div className="d-flex align-items-center">
                      {id == 1 && !deleteLoader ? (
                        <MdDelete
                          className="del"
                          onClick={() => handleDeleteVideo(vod._id)}
                        />
                      ) : (
                        id == 1 && (
                          <ThreeDots
                            height="15"
                            width="15"
                            radius="12"
                            color="white"
                            ariaLabel="loading"
                            wrapperStyle
                            wrapperClass
                          />
                        )
                      )}

                      <a download="" href={vod.highlightUrl}>
                        <AiOutlineCloudDownload
                          style={{
                            color: "white",
                            marginLeft: "0.5rem",
                            cursor: "pointer",
                          }}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p
                style={{ color: "white", fontSize: "1.2rem" }}
                className="mt-5"
              >
                Nothing to show
              </p>
            )}
          </div>
        ) : (
          <div className="vedio-cont">
            {isLoading ? (
              <LoaderBall message={"loading Favorite videos"} />
            ) : userFavVideos.length ? (
              userFavVideos.map((vod) => (
                <div
                  className="vedio-card"
                  key={vod._id}
                  style={{ width: "450px" }}
                >
                  <video
                    src={vod.highlightUrl}
                    controls
                    style={{ width: "90%" ,  height: '201.6px'}}
                  >
                    {" "}
                  </video>
                  <div
                    className="d-flex w-100 mt-2"
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <OverlayTrigger
                      overlay={
                        <Tooltip placement="bottom" id={vod._id}>
                          {vod.title}
                        </Tooltip>
                      }
                    >
                      <p className="paragraph-text">{vod.title}</p>
                    </OverlayTrigger>
                    <div className="d-flex align-items-center">
                      {id == 1 && !deleteLoader ? (
                        <MdDelete
                          className="del"
                          onClick={() => handleDeleteFavVideo(vod._id)}
                        />
                      ) : vod._id === deletedVideo ? (
                        id == 1 && (
                          <ThreeDots
                            height="15"
                            width="15"
                            radius="12"
                            color="white"
                            ariaLabel="loading"
                            wrapperStyle
                            wrapperClass
                          />
                        )
                      ) : (
                        <MdDelete
                          className="del"
                          onClick={() => handleDeleteFavVideo(vod._id)}
                        />
                      )}
                      <a download="" href={vod.highlightUrl}>
                        <AiOutlineCloudDownload
                          style={{
                            color: "white",
                            marginLeft: "0.5rem",
                            cursor: "pointer",
                          }}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p
                style={{ color: "white", fontSize: "1.2rem" }}
                className="mt-5"
              >
                Nothing to show
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
