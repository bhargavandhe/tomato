import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Grid, Link } from "@material-ui/core";
import { FaInstagram, FaFacebook, FaYoutube, FaTwitter } from "react-icons/fa";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "25vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
  instagram: {
    transition: "0.5s ease-in-out",
    "&:hover": {
      color: "#6A3CC3",
    },
  },
  facebook: {
    transition: "0.5s ease-in-out",
    "&:hover": {
      color: "#24487D",
    },
  },
  youtube: {
    transition: "0.5s ease-in-out",
    "&:hover": {
      color: "#f00",
    },
  },
  twitter: {
    transition: "0.5s ease-in-out",
    "&:hover": {
      color: "#00AEF4",
    },
  },
  logo: {
    textDecorationLine: "none",
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container>
          <Grid container>
            <Grid item xs={4}>
              <Link underline="none" href="/">
                <Typography color="secondary" variant="h4">
                  tomato
                </Typography>
              </Link>
              <Copyright />
            </Grid>
            <Grid item xs={4}>
              <Typography gutterBottom variant="h6">
                Quick Links
              </Typography>
              <Link color="inherit" href="/about">
                <Typography>About us</Typography>
              </Link>
              <Link color="inherit" href="https://github.com">
                <Typography>Source code</Typography>
              </Link>
              <Link color="inherit" href="mailto:bhargavandhe2310@gmail.com">
                <Typography>Write a review</Typography>
              </Link>
            </Grid>
            <Grid item xs={4}>
              <Typography gutterBottom variant="h6">
                Get in Touch
              </Typography>
              <Grid container>
                <Grid item xs={3} lg={2}>
                  <Link color="inherit" href="https://instagram.com">
                    <FaInstagram className={classes.instagram} size="2em" />
                  </Link>
                </Grid>
                <Grid item xs={3} lg={2}>
                  <Link color="inherit" href="https://facebook.com">
                    <FaFacebook className={classes.facebook} size="2em" />
                  </Link>
                </Grid>
                <Grid item xs={3} lg={2}>
                  <Link color="inherit" href="https://youtube.com">
                    <FaYoutube className={classes.youtube} size="2em" />
                  </Link>
                </Grid>
                <Grid item xs={3} lg={2}>
                  <Link color="inherit" href="https://twitter.com">
                    <FaTwitter className={classes.twitter} size="2em" />
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </footer>
    </div>
  );
}
