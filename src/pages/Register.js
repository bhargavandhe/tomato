import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  FormControlLabel,
} from "@material-ui/core";
import { useEffect } from "react";
const useStyles = makeStyles((theme) => ({
  logo: {
    margin: "20px",
    width: "64px",
    height: "64px",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register({
  values,
  handleChange,
  stage,
  nextStage,
  prevStage,
}) {
  const { signup } = useAuth();
  const history = useHistory();
  const classes = useStyles();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(false);
  }, []);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  async function handleRegister(e) {
    e.preventDefault();
    try {
      console.log(values);
      await signup(values);
      history.push("/");
    } catch (err) {
      console.log("Failed to create an account", err);
    }
  }

  switch (stage) {
    case 0:
      return (
        <>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              value={values.email}
              onChange={handleChange("email")}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              value={values.password}
              onChange={handleChange("password")}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              margin="normal"
              name="password"
              value={values.confirmPassword}
              onChange={handleChange("confirmPassword")}
              error={!(values.confirmPassword === values.password)}
              label="Confirm password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={isChecked}
                  color="primary"
                  onClick={handleCheck}
                />
              }
              label="I hereby agree to create an account on tomato, and I've read the Terms & Conditions"
            />
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={() => nextStage()}
              disabled={!isChecked}
            >
              Proceed
            </Button>
          </form>
        </>
      );
    case 1:
      return (
        <>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              value={values.name}
              onChange={handleChange("name")}
              label="Full name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phone"
              value={values.phone}
              onChange={handleChange("phone")}
              label="Phone number"
              name="phone"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="age"
              value={values.age}
              onChange={handleChange("age")}
              label="Age"
              name="age"
            />
            <FormControl variant="outlined" fullWidth margin={"normal"}>
              <InputLabel id="demo-simple-select-outlined-label">
                Gender
              </InputLabel>
              <Select
                value={values.gender}
                onChange={handleChange("gender")}
                label={"Gender"}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value={"M"}>Male</MenuItem>
                <MenuItem value={"F"}>Female</MenuItem>
                <MenuItem value={"U"}>Prefer not to say</MenuItem>
              </Select>
            </FormControl>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  onClick={() => prevStage()}
                >
                  Previous
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  onClick={handleRegister}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </>
      );
    default:
      return <h1>Error</h1>;
  }
}
