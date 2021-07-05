import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import InsufficientBalance from "../components/InsufficientBalance";
import PaymentConfirmation from "../components/PaymentConfirmation";
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function PaymentMethod({ props }) {
  const classes = useStyles();
  const [openInsufficientBalance, setOpenInsufficientBalance] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const { openPaymentMethod, setOpenPaymentMethod, balance, total, cart } =
    props;

  const handleClose = () => {
    setOpenPaymentMethod(false);
  };

  const handleListItemClick = (value) => {
    console.log(value);
    value == "POD"
      ? setOpenConfirmation(true)
      : total > balance
      ? setOpenInsufficientBalance(true)
      : setOpenConfirmation(true);
    setOpenPaymentMethod(false);
  };

  return (
    <>
      <PaymentConfirmation
        props={{ openConfirmation, setOpenConfirmation, total, cart }}
      />
      <InsufficientBalance
        props={{ openInsufficientBalance, setOpenInsufficientBalance }}
      />
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={openPaymentMethod}
      >
        <DialogTitle id="simple-dialog-title">
          Choose a payment method
        </DialogTitle>
        <List>
          <ListItem button onClick={() => handleListItemClick("POD")} key={"H"}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={"Pay on Delivery"}
              secondary={"Pay ₹200 by cash after delivery"}
            />
          </ListItem>

          <ListItem
            button
            onClick={() => handleListItemClick("TOM")}
            key={"1H"}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={"Pay using tomcoins"}
              secondary={"Pay ₹200 instantly by tomcoins"}
            />
          </ListItem>

          <ListItem
            autoFocus
            button
            onClick={() => handleListItemClick("addAccount")}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItem>
        </List>
      </Dialog>
    </>
  );
}

// export default function SimpleDialogDemo() {
//   const [open, setOpen] = React.useState(false);
//   const [selectedValue, setSelectedValue] = React.useState(methods[1]);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = (value) => {
//     setOpen(false);
//     setSelectedValue(value);
//   };

//   return (
//     <div>
//       <Typography variant="subtitle1">Selected: {selectedValue}</Typography>
//       <br />
//       <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//         Open simple dialog
//       </Button>
//       <SimpleDialog
//         selectedValue={selectedValue}
//         open={open}
//         onClose={handleClose}
//       />
//     </div>
//   );
// }
