import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import "./Login.css";

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
          ClientId: "3j3tnju1j2joo513s2ghrrlg17", // required
          AuthFlow: "USER_PASSWORD_AUTH",
          AuthParameters: {
            USERNAME: email,
            PASSWORD: password,
          },
        };

        const command = new InitiateAuthCommand(input);
        const res = await client.send(command);

        if (res.$metadata.httpStatusCode === 200) {
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
      <h1>Please Log In</h1>
      <button onClick={handleSubmission}>submit</button>
      <form>
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

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
