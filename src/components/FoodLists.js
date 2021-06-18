import { Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import Post from "../components/Post";
import { db } from "../firebase";

function FoodLists() {
  const email = useAuth().currentUser.email;
  const [foods, setFoods] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  function populateData() {
    db.collection("restaurants")
      .get()
      .then(function (e) {
        e.docs.forEach((restaurant) => {
          restaurant.data().categories.forEach(function (category) {
            db.collection("restaurants")
              .doc(restaurant.id)
              .collection(category)
              .get()
              .then((item) => {
                item.docs.forEach((post) => {
                  const dict = {
                    ...post.data(),
                    displayName: restaurant.data().displayName,
                  };
                  setFoods((old) => [...old, dict]);
                });
              });
          });
        });
      });
  }

  function populateFavorites() {
    db.collection("userData")
      .doc(email)
      .get()
      .then(function (e) {
        console.log("GET FAVS");
        const fav = e.data().favorites;
        setFavorites(fav);
      });
  }

  function populateCart() {
    db.collection("userData")
      .doc(email)
      .get()
      .then(function (e) {
        console.log("GET FAV");
        const car = e.data().cart;
        setCart(
          car.map((e) => {
            return e.ref;
          })
        );
      });
  }

  useEffect(() => {
    populateData();
    populateFavorites();
    populateCart();
  }, []);

  return (
    <>
      <Container>
        <Grid container spacing={4}>
          {foods.map((post) => {
            return (
              <>
                <Grid item xs={12} sm={6} md={4}>
                  <Post
                    props={post}
                    isfav={favorites.includes(post.ref)}
                    isCart={cart.includes(post.ref)}
                  />
                </Grid>
              </>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}

export default FoodLists;
