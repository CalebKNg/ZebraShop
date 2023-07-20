import React from "react";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

function Cart() {
  const { state } = useLocation();
  const { steve, dave, fitz } = state;

  //popup handling
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        "align-items": "center",
      }}
    >
      <Typography variant="h6">Items in your cart</Typography>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>//generate list 
        {steve ? (
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Steve" secondary="wise choice" />
          </ListItem>
        ) : null}

        {dave ? (
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Dave" secondary="he will serve you well" />
          </ListItem>
        ) : null}
        {fitz ? (
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Fitzgerald" secondary="excellent choice" />
          </ListItem>
        ) : null}
      </List>
      <Button variant="outlined" onClick={handleClickOpen}>
        Purchase
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Purchase complete!"}
        </DialogTitle>
      </Dialog>
    </div>
  );
}

export default Cart;
