import React, { useState, useEffect } from "react";
import AppBar from "../components/AppBar";
import { db } from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
  Container,
  Card,
  CardContent,
  Avatar,
  Paper,
  Grid,
  TextField,
  CardHeader,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  LinearProgress,
  InputAdornment,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";
import BusinessOutlinedIcon from "@material-ui/icons/BusinessOutlined";
import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import { firestore } from "firebase";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import ListAltRoundedIcon from "@material-ui/icons/ListAltRounded";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import AccountCircle from "@material-ui/icons/AccountCircle";
const useStyles = makeStyles({
  root: {
    padding: 50,
  },
  paper: {
    textAlign: "center",
    padding: 40,
    marginTop: 50,
  },
  header: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    height: 50,
    width: 50,
    backgroundColor: red[500],
  },
  link: {
    textDecoration: "none",
  },
});

function Profile() {
  const classes = useStyles();
  const email = useAuth().currentUser.email;

  const [values, setValues] = useState({
    name: "",
    favorites: [],
    cart: [],
    orders: [],
    phone: "",
    age: 0,
    gender: "U",
    tomcoins: 0,
    address: "",
  });

  useEffect(() => {
    db.collection("userData")
      .doc(email)
      .get()
      .then((data) => {
        console.log("GET");
        setValues(data.data());
      });
  }, []);

  const [openDialog, setOpenDialog] = React.useState(false);
  const handleDialogClickOpen = () => {
    setOpenDialog(true);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const [updating, setUpdating] = useState(false);

  function updateProfile() {
    setUpdating(true);
    db.collection("userData")
      .doc(email)
      .update({
        address: values.address,
        phone: values.phone,
      })
      .then(() => {
        console.log("SUCCESS");
        setUpdating(false);
      });
  }

  function AlertDialog() {
    const [values, setValues] = useState();

    function addMoney() {
      db.collection("userData")
        .doc(email)
        .update({ tomcoins: firestore.FieldValue.increment(Number(values)) });
    }

    return (
      <div>
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Add tomcoins to your wallet
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography>How many coins would you like to add?</Typography>
              <TextField
                value={values}
                onChange={(event) => {
                  setValues(event.target.value);
                }}
                margin="normal"
                id="standard-basic"
                placeholder="Add tomcoins"
                fullWidth
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="secondary">
              Close
            </Button>
            <Button
              onClick={() => {
                addMoney();
                setOpenDialog(false);
              }}
              color="primary"
              autoFocus
            >
              Add & Continue
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  return (
    <>
      <AppBar />
      <AlertDialog />
      <Container>
        <Card variant="outlined" className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {values.name[0]}
              </Avatar>
            }
            title={<Typography variant="h3">{values.name}</Typography>}
            subheader={
              <Typography style={{ marginLeft: 5 }}>{email}</Typography>
            }
            action={
              <div>
                <Typography
                  style={{ textAlign: "right", padding: 5 }}
                  variant="h6"
                >
                  {`Rs. ${values.tomcoins}`}
                </Typography>
                <Button
                  color="secondary"
                  variant="text"
                  onClick={handleDialogClickOpen}
                  startIcon={<AccountBalanceWalletIcon />}
                >
                  Add tomcoins
                </Button>
              </div>
            }
          />
          <CardContent>
            <Container>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Link to="/favorites" className={classes.link}>
                    <Paper variant="outlined" className={classes.paper}>
                      <Typography
                        variant="h5"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <FavoriteOutlinedIcon
                          color="secondary"
                          style={{ marginRight: 10 }}
                        />
                        {values.favorites.length}
                      </Typography>
                      <Typography variant="body1">favorites</Typography>
                    </Paper>
                  </Link>
                </Grid>
                <Grid item xs={4}>
                  <Link to="/cart" className={classes.link}>
                    <Paper variant="outlined" className={classes.paper}>
                      <Typography
                        variant="h5"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <LocalMallIcon
                          color="secondary"
                          style={{ marginRight: 10 }}
                        />
                        {values.cart.length}
                      </Typography>
                      <Typography variant="body1">items in cart</Typography>
                    </Paper>
                  </Link>
                </Grid>
                <Grid item xs={4}>
                  <Paper variant="outlined" className={classes.paper}>
                    <Typography
                      variant="h5"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <ListAltRoundedIcon style={{ marginRight: 10 }} />
                      {values.orders.length}
                    </Typography>
                    <Typography variant="body1">orders</Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Grid container spacing={2} style={{ marginTop: 20 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="age"
                    label="Age"
                    id="age"
                    disabled
                    value={values.age}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DateRangeOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="gender"
                    label="Gender"
                    id="gender"
                    disabled
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <GroupOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={values.gender}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="phone"
                    onChange={handleChange("phone")}
                    label="Phone"
                    value={values.phone}
                    id="phone"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    multiline
                    fullWidth
                    name="address"
                    onChange={handleChange("address")}
                    label="Address"
                    value={values.address}
                    id="address"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BusinessOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  {updating && <LinearProgress color="secondary" />}
                </Grid>
                <Grid item xs={6} sm={9} />
                <Grid item xs={6} sm={3}>
                  <Button
                    fullWidth
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                      updateProfile();
                    }}
                  >
                    Update profile
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default Profile;
