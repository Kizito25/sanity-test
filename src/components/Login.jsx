import React, { useEffect } from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { gapi as gAPI } from "gapi-script";

import { client } from "../utils/client";

const googleToken = process.env.REACT_APP_GOOGLE_API_TOKEN;

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    localStorage.setItem("user", JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl, email } = response.profileObj;
    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
      email: email,
    };

    client
      .createIfNotExists(doc)
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    function start() {
      gAPI.client.init({
        clientId: googleToken,
        scope: "profile",
      });
    }
    gAPI.load("client:auth2", start);
  });

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div>
            <GoogleLogin
              clientId={googleToken}
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor px-3 py-2 rounded-full flex items-center gap-3 cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="h-9 w-9 p-1 rounded-full shadow-md" />
                  <span>Sign in with Google</span>
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
              scope="profile"
              ux_mode="redirect"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
