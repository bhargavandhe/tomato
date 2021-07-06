import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import { db } from "../firebase";
import { useEffect } from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function Categories({ props }) {
  const classes = useStyles();

  const { categoryFilter, setCategoryFilter } = props;
  const [categories, setCategories] = useState([]);

  function populateCategories() {
    db.collection("categories")
      .get()
      .then((data) => {
        data.docs.forEach((category) => {
          setCategories((initCategories) => [...initCategories, category.id]);
        });
      });
  }

  useEffect(() => {
    setCategories([]);
    populateCategories();
  }, []);

  return (
    <Container className={classes.root}>
      {categories.map((category, index) => {
        return (
          <li>
            {category === categoryFilter ? (
              <Chip
                className={classes.chip}
                label={
                  category[0].toUpperCase() +
                  category.substr(1, category.length).toLowerCase()
                }
                color="secondary"
                clickable
                variant="default"
                onClick={() => {
                  setCategoryFilter(categories[index]);
                }}
                onDelete={() => {
                  setCategoryFilter("");
                }}
              />
            ) : (
              <Chip
                className={classes.chip}
                label={
                  category[0].toUpperCase() +
                  category.substr(1, category.length).toLowerCase()
                }
                color="secondary"
                clickable
                variant="outlined"
                onClick={() => {
                  setCategoryFilter(categories[index]);
                }}
              />
            )}
          </li>
        );
      })}
    </Container>
  );
}
