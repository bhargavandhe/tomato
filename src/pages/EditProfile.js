import React, { useState, useEffect } from "react";
import AppBar from "../components/AppBar";
import { db } from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  Container,
  Card,
  CardContent,
  CardActions,
  TextField,
  Grid,
} from "@material-ui/core";
import { useAuth } from "../AuthContext";

const useStyles = makeStyles({
  container: {
    marginTop: 20,
  },
  root: {
    minWidth: 500,
    borderRadius: 12,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function EditProfile() {
  const classes = useStyles();
  const email = useAuth().currentUser.email;

  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    age: "",
    gender: "",
  });
  const [initUsername, setInitUsername] = useState(values.username);

  useEffect(() => {
    db.collection("userData")
      .doc(email)
      .get()
      .then((data) => {
        console.log("GET");
        setValues(data.data());
        setInitUsername(data.data().username);
      });
  }, []);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const updateData = () => {
    if (initUsername !== values.username) {
      db.collection("emails")
        .doc(initUsername)
        .get()
        .then((data) => {
          db.collection("emails")
            .doc(values.username)
            .set(data.data())
            .then(() => {
              db.collection("emails").doc(initUsername).delete();
            });
        });
    }

    db.collection("userData")
      .doc(email)
      .set(values)
      .then(console.log("Success!"))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <AppBar />
      <Container className={classes.container}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography variant="h5">Update profile</Typography>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="outlined-basic"
                label="Full name"
                value={values.name}
                onChange={handleChange("name")}
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <TextField
                id="outlined-basic"
                label="Phone"
                onChange={handleChange("phone")}
                variant="outlined"
                value={values.phone}
                margin="normal"
                fullWidth
              />
              <TextField
                id="outlined-basic"
                label="Username"
                onChange={handleChange("username")}
                variant="outlined"
                value={values.username}
                margin="normal"
                fullWidth
              />
              <TextField
                id="outlined-basic"
                label="Bio"
                variant="outlined"
                margin="normal"
                value={values.bio}
                onChange={handleChange("bio")}
                fullWidth
              />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={email}
                onChange={handleChange("email")}
                disabled
                margin="normal"
                fullWidth
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Age"
                    variant="outlined"
                    value={values.age}
                    margin="normal"
                    fullWidth
                    disabled={true}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Gender"
                    variant="outlined"
                    margin="normal"
                    value={values.gender}
                    fullWidth
                    disabled={true}
                  />
                </Grid>
              </Grid>
            </form>
          </CardContent>
          <CardActions style={{ padding: 20 }}>
            <Button
              size="medium"
              style={{ marginLeft: "auto" }}
              onClick={updateData}
            >
              Update
            </Button>
          </CardActions>
        </Card>
      </Container>
    </div>
  );
}

export default EditProfile;
