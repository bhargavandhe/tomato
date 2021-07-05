import AppBar from "../components/AppBar";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import DotStepper from "../components/DotStepper";
import { db } from "../firebase";
import Category from "../components/Category";
import Hotel from "../components/Hotel";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: 20,
  },
}));

function Explore() {
  const [categories, setCategories] = useState([]);
  const [hotels, setHotels] = useState([]);
  const classes = useStyles();
  function populateCategories() {
    setCategories([]);
    db.collection("categories")
      .get()
      .then((data) => {
        console.log("GET CAT");
        data.docs.forEach((category) => {
          setCategories((initCategories) => [
            ...initCategories,
            { title: category.id, data: category.data() },
          ]);
        });
      });
  }

  function populateHotels() {
    setHotels([]);
    db.collection("restaurants")
      .get()
      .then((data) => {
        console.log("GET HOT");
        data.docs.forEach((hotelData) => {
          const hotel = hotelData.data();
          console.log(hotel);
          setHotels((initHotels) => [
            ...initHotels,
            {
              displayName: hotel.displayName,
              location: hotel.location,
              media: hotel.media,
              rating: hotel.rating,
            },
          ]);
        });
      });
  }

  useEffect(() => {
    populateCategories();
    populateHotels();
  }, []);

  return (
    <div>
      <AppBar />
      <DotStepper />
      <Container>
        <Typography className={classes.title} variant="h5">
          Browse by category
        </Typography>
        <Grid container align="center" spacing={4}>
          {categories.map((category) => {
            return <Category category={category} />;
          })}
        </Grid>
        <Typography className={classes.title} variant="h5">
          Hotels near you
        </Typography>
        <Grid container spacing={4}>
          {hotels.map((hotel) => {
            return <Hotel hotelData={hotel} />;
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default Explore;
