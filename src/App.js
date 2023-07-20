import React, { useState, useEffect } from "react";
import "./loading.css";
import "./App.css";
import routes from "./routes";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { Typography, Link } from "@mui/material";
import { CLIENT_ID } from "./configs";

function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedin] = useState(false);
  //check if logged in
  useEffect(() => {
    async function updateLogged() {
      try {
        //obtain new refresh token
        const refresh_token = localStorage.getItem("refresh_token");
        const client = new CognitoIdentityProviderClient({
          region: "us-east-2",
        });
        const input = {
          ClientId: CLIENT_ID, // required
          AuthFlow: "REFRESH_TOKEN_AUTH",
          AuthParameters: {
            REFRESH_TOKEN: refresh_token,
          },
        };

        const command = new InitiateAuthCommand(input);
        const res = await client.send(command);

        if (res.$metadata.httpStatusCode === 200) {
          localStorage.setItem(
            "access_token",
            res.AuthenticationResult.AccessToken
          );
          setLoggedin(true);
          setLoading(false);
          console.log(loggedIn);

          console.log(res, 1);
        } else {
          console.log("Not logged in", res);
          setLoggedin(false);
          setLoading(false);
          console.log(res, 2);
          console.log(loggedIn);
        }
      } catch (err) {
        console.log(err);
      }
    }
    updateLogged();
  }, []);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={
              route.protected ? (
                loading ? (
                  loader()
                ) : loggedIn ? (
                  route.component
                ) : (
                  <Navigate to="/login" />
                )
              ) : (
                route.component
              )
            }
            key={route.key}
          />
        );
      }

      return null;
    });

  return (
    <div className="wrapper">
      <Link href="/dashboard" underline="none" variant="h5">
        Zebra.net
      </Link>
      <BrowserRouter>
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

function loader() {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
    </div>
  );
}
