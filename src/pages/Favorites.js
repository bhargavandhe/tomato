import { Grid, Container, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import AppBar from "../components/AppBar";
import Post from "../components/Post";
import { db } from "../firebase";
import Loading from "../components/Loading";

function Favorites() {
  const [foods, setFoods] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = useAuth().currentUser.email;
  let hotelNames = new Map();

  function populateFavorites() {
    db.collection("userData")
      .doc(email)
      .get()
      .then(function (e) {
        console.log("GET FAV");
        const fav = e.data().favorites;
        setFavorites(fav);
        fav.forEach((element) => {
          db.doc(element)
            .get()
            .then(async (data) => {
              console.log("GET FAV");
              const address = element.split("/");
              if (!hotelNames.has(address[1])) {
                await db
                  .collection("restaurants")
                  .doc(address[1])
                  .get()
                  .then((data) => {
                    console.log("GET");
                    hotelNames.set(address[1], data.data().displayName);
                  });
              }
              setFoods((oldFoods) => [
                ...oldFoods,
                { ...data.data(), displayName: hotelNames.get(address[1]) },
              ]);
            });
        });
        setLoading(false);
      });
  }

  function populateCart() {
    db.collection("userData")
      .doc(email)
      .get()
      .then(function (e) {
        console.log("GET CART");
        const fav = e.data().cart;
        setCart(fav);
      });
  }

  useEffect(() => {
    setFavorites([]);
    setCart([]);
    populateFavorites();
    populateCart();
  }, []);

  return (
    <>
      <AppBar />
      {loading ? (
        <Loading />
      ) : favorites.length > 0 ? (
        <Container>
          <Typography style={{ padding: 20 }} variant="h4">
            Your favorites
          </Typography>
          <Grid container spacing={4}>
            {foods.map((post) => {
              return (
                <Grid item xs={12} md={4}>
                  <Post
                    props={post}
                    isfav={favorites.includes(post.ref)}
                    isCart={cart.includes(post.ref)}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      ) : (
        <Container>
          <Paper style={{ padding: 20 }} variant="outlined">
            <h1>You haven't yet added anything to favorites</h1>
          </Paper>
        </Container>
      )}
    </>
  );
}

export default Favorites;
