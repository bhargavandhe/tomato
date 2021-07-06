import { React, useEffect, useState } from "react";
import TabPanel from "../components/TabPanel";
import SwipeableViews from "react-swipeable-views";
import { makeStyles } from "@material-ui/core/styles";
import Login from "./Login";
import Register from "./Register";
import logo from "../logo.png";

import {
  CssBaseline,
  Link,
  Tabs,
  Tab,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import { useAuth } from "../AuthContext";
import { ErrorSharp } from "@material-ui/icons";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://tomato-30cb2.web.app">
        tomato
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
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
  root: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    height: "100vh",
    position: "relative",
  },
}));

function LandingPage() {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const [stage, setStage] = useState(0);
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    age: "0",
    phone: "0",
    gender: "U",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const { signup, setUserData } = useAuth();

  useEffect(() => {
    setErrors({
      ...errors,
      password:
        values.password != values.confirmPassword
          ? "Passwords don't match"
          : "",
    });
  }, [values.password, values.confirmPassword]);

  const nextStage = async () => {
    if (values.password == values.confirmPassword) {
      try {
        await signup(values.email, values.password).then(async () => {
          return await setUserData(values).then(() => {
            setValues({
              ...values,
              firstName: "",
              lastName: "",
              age: "",
              phone: "",
              gender: "",
            });
            setStage(stage + 1);
          });
        });
      } catch (err) {
        if (err.code == "auth/email-already-in-use") {
          setErrors({ ...errors, email: "Email address is already in use" });
        } else if (err.code == "auth/invalid-email") {
          setErrors({ ...errors, email: "Email address is invalid" });
        } else {
          setErrors({ ...errors, email: "" });
        }
      }
    } else {
      setErrors({ ...errors, password: "Passwords don't match" });
    }
  };

  const prevStage = () => {
    setStage(stage - 1);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const images = [
    "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    "https://images.unsplash.com/photo-1611464030193-2a21a26a9be1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    "https://images.unsplash.com/photo-1526318896980-cf78c088247c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    "https://images.unsplash.com/photo-1536816579748-4ecb3f03d72a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    "https://images.unsplash.com/photo-1535229398509-70179087ac75?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    "https://images.unsplash.com/photo-1623593688280-a5aec8ac4ae7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    "https://images.unsplash.com/photo-1625248442085-10a1a2563dd6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    "https://images.unsplash.com/photo-1604632911232-18733a0b3563?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    "https://images.unsplash.com/photo-1611599537845-1c7aca0091c0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    "https://images.unsplash.com/photo-1618427012166-b0e03d490a4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    "https://images.unsplash.com/photo-1562790879-dfde82829db0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1559703248-dcaaec9fab78?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1554080204-5c97677848bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80",
  ];
  const [image, setImage] = useState(images[0]);

  useEffect(() => {
    setImage(images[Math.floor(Math.random() * images.length)]);
  }, []);

  return (
    <>
      <Grid container>
        <Grid item xs={0} md={6} l={4}>
          <div className={classes.root}>
            <img src={image} />
          </div>
        </Grid>
        <Grid item xs={12} md={6} l={8}>
          <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
              <img src={logo} />
              <Tabs
                value={tab}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Sign in" {...a11yProps(0)} />
                <Tab label="Sign up" {...a11yProps(1)} />
              </Tabs>

              <SwipeableViews
                axis={"x"}
                index={tab}
                onChangeIndex={handleTabChange}
              >
                <TabPanel value={tab} index={0} dir={"x"}>
                  <Typography variant="body1">Sign in to continue</Typography>
                  <Login />
                </TabPanel>
                <TabPanel value={tab} index={1} dir={"x"}>
                  <Typography variant="body1">
                    New here? Register now
                  </Typography>
                  <Register
                    values={values}
                    handleChange={handleChange}
                    stage={stage}
                    nextStage={nextStage}
                    prevStage={prevStage}
                    errors={errors}
                  />
                </TabPanel>
              </SwipeableViews>
            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

export default LandingPage;
