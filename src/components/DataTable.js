import { withStyles, makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container, IconButton, Typography } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { useAuth } from "../AuthContext";
import { db } from "../firebase";
import ClearIcon from "@material-ui/icons/Clear";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {},
});

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

export default function DataTable({ cartProps, foodProps, setTotal }) {
  const classes = useStyles();
  const { cart, setCart } = cartProps;
  const { foods, setFoods } = foodProps;
  const email = useAuth().currentUser.email;

  const calculateSubtotal = () => {
    let subTotal = 0;
    if (cart) {
      foods.map((food, index) => {
        let quantity = cart[index].quantity;
        subTotal += food.price * quantity;
      });
    }
    return subTotal;
  };
  let subTotal = calculateSubtotal();
  let deliveryCharges = subTotal > 0 ? 30 : 0;

  useEffect(() => {
    setTotal(subTotal + deliveryCharges);
  }, [subTotal]);

  useEffect(() => {
    console.log("CHENGED");
    db.collection("userData")
      .doc(email)
      .update({
        cart: cart,
      })
      .then(() => {
        console.log("UPDATED");
      });
    setCart(cart);
  }, [cart]);

  function remove(index) {
    console.log("REMOVE");
    let newCart = [];
    let newFoods = [];
    cart.map((item, id) => {
      if (id != index) {
        newCart.push(item);
      }
    });
    foods.map((item, id) => {
      if (id != index) {
        newFoods.push(item);
      }
    });
    setFoods(newFoods);
    setCart(newCart);
    console.log(cart, newCart);
  }

  function addMore(index) {
    console.log("ADD");
    let newCart = [];
    cart.map((item, id) => {
      if (id == index) {
        newCart.push({ ...item, quantity: item.quantity + 1 });
      } else {
        newCart.push(item);
      }
    });
    setCart(newCart);
  }

  function reduce(index) {
    console.log("REDUCE");
    let newCart = [];
    cart.map((item, id) => {
      if (id == index) {
        newCart.push({ ...item, quantity: item.quantity - 1 });
      } else {
        newCart.push(item);
      }
    });
    setCart(newCart);
  }
  return (
    <Container>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">Sr. no</StyledTableCell>
              <StyledTableCell align="left">Title</StyledTableCell>
              <StyledTableCell align="center">Quantity</StyledTableCell>
              <StyledTableCell align="right">Price (Rs.)</StyledTableCell>
              <StyledTableCell align="right">Subtotal (Rs.)</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foods.map((food, index) => {
              return (
                <StyledTableRow key={food.title}>
                  <TableCell align="right">{index + 1}</TableCell>
                  <TableCell align="left">
                    <Typography variant="body1">{food.title}</Typography>
                    <Typography variant="caption">{food.hotelName}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => {
                        reduce(index);
                      }}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                    {cart[index].quantity}
                    <IconButton
                      onClick={() => {
                        addMore(index);
                      }}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">{ccyFormat(food.price)}</TableCell>
                  <TableCell align="right">
                    {ccyFormat(food.price * cart[index].quantity)}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      <ClearIcon />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              );
            })}
            <StyledTableRow>
              <TableCell colSpan={2} />
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right">{`Rs. ${ccyFormat(
                subTotal
              )}`}</TableCell>
              <TableCell align="right">{`Rs. ${ccyFormat(
                subTotal
              )}`}</TableCell>
              <TableCell />
            </StyledTableRow>
            <StyledTableRow>
              <TableCell colSpan={2} />
              <TableCell align="right">Delivery charges</TableCell>
              <TableCell />
              <TableCell align="right">{`Rs. ${ccyFormat(
                deliveryCharges
              )}`}</TableCell>
              <TableCell />
            </StyledTableRow>
            <StyledTableRow>
              <TableCell colSpan={2} />
              <TableCell align="right">
                <Typography variant="h6">Total</Typography>
              </TableCell>
              <TableCell />
              <TableCell align="right">
                <Typography variant="h6">
                  {`Rs. ${ccyFormat(subTotal + deliveryCharges)}`}
                </Typography>
              </TableCell>
              <TableCell />
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
