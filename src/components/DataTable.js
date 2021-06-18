import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

export default function DataTable({ cart, foods }) {
  function getQuantity(ref) {
    var quantity = 1;
    cart.forEach((item) => {
      if (item.ref === ref) {
        quantity = item.quantity;
      }
    });
    return quantity;
  }

  const calculateSubtotal = () => {
    let subTotal = 0;
    foods.map((food) => {
      let quantity = getQuantity(food.ref);
      subTotal += food.price * quantity;
    });
    return subTotal;
  };

  let subTotal = calculateSubtotal();
  let deliveyCharges = 30;

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
              <TableCell>Sr. No</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="right">Qty.</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Sum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foods.map((food, index) => {
              let quantity = getQuantity(food.ref);
              return (
                <TableRow key={food.title}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="center">{food.title}</TableCell>
                  <TableCell align="right">{quantity}</TableCell>
                  <TableCell align="right">{food.price}</TableCell>
                  <TableCell align="right">
                    {ccyFormat(food.price * quantity)}
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
                {`Rs. ${deliveyCharges}`}
              </TableCell>
              <TableCell align="right" colSpan={2}>
                {`Rs. ${deliveyCharges}`}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right" colSpan={2}>
                {`Rs. ${subTotal + deliveyCharges}`}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
