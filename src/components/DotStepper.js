import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import { Container, IconButton } from "@material-ui/core";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import firebase from "@firebase/app";
import "@firebase/storage";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    scale: 0.95,
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    backgroundColor: theme.palette.background.default,
  },
  img: {
    display: "block",
    overflow: "hidden",
    width: "100%",
  },
}));

export default function DotStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const [url, setUrl] = useState([]);

  async function setOffers() {
    const storage = firebase.storage();
    for (let i = 1; i <= 5; i++) {
      await storage
        .ref(`offers/offer-${i}.jpg`)
        .getDownloadURL()
        .then((url) => {
          setUrl((initUrls) => [...initUrls, url]);
        });
    }
  }

  useEffect(() => {
    setOffers();
  }, []);

  return (
    <Container>
      <div className={classes.root}>
        <AutoPlaySwipeableViews
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {url.map((step, index) => (
            <div key={index}>
              {Math.abs(activeStep - index) <= 2 ? (
                <img
                  style={{ borderRadius: 8 }}
                  className={classes.img}
                  src={step}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={url.length}
          position="static"
          variant="dots"
          activeStep={activeStep}
          nextButton={
            <IconButton
              size="medium"
              onClick={handleNext}
              disabled={activeStep === url.length - 1}
            >
              <KeyboardArrowRight />
            </IconButton>
          }
          backButton={
            <IconButton
              size="medium"
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              <KeyboardArrowLeft />
            </IconButton>
          }
        />
      </div>
    </Container>
  );
}
