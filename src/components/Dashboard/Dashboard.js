import React, { useState } from "react";

import { Card } from "@mui/material";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import steve from "./steven.jpg";
import fitzgerald from "./fitzgerald.jpg";
import dave from "./dave.jpg";

function Dashboard() {
  const [steves, setSteves] = useState(false);
  const [daves, setDaves] = useState(false);
  const [fitzgeralds, setFitzpatrick] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("logout");
    localStorage.removeItem("username");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login";
  };

  //cart tracking
  const handleSteve = () => {
    if (steves === true) {
      setSteves(false);
    } else {
      setSteves(true);
    }
    console.log(steves);
  };

  const handleDave = () => {
    if (daves === true) {
      setDaves(false);
    } else {
      setDaves(true);
    }
  };

  const handleFitz = () => {
    if (fitzgeralds === true) {
      setFitzpatrick(false);
    } else {
      setFitzpatrick(true);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: 30,
        }}
      >
        <Typography variant="h4">Zebras for Sale</Typography>
        <div style={{ display: "flex", "flex-direction": "column" }}>
          <Button
            onClick={() =>
              navigate("/cart", {
                state: { steve: steves, dave: daves, fitz: fitzgeralds },
              })
            }
          >
            Checkout
          </Button>
          <Button variant="contained" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </div>

      <Grid
        container
        spacing={1}
        style={{
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          style={{
            display: "flex",
            alignItems: "stretch",
            justifyContent: "center",
          }}
        >
          <img src={steve} style={{ height: "50% " }}></img>
          <Card style={{ height: 358, width: 100, padding: 20 }}>
            <Box>
              <Typography variant="h5">Steve</Typography>
              <div style={{ height: 30 }}></div>
              <Typography variant="h7" style={{ paddingTop: 30 }}>
                Trusty friend
              </Typography>
              <div style={{ height: 10 }}></div>
              <Typography variant="h7">Runs fast</Typography>
              <div style={{ height: 80 }}></div>
              <Typography variant="h5" style={{ paddingTop: 30 }}>
                $30
              </Typography>
              <div style={{ height: 20 }}></div>
              {steves ? (
                <Button variant="outlined" onClick={handleSteve}>
                  Remove from Cart
                </Button>
              ) : (
                <Button variant="outlined" onClick={handleSteve}>
                  Add to Cart
                </Button>
              )}
            </Box>
          </Card>
        </Grid>
        <Grid
          item
          spacing={1}
          style={{
            display: "flex",
            alignItems: "stretch",
            justifyContent: "center",
          }}
        >
          <Card style={{ height: 283, width: 100, padding: 20 }}>
            <Box>
              <Typography variant="h5">Fitzgerald</Typography>
              <div style={{ height: 30 }}></div>
              <Typography variant="h7" style={{ paddingTop: 30 }}>
                Good at cooking
              </Typography>
              <div style={{ height: 30 }}></div>
              <Typography variant="h5" style={{ paddingTop: 30 }}>
                $45
              </Typography>
              <div style={{ height: 20 }}></div>
              {fitzgeralds ? (
                <Button variant="outlined" onClick={handleFitz}>
                  Remove from Cart
                </Button>
              ) : (
                <Button variant="outlined" onClick={handleFitz}>
                  Add to Cart
                </Button>
              )}
            </Box>
          </Card>
          <img src={fitzgerald} style={{ height: "30% " }}></img>
        </Grid>
        <Grid
          item
          spacing={1}
          style={{
            display: "flex",
            alignItems: "stretch",
            justifyContent: "center",
          }}
        >
          <Card style={{ height: 292, width: 100, padding: 20 }}>
            <Box>
              <Typography variant="h5">Dave</Typography>

              <div style={{ height: 20 }}></div>
              <Typography variant="h7" style={{ paddingTop: 30 }}>
                Master of all known weapons
              </Typography>
              <div style={{ height: 20 }}></div>
              <Typography variant="h7" style={{ paddingTop: 30 }}>
                Vegan
              </Typography>
              <div style={{ height: 5 }}></div>
              <Typography variant="h5" style={{ paddingTop: 10 }}>
                $45
              </Typography>
              <div style={{ height: 20 }}></div>
              {daves ? (
                <Button variant="outlined" onClick={handleDave}>
                  Remove from Cart
                </Button>
              ) : (
                <Button variant="outlined" onClick={handleDave}>
                  Add to Cart
                </Button>
              )}
            </Box>
          </Card>
          <img src={dave} style={{ height: "50% " }}></img>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
