import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function InsufficientBalance({ props }) {
  const { openInsufficientBalance, setOpenInsufficientBalance } = props;

  const handleClose = () => {
    setOpenInsufficientBalance(false);
  };

  return (
    <div>
      <Dialog
        open={openInsufficientBalance}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Insufficient balance 😕"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You don't have enough balance to place this order. Please top-up
            your wallet.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
