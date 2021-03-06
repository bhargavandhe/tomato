import React, { useState } from "react";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Card,
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
  Collapse,
  Grid,
  Tooltip,
} from "@material-ui/core";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
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
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: 10,
    maxWidth: 500,
    borderRadius: 12,
    transition:
      ".3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12)",
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: "0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)",
    },
  },
  media: {
    paddingTop: "65%",
  },
  link: {
    textDecoration: "none",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
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
    available,
  } = props;

  const [openDialog, setOpenDialog] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const email = useAuth().currentUser.email;
  const [isFavorite, setIsFavorite] = useState(isfav);
  const [isInCart, setIsInCart] = useState(isCart);
  const classes = useStyles();
  const [quantity, setQuantity] = useState(1);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
          <CardMedia className={classes.media} image={media} />
          <CardContent>
            <Grid container>
              <Grid item xs={2}>
                <Avatar
                  aria-label="recipe"
                  style={{
                    backgroundColor: type === "non-veg" ? red[500] : green[500],
                  }}
                >
                  <FiberManualRecordIcon />
                </Avatar>
              </Grid>
              <Grid item xs={10}>
                <Grid direction="row" container>
                  <Grid item xs={9}>
                    <Typography variant="h6">{title}</Typography>
                  </Grid>
                  <Grid item xs={3} align="right">
                    <Typography>{`Rs. ${price}`}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{displayName}</Typography>
                  </Grid>
                  <Tooltip title="4.5" placement="bottom">
                    <Grid item xs={6} align="right">
                      <StarRoundedIcon color="secondary" />
                      <StarRoundedIcon color="secondary" />
                      <StarRoundedIcon color="secondary" />
                      <StarRoundedIcon color="secondary" />
                    </Grid>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              style={{ color: isFavorite ? "#f00" : "#000" }}
              onClick={handleFavoriteAction}
            >
              <FavoriteRounded />
            </IconButton>
            <Button
              size="large"
              className={classes.action}
              disabled={!available}
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
            <IconButton onClick={handleShare}>
              <ShareRounded />
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography>{`Delivery time - ${deliveryTime} mins.`}</Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
                deserunt amet vel libero assumenda eius eveniet repellat ea
                suscipit tempora?
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Link>
    </>
  );
}
