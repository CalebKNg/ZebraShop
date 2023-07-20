import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "@mui/material";
import { Card } from "@mui/material";
import "./Login.css";
import { CLIENT_ID } from "../../configs";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState("");

  let handleSubmission = async () => {
    setMessage("");
    if (isValidEmail(email)) {
      try {
        //check email valid
        const client = new CognitoIdentityProviderClient({
          region: "us-east-2",
        });

        //set up input
        const input = {
          ClientId: CLIENT_ID, // required
          AuthFlow: "USER_PASSWORD_AUTH",
          AuthParameters: {
            USERNAME: email,
            PASSWORD: password,
          },
        };

        const command = new InitiateAuthCommand(input);
        const res = await client.send(command);
        //if okay
        if (res.$metadata.httpStatusCode === 200) {
          //set tokens, save to local storage
          localStorage.setItem("username", email);
          localStorage.setItem(
            "access_token",
            res.AuthenticationResult.AccessToken
          );
          localStorage.setItem(
            "refresh_token",
            res.AuthenticationResult.RefreshToken
          );
          setEmail("");
          setPassword("");
          window.location.href = "/Dashboard";
          console.log("you signed in");
          console.log(res);
        } else {
          console.log("signin unsuccessful");
        }
      } catch (err) {
        setMessage(err.message);
      }
    } else setMessage("Email or password incorrect");
  };

  function isValidEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  return (
    <div className="login-wrapper">
      <Typography variant="h3">Welcome</Typography>
      <Typography variant="h4">Sign in to Continue</Typography>
      <div style={{ height: 30 }} />
      <Typography variant="h8" style={{ align: "flex-start" }}>
        Email
      </Typography>
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
      />
      <div style={{ height: 10 }} />
      <Typography variant="h8">Password</Typography>
      <TextField
        id="outlined-basic"
        label="Password"
        type="password"
        variant="outlined"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div style={{ height: 30 }} />
      <div>
        <Button variant="contained" onClick={handleSubmission}>
          Submit
        </Button>
      </div>
      <div style={{ height: 30 }} />
      <div>
        <Typography variant="h8">Don't have an account? </Typography>
        <Link href="/signup" underline="none">
          {"Sign Up!"}
        </Link>
      </div>
      <div style={{ height: 30 }} />
      {message && (
        <Typography variant="h8" style={{ borderRadius: "20px" }}>
          {message}
        </Typography>
      )}
    </div>
  );
}

export default Login;
