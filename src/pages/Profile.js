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
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";

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
  name: {
    marginLeft: 20,
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

  return (
    <>
      <AppBar />
      <Container>
        <Card variant="outlined" className={classes.root}>
          <CardContent>
            <div className={classes.header}>
              <Avatar aria-label="recipe" className={classes.avatar}>
                {values.name[0]}
              </Avatar>
              <Typography variant="h3" className={classes.name}>
                {values.name}
              </Typography>
            </div>
            <Container>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Link to="/favorites" className={classes.link}>
                    <Paper variant="outlined" className={classes.paper}>
                      <Typography variant="h5">
                        {values.favorites.length}
                      </Typography>
                      <Typography variant="body1">favorites</Typography>
                    </Paper>
                  </Link>
                </Grid>
                <Grid item xs={4}>
                  <Link to="/cart" className={classes.link}>
                    <Paper variant="outlined" className={classes.paper}>
                      <Typography variant="h5">{values.cart.length}</Typography>
                      <Typography variant="body1">items in cart</Typography>
                    </Paper>
                  </Link>
                </Grid>
                <Grid item xs={4}>
                  <Paper variant="outlined" className={classes.paper}>
                    <Typography variant="h5">{values.orders.length}</Typography>
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
                    value={values.gender}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="phone"
                    label="Phone"
                    value={values.phone}
                    // onChange={(event) => setPassword(event.target.value)}
                    id="phone"
                  />
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
