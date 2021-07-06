import { Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import Post from "../components/Post";
import { db } from "../firebase";
import Loading from "./Loading";
import Footer from "./Footer";

function FoodLists({ filters }) {
  const email = useAuth().currentUser.email;
  const { searchValue } = filters;
  const [foods, setFoods] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  async function populateData() {
    let foodData = [];
    await db
      .collection("restaurants")
      .get()
      .then(async (e) => {
        for (const restaurant of e.docs) {
          for (const category of restaurant.data().categories) {
            await db
              .collection("restaurants")
              .doc(restaurant.id)
              .collection(category)
              .get()
              .then(async (item) => {
                for (const post of item.docs) {
                  foodData.push({
                    ...post.data(),
                    displayName: restaurant.data().displayName,
                  });
                }
              });
          }
        }
      });
    setFoods(foodData);
  }

  async function populateFavsAndCart() {
    await db
      .collection("userData")
      .doc(email)
      .get()
      .then(function (e) {
        console.log("GET FAVS");
        const fav = e.data().favorites;
        setFavorites(fav);
        const car = e.data().cart;
        setCart(
          car.map((e) => {
            return e.ref;
          })
        );
      });
    setLoading(false);
  }

  useEffect(() => {
    populateData();
    populateFavsAndCart();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Container>
        <Grid container spacing={4}>
          {foods.map((post) => {
            if (searchValue !== "") {
              if (
                post.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                post.displayName
                  .toLowerCase()
                  .includes(searchValue.toLowerCase()) ||
                post.category.toLowerCase().includes(searchValue.toLowerCase())
              ) {
                return (
                  <Grid item xs={12} sm={6} md={4}>
                    <Post
                      props={post}
                      isfav={favorites.includes(post.ref)}
                      isCart={cart.includes(post.ref)}
                    />
                  </Grid>
                );
              }
            } else {
              return (
                <Grid item xs={12} sm={6} md={4}>
                  <Post
                    props={post}
                    isfav={favorites.includes(post.ref)}
                    isCart={cart.includes(post.ref)}
                  />
                </Grid>
              );
            }
          })}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default FoodLists;
