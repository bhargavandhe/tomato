import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  Container,
  withStyles,
} from "@material-ui/core";
import { TableContainer, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import AppBar from "../components/AppBar";
import Loading from "../components/Loading";
import { db } from "../firebase";

const useStyles = makeStyles({
  root: {
    marginBottom: 50,
  },
  container: {
    marginTop: 30,
  },
});

function Orders() {
  const [loading, setLoading] = useState(true);
  const email = useAuth().currentUser.email;
  const [foodData, setFoodData] = useState([]);
  const [orders, setOrders] = useState([]);
  let hotelNames = new Map();

  async function populateOrders() {
    let x = [];
    let y = [];
    await db
      .collection("userData")
      .doc(email)
      .get()
      .then(async (data) => {
        x = data.data().orders;
        for (const orderData of x) {
          for (const order of orderData.items) {
            const address = order.ref.split("/");
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
              .doc(order.ref)
              .get()
              .then((fdata) => {
                y.push({
                  ...fdata.data(),
                  hotelName: hotelNames.get(address[1]),
                });
              });
          }
        }
      });
    setLoading(false);
    setFoodData(y);
    setOrders(x);
  }

  function getFoodData(ref) {
    for (const food of foodData) {
      if (food.ref == ref) return food;
    }
  }

  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  function DataTable({ order }) {
    let total = 0;
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

    const classes = useStyles();
    const date = new Date(order.timestamp);

    return (
      <Container className={classes.container}>
        <Typography variant="h6" gutterBottom>
          {`${date.toDateString()}, ${date.toLocaleTimeString("en-US")}`}
        </Typography>
        <TableContainer
          component={Paper}
          variant="outlined"
          style={{ borderRadius: 8 }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Sr. No</StyledTableCell>
                <StyledTableCell align="left">Title</StyledTableCell>
                <StyledTableCell align="right">Quantity</StyledTableCell>
                <StyledTableCell align="right">Price (Rs.)</StyledTableCell>
                <StyledTableCell align="right">Subtotal (Rs.)</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.items.map((item, index) => {
                const food = getFoodData(item.ref);
                total += food.price * item.quantity;
                return (
                  <StyledTableRow key={item.ref}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell align="left">
                      <Typography variant="body1">{food.title}</Typography>
                      <Typography variant="caption">
                        {food.hotelName}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">{ccyFormat(food.price)}</TableCell>
                    <TableCell align="right">
                      {ccyFormat(food.price * item.quantity)}
                    </TableCell>
                  </StyledTableRow>
                );
              })}
              <TableRow>
                <TableCell align="right" colSpan={4}>
                  <Typography variant="h6">Total</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">
                    {`Rs. ${ccyFormat(total)}`}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  }

  useEffect(() => {
    // setLoading(true);
    populateOrders();
  }, []);
  const classes = useStyles();

  return (
    <>
      <AppBar />
      {!loading ? (
        <div>
          <Container className={classes.root}>
            <Typography variant="h4">Your recent orders</Typography>
            {orders.map((order) => {
              return <DataTable order={order} />;
            })}
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Orders;
