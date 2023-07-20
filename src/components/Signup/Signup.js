import React, { useState, onKeyDown } from "react";
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import "./Signup.css";
import { Link } from "@mui/material";
import { Card } from "@mui/material";
import { CLIENT_ID } from "../../configs";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  let handleSubmission = async () => {
    try {
      const client = new CognitoIdentityProviderClient({ region: "us-east-2" });

      //set up input
      const input = {
        ClientId: CLIENT_ID, // required
        Username: email, // required
        Password: password, // required
      };

      //set up Signup Command
      const command = new SignUpCommand(input);

      //make request
      const res = await client.send(command);
      console.log(res.$metadata.httpStatusCode);
      if (res.$metadata.httpStatusCode === 200) {
        console.log("Success");
        navigate("/Confirm", { state: { email: email } });
      } else {
        //let the user know that the signup failed
        console.log("signup failed2", res);
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="signup-wrapper">
      <Typography variant="h3">Sign Up</Typography>
      <Typography variant="h4">Register an Account</Typography>
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
        <Typography variant="h8">Back to </Typography>
        <Link href="/login" underline="none">
          {"Sign In"}
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

export default Signup;
