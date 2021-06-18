import React, { useState } from "react";
import DotStepper from "../components/DotStepper";
import { Grid } from "@material-ui/core";
import Categories from "../components/Categories";
import FoodLists from "../components/FoodLists";
import AppBar from "../components/AppBar";
import { Switch } from "react-router-dom";

function Home() {
  return (
    <div>
      <>
        <AppBar />
        <DotStepper />
        <Grid container justify="center" spacing={3}>
          <Categories />
        </Grid>
        <FoodLists />
      </>
    </div>
  );
}

export default Home;
