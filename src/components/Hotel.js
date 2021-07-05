import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Grid, Tooltip } from "@material-ui/core";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import StarHalfRoundedIcon from "@material-ui/icons/StarHalfRounded";
const useStyles = makeStyles({
  root: {
    maxWidth: 600,
  },
  media: {
    height: 250,
  },
});

export default function Hotel({ hotelData }) {
  const classes = useStyles();

  function generateRatings(ratings) {
    const stars = [];
    [...Array(Math.floor(ratings))].forEach(() => {
      stars.push(<StarRoundedIcon color="secondary" />);
    });

    if (ratings - Math.floor(ratings) >= 0.5)
      stars.push(<StarHalfRoundedIcon color="secondary" />);

    return stars;
  }

  return (
    <Grid item xs={6}>
      <Card className={classes.root} variant="outlined">
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={hotelData.media}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {hotelData.displayName}
            </Typography>
            <Grid container>
              <Grid item xs={8}>
                <Typography variant="body2" color="textSecondary" component="p">
                  {hotelData.location}
                </Typography>
              </Grid>
              <Tooltip title={hotelData.rating} placement="bottom">
                <Grid align="right" item xs={4}>
                  {generateRatings(hotelData.rating)}
                </Grid>
              </Tooltip>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
