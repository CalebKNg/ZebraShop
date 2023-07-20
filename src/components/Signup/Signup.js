import React, { useState } from "react";
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { useNavigate } from "react-router-dom";

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
        ClientId: "3j3tnju1j2joo513s2ghrrlg17", // required
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
      <h1>Sign Up</h1>
      <button onClick={handleSubmission}>submit</button>
      {/* <button onClick={() => navigate("/Confirm", { state: { email: email } })}>
        to confirm
      </button> */}
      <form onSubmit={handleSubmission}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      {message && <h1>{message}</h1>}
    </div>
  );
}

export default Signup;
