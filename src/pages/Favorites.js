import { Grid, Container, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import AppBar from "../components/AppBar";
import Post from "../components/Post";
import { db } from "../firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
function Favorites() {
  const [foods, setFoods] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = useAuth().currentUser.email;

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
            .then((data) => {
              console.log("GET FAV");
              setFoods((oldFoods) => [...oldFoods, data.data()]);
              console.log("Done adding");
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
    populateFavorites();
    populateCart();
  }, []);

  if (!loading) {
    return favorites.length > 0 ? (
      <div>
        <AppBar />
        <Container>
          <Typography variant="h2">Your favorites</Typography>
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
      </div>
    ) : (
      <div>
        <AppBar />
        <Container>
          <Paper style={{ padding: 20 }} variant="outlined">
            <h1>You haven't yet added anything to favorites</h1>
          </Paper>
        </Container>
      </div>
    );
  } else {
    return (
      <>
        <AppBar />
        <Container>
          <CircularProgress color="secondary" />
        </Container>
      </>
    );
  }
}

export default Favorites;
