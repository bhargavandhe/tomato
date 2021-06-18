import { Grid, Container, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState, Component } from "react";
import { useAuth } from "../AuthContext";
import AppBar from "../components/AppBar";
import Post from "../components/Post";
import { db } from "../firebase";
import DataTable from "../components/DataTable";
import CircularProgress from "@material-ui/core/CircularProgress";
function Cart() {
  const [foods, setFoods] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState({});
  const [refs, setRefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = useAuth().currentUser.email;

  function populateCart() {
    db.collection("userData")
      .doc(email)
      .get()
      .then(function (e) {
        console.log("GET FAV");
        const car = e.data().cart;
        setCart(car);
        setRefs(
          car.map((e) => {
            return e.ref;
          })
        );
        car.forEach((element) => {
          db.doc(element.ref)
            .get()
            .then((data) => {
              console.log("GET CART");
              setFoods((oldFoods) => [...oldFoods, data.data()]);
            });
        });
        setLoading(false);
      });
  }

  function populateFavorites() {
    db.collection("userData")
      .doc(email)
      .get()
      .then(function (e) {
        console.log("GET FAV");
        const fav = e.data().favorites;
        setFavorites(fav);
      });
  }

  useEffect(() => {
    populateFavorites();
    populateCart();
  }, []);

  if (!loading) {
    return refs.length > 0 ? (
      <div>
        <AppBar />
        <Container>
          <Typography variant="h2">In your cart</Typography>
          <DataTable cart={cart} foods={foods} />
        </Container>
      </div>
    ) : (
      <div>
        <AppBar />
        <Container>
          <Paper style={{ padding: 20 }} variant="outlined">
            <h1>Your cart is empty!</h1>
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

export default Cart;
