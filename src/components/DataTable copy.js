import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container, IconButton } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { DeleteForeverOutlined } from "@material-ui/icons";
import { useAuth } from "../AuthContext";
import { db } from "../firebase";
import ClearIcon from "@material-ui/icons/Clear";

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

export default function DataTable({ cartProps, foods }) {
  const { cart, setCart } = cartProps;
  const [userCart, setUserCart] = useState(cart);
  const email = useAuth().currentUser.email;

  const calculateSubtotal = () => {
    let subTotal = 0;
    foods.map((food, index) => {
      let quantity = userCart[index].quantity;
      subTotal += food.price * quantity;
    });
    return subTotal;
  };

  let subTotal = calculateSubtotal();
  let deliveryCharges = subTotal > 0 ? 30 : 0;

  useEffect(() => {
    db.collection("userData")
      .doc(email)
      .update({
        cart: userCart,
      })
      .then(() => {
        console.log("UPDATED");
      });
    setCart(cart);
  }, [userCart]);

  function addMore(index) {
    console.log("ADD");
    let newCart = [];
    userCart.map((item, id) => {
      if (id == index) {
        newCart.push({ ...item, quantity: item.quantity + 1 });
      } else {
        newCart.push(item);
      }
    });
    setUserCart(newCart);
  }

  function reduce(index) {
    console.log("RED");
    let newCart = [];
    userCart.map((item, id) => {
      if (id == index) {
        newCart.push({ ...item, quantity: item.quantity - 1 });
      } else {
        newCart.push(item);
      }
    });
    setUserCart(newCart);
  }

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
              <TableCell align="right" colSpan={2}>
                Subtotal
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Sr. No</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="right">Qty.</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Sum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foods.map((food, index) => {
              return (
                <TableRow key={food.title}>
                  <TableCell>
                    <IconButton>
                      <ClearIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="center">{food.title}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        reduce(index);
                      }}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                    {userCart[index].quantity}
                    <IconButton
                      onClick={() => {
                        addMore(index);
                      }}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">{food.price}</TableCell>
                  <TableCell align="right">
                    {ccyFormat(food.price * userCart[index].quantity)}
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell rowSpan={4} />
              <TableCell colSpan={3}>Subtotal</TableCell>
              <TableCell align="right" colSpan={2}>
                {`Rs. ${ccyFormat(subTotal)}`}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Delivery charges</TableCell>
              <TableCell align="right" colSpan={2}>
                {`Rs. ${deliveryCharges}`}
              </TableCell>
              <TableCell align="right" colSpan={2}>
                {`Rs. ${deliveryCharges}`}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right" colSpan={2}>
                {`Rs. ${subTotal + deliveryCharges}`}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
