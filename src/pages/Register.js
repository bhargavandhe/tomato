import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  LinearProgress,
  Button,
  FormControlLabel,
  Grid,
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
  errors,
}) {
  const { setUserData } = useAuth();
  const history = useHistory();
  const classes = useStyles();
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mErrors, setmErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  useEffect(() => {
    setIsChecked(false);
    setmErrors({
      firstName: "",
      lastName: "",
      phone: "",
      age: "",
      gender: "",
    });
  }, []);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  const handleNext = async () => {
    setLoading(true);
    await nextStage().then(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    setmErrors({
      firstName:
        values.firstName.length > 0 ? "" : "This field cannot be left empty",
      lastName:
        values.lastName.length > 0 ? "" : "This field cannot be left empty",
      phone: values.phone.length == 10 ? "" : "Invalid phone number",
      age: Number(values.age) > 0 ? "" : "Invalid age",
      gender:
        values.gender == "M" || values.gender == "F" || values.gender == "U"
          ? ""
          : "Invalid gender",
    });
  }, [values.name, values.phone, values.age, values.gender]);

  async function handleRegister(e) {
    setShowErrors(true);
    e.preventDefault();
    console.log(mErrors);
    if (
      mErrors.firstName === "" &&
      mErrors.lastName === "" &&
      mErrors.phone === "" &&
      mErrors.age === "" &&
      mErrors.gender === ""
    ) {
      try {
        await setUserData(values).then(() => {
          history.push("/");
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  switch (stage) {
    case 0:
      return (
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
            helperText={errors.email}
            error={errors.email}
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
            error={errors.password}
            helperText={errors.password}
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
          {loading && <LinearProgress color="secondary" />}
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={handleNext}
            disabled={!isChecked}
          >
            Proceed
          </Button>
        </form>
      );
    case 1:
      return (
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="firstName"
                value={values.firstName}
                onChange={handleChange("firstName")}
                label="First name"
                autoComplete="name"
                error={showErrors && mErrors.firstName}
                helperText={showErrors && mErrors.firstName}
                autoFocus
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lastName"
                value={values.lastName}
                onChange={handleChange("lastName")}
                label="Last name"
                autoComplete="name"
                error={showErrors && mErrors.lastName}
                helperText={showErrors && mErrors.lastName}
              />
            </Grid>
          </Grid>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            value={values.phone}
            onChange={handleChange("phone")}
            label="Phone number"
            error={showErrors && mErrors.phone}
            helperText={showErrors && mErrors.phone}
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
            error={showErrors && mErrors.age}
            helperText={showErrors && mErrors.age}
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
              error={showErrors && mErrors.gender}
              helperText={showErrors && mErrors.gender}
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value={"M"}>Male</MenuItem>
              <MenuItem value={"F"}>Female</MenuItem>
              <MenuItem value={"U"}>Prefer not to say</MenuItem>
            </Select>
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={(event) => handleRegister(event)}
          >
            Register
          </Button>
        </form>
      );
    default:
      return <h1>Error</h1>;
  }
}
