import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import firebase, { firestore } from "firebase";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";

export default function PaymentConfirmation({ props }) {
  const { openConfirmation, setOpenConfirmation, total, cart } = props;
  const email = useAuth().currentUser.email;

  const handleClose = () => {
    setOpenConfirmation(false);
  };

  function placeOrder() {
    db.collection("userData")
      .doc(email)
      .update({
        cart: [],
        tomcoins: firestore.FieldValue.increment(-Number(total)),
        orders: firestore.FieldValue.arrayUnion({
          items: cart,
          timestamp: firebase.firestore.Timestamp.now().toMillis(),
        }),
      })
      .then(() => {
        handleClose();
      });
  }

  return (
    <div>
      <Dialog
        open={openConfirmation}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Payment Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to place this order?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={placeOrder} color="primary" autoFocus>
            Place order
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
