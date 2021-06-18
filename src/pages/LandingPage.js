import { React, useState } from "react";
import TabPanel from "../components/TabPanel";
import SwipeableViews from "react-swipeable-views";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Login from "./Login";
import Register from "./Register";

import {
  CssBaseline,
  Link,
  Tabs,
  Tab,
  Grid,
  Box,
  Typography,
  Avatar,
  Container,
} from "@material-ui/core";

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
    name: "",
    age: "",
    phone: "",
    gender: "",
  });

  const nextStage = () => {
    setStage(stage + 1);
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

  return (
    <>
      <Grid container>
        <Grid item xs={0} md={6} l={4}>
          <div className={classes.root}>
            <img src="https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" />
          </div>
        </Grid>
        <Grid item xs={12} md={6} l={8}>
          <Container component="main" maxWidth={"sm"}>
            <CssBaseline />
            <div className={classes.paper}>
              <img src="https://firebasestorage.googleapis.com/v0/b/tomato-30cb2.appspot.com/o/logo.png?alt=media&token=3fe3fe56-1e60-4b05-9d97-f83d3dbb3b65" />
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
