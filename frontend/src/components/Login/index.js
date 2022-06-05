import React from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { gapi } from "gapi-script";
import { client } from "../../client";
import "./index.css";
import Logo from "../Logo";

const Login = () => {
  React.useEffect(() => {
    function start() {
      gapi.client.init({
        client: process.env.REACT_APP_GOOGLE_API_TOKEN,
        scope: "",
      });
    }
    window.gapi.load("client:auth2", start);
  }, []);

  const navigate = useNavigate();

  const successResponseGoogle = (response) => {
    localStorage.setItem("user", JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl } = response.profileObj;
    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };
  const failureResponseGoogle = (response) => console.log(response);

  return (
    <div className="login-page">
      <div className="login-page-title">
        <Logo />
        <p className="logo">Pinstagram</p>
      </div>
      <div className="shadow-2xl">
        <GoogleLogin
          clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
          render={(renderProps) => (
            <button
              type="button"
              className="google-login bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <FcGoogle className="mr-4" /> Sign in with google
            </button>
          )}
          onSuccess={successResponseGoogle}
          onFailure={failureResponseGoogle}
          cookiePolicy="single_host_origin"
        />
      </div>
    </div>
  );
};

export default Login;
