import React, { useState } from "react";
import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Confirm() {
  const [code, setCode] = React.useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const { email } = state;

  let handleSubmission = async () => {
    try {
      const client = new CognitoIdentityProviderClient({ region: "us-east-2" });

      //set up input
      const input = {
        ClientId: "3j3tnju1j2joo513s2ghrrlg17", // required
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
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Check your email!</h1>
      <input type="text" onChange={(e) => setCode(e.target.value)} />
      <button onClick={handleSubmission}>submit</button>
    </div>
  );
}

export default Confirm;
