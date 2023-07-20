import React, { useState } from "react";
import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "@mui/material";
import { CLIENT_ID } from "../../configs";

function Confirm() {
  const [code, setCode] = React.useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const [message, setMessage] = useState("");
  const { email } = state;

  let handleSubmission = async () => {
    try {
      const client = new CognitoIdentityProviderClient({ region: "us-east-2" });

      //set up input
      const input = {
        ClientId: CLIENT_ID, // required
        Username: email, // required
        ConfirmationCode: code, // required
      };

      //set up Signup Command
      const command = new ConfirmSignUpCommand(input);

      //make request
      let res = await client.send(command);
      if (res.$metadata.httpStatusCode === 200) {
        console.log("confirm success");

        navigate("/login");
      } else {
        //let the user know that the signup failed
        console.log("signup failed");
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        "align-items": "center",
      }}
    >
      <Typography variant="h6">Check your email for Confirmation</Typography>
      <div style={{ height: 30 }} />
      <TextField
        id="outlined-basic"
        label="Confirmation Code"
        variant="outlined"
        onChange={(e) => setCode(e.target.value)}
      />
      <div style={{ height: 30 }} />
      <Button variant="contained" onClick={handleSubmission}>
        Submit
      </Button>
      {message && (
        <Typography variant="h8" style={{ borderRadius: "20px" }}>
          {message}
        </Typography>
      )}
    </div>
  );
}

export default Confirm;
