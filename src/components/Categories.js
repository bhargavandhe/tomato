import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import TagFacesIcon from "@material-ui/icons/TagFaces";
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

export default function Categories() {
  const classes = useStyles();
  const categories = [
    "Vegetarian",
    "Non-vegetarian",
    "Fast food",
    "Pizza",
    "Dessert",
    "Instant",
  ];
  const [chipData, setChipData] = React.useState(categories);
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip != chipToDelete));
  };

  return (
    <Container className={classes.root}>
      {categories.map((category) => {
        return (
          <li key={categories.indexOf(category)}>
            <Chip
              icon={<TagFacesIcon />}
              label={category}
              onDelete={handleDelete(category)}
              className={classes.chip}
              color="secondary"
            />
          </li>
        );
      })}
    </Container>
  );
}
