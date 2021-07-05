import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Avatar,
  IconButton,
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Container,
} from "@material-ui/core";
import { Snackbar } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { red, green } from "@material-ui/core/colors";
import {
  FavoriteRounded,
  AddCircleOutlineRounded,
  RemoveCircleOutlineRounded,
  ShareRounded,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";
import { firestore } from "firebase";
import RemoveCircleOutlineOutlinedIcon from "@material-ui/icons/RemoveCircleOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import QueryBuilderRoundedIcon from '@material-ui/icons/QueryBuilderRounded';
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: 10,
    maxWidth: 500,
    borderRadius: 12,
    transition:
      ".3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12)",
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow: "0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)",
    },
  },
  media: {
    paddingTop: "50%",
  },
  link: {
    textDecoration: "none",
  },
  action: {
    marginLeft: "auto",
  },
}));

export default function Post({ props, isfav, isCart }) {
  const {
    title,
    displayName,
    media,
    description,
    to,
    type,
    price,
    ref,
    deliveryTime,
  } = props;

  const [openDialog, setOpenDialog] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const email = useAuth().currentUser.email;
  const [isFavorite, setIsFavorite] = useState(isfav);
  const [isInCart, setIsInCart] = useState(isCart);
  const classes = useStyles();
  const [quantity, setQuantity] = useState(1);
  const handleDialogClickOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setQuantity(1);
  };

  const handleFavoriteAction = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      db.collection("userData")
        .doc(email)
        .update({ favorites: firestore.FieldValue.arrayUnion(ref) })
        .then(console.log("PUSH"));
      setOpenSnackbar(true);
    } else {
      db.collection("userData")
        .doc(email)
        .update({ favorites: firestore.FieldValue.arrayRemove(ref) })
        .then(console.log("PUSH"));
      setOpenSnackbar(false);
    }
  };

  const handleShare = () => {
    navigator
      .share({ title: title, text: "Hello there", url: ref })
      .then(console.log("Success share"))
      .catch((err) => console.log(err));
  };

  const handleCartAction = () => {
    if (!isInCart) {
      setOpenDialog(true);
    } else {
      db.collection("userData")
        .doc(email)
        .update({
          cart: firestore.FieldValue.arrayRemove({
            ref: ref,
            quantity: quantity,
          }),
        })
        .then(console.log("POP"));
      setIsInCart(false);
    }
  };

  const handleAddToCart = () => {
    db.collection("userData")
      .doc(email)
      .update({
        cart: firestore.FieldValue.arrayUnion({ ref: ref, quantity: quantity }),
      })
      .then(console.log("PUSH"));
    setIsInCart(true);
    setOpenDialog(false);
  };

  const handleAddMore = () => {
    setQuantity((initQuantity) => initQuantity + 1);
  };

  const handleRemove = () => {
    if (quantity > 1) {
      setQuantity((initQuantity) => initQuantity - 1);
    }
  };

  function AlertDialog() {
    return (
      <div>
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{displayName}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography variant="h5">{title}</Typography>
              <Typography variant="body1">
                {`How much quantity of ${title} would you like to add?`}
              </Typography>
            </DialogContentText>
            <Container
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton onClick={handleAddMore} color="primary">
                <AddCircleOutlineOutlinedIcon />
              </IconButton>
              <Typography variant="h5" style={{ padding: 15 }}>
                {quantity}
              </Typography>
              <IconButton
                onClick={handleRemove}
                color="primary"
                disabled={quantity === 1}
              >
                <RemoveCircleOutlineOutlinedIcon />
              </IconButton>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="secondary">
              Close
            </Button>
            <Button onClick={handleAddToCart} color="primary" autoFocus>
              Add & Continue
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  function SnackBar() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={`Added ${title} to favorites`}
        var
        action={
          <React.Fragment>
            <IconButton
              size="small"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <Close fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    );
  }

  return (
    <>
      <SnackBar />
      <AlertDialog />
      <Link to={to} className={classes.link}>
        <Card className={classes.root} variant="outlined">
          <CardHeader
            avatar={
              <Avatar
                aria-label="recipe"
                style={{
                  backgroundColor: type === "non-veg" ? red[500] : green[500],
                }}
              >
                <FiberManualRecordIcon />
              </Avatar>
            }
            title={title}
            action={<h4 style={{ marginRight: 10 }}>{`Rs. ${price}`}</h4>}
            subheader={displayName}
          />

          <CardMedia className={classes.media} image={media} title={title} />

          <CardContent>
            <Container
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <QueryBuilderRoundedIcon />
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                style={{ marginLeft: 20 }}
              >
                {deliveryTime} mins
              </Typography>
            </Container>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              style={{ color: isFavorite ? "#f00" : "#000" }}
              onClick={handleFavoriteAction}
            >
              <FavoriteRounded />
            </IconButton>
            <IconButton onClick={handleShare}>
              <ShareRounded />
            </IconButton>
            <Button
              size="large"
              className={classes.action}
              startIcon={
                isInCart ? (
                  <RemoveCircleOutlineRounded />
                ) : (
                  <AddCircleOutlineRounded />
                )
              }
              onClick={handleCartAction}
            >
              {isInCart ? "Remove" : "Add to Cart"}
            </Button>
          </CardActions>
        </Card>
      </Link>
    </>
  );
}
