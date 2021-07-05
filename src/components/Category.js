import React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: "#000000",
  },
  title: {
    padding: 20,
  },
}));

function Category({ category }) {
  const classes = useStyles();

  return (
    <Grid item xs={4} md={3} lg={2}>
      <Link to="/" className={classes.link}>
        <Avatar style={{ width: 128, height: 128 }} src={category.data.media} />
        <Typography>
          {category.title[0].toUpperCase() +
            category.title.substr(1, category.title.length)}
        </Typography>
      </Link>
    </Grid>
  );
}

export default Category;
