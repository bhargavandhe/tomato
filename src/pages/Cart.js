import {
  Container,
  Paper,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
  InputAdornment,
  Button,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import AppBar from "../components/AppBar";
import { db } from "../firebase";
import DataTable from "../components/DataTable";
import CircularProgress from "@material-ui/core/CircularProgress";
import PaymentMethod from "../components/PaymentMethod";
import Loading from "../components/Loading";

function Cart() {
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = useAuth().currentUser.email;
  const [willDonate, setWillDonate] = useState(false);
  const [total, setTotal] = useState(0);
  const [openPaymentMethod, setOpenPaymentMethod] = useState(false);
  const hotelNames = new Map();
  const [values, setValues] = useState({
    tomcoins: 0,
    address: "",
  });

  function populateCart() {
    db.collection("userData")
      .doc(email)
      .get()
      .then(async (e) => {
        console.log("GET Cart");
        const car = e.data().cart;
        setCart(car);
        for (const element of car) {
          const address = element.ref.split("/");
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
          await db
            .doc(element.ref)
            .get()
            .then((data) => {
              console.log("GET CART");
              setFoods((oldFoods) => [
                ...oldFoods,
                { ...data.data(), hotelName: hotelNames.get(address[1]) },
              ]);
            });
        }
        setLoading(false);
      });
  }

  function populateUser() {
    db.collection("userData")
      .doc(email)
      .get()
      .then((data) => {
        setValues({
          tomcoins: data.data().tomcoins,
          address: data.data().address,
        });
      });
  }

  useEffect(() => {
    populateCart();
    populateUser();
  }, []);

  const handleDonate = () => {
    setWillDonate(!willDonate);
  };

  const handlePayment = () => {
    setOpenPaymentMethod(true);
  };

  return (
    <>
      <AppBar />
      {loading ? (
        <Loading />
      ) : foods.length > 0 ? (
        <>
          <PaymentMethod
            props={{
              openPaymentMethod,
              setOpenPaymentMethod,
              balance: values.tomcoins,
              total: total,
              cart: cart,
            }}
          />
          <Container>
            <Typography style={{ padding: 20 }} variant="h2">
              In your cart
            </Typography>
            <DataTable
              cartProps={{ cart, setCart }}
              foodProps={{ foods, setFoods }}
              setTotal={setTotal}
            />
            <Container style={{ padding: 20, marginBottom: 50 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    value={willDonate}
                    onClick={handleDonate}
                  />
                }
                label="I would like to donate to Covid relief funds, a sum of"
              />
              <TextField
                disabled={!willDonate}
                placeholder="1"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Rs.</InputAdornment>
                  ),
                }}
              />
            </Container>
            <Container
              maxWidth="sm"
              fixed
              style={{ position: "fixed", bottom: 0, padding: 20 }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={handlePayment}
              >
                Proceed to pay
              </Button>
            </Container>
          </Container>
        </>
      ) : (
        <Container>
          <Paper style={{ padding: 20 }} variant="outlined">
            <h1>Your cart is empty!</h1>
          </Paper>
        </Container>
      )}
    </>
  );
}

export default Cart;
