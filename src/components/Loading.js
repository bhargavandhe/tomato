import React from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "90vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function Loading() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <CircularProgress color="secondary" thickness={2} />
    </div>
  );
}

export default Loading;
