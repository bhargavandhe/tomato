import { useAuth } from "../AuthContext";
import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
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

export default function Login() {
  const { login } = useAuth();
  const history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    setLoading(true);
    e.preventDefault();
    try {
      await login(email, password);
      setLoading(false);
      history.push("/");
    } catch {
      console.log("Failed to log in");
      setLoading(false);
    }
  }

  return (
    <>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          name="username"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <div>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={handleLogin}
          >
            Sign In
          </Button>
          {loading && <LinearProgress color="secondary" />}
        </div>

        <Grid container>
          <Grid item xs></Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Forgot password?"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
