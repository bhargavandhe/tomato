import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import { Container, IconButton } from "@material-ui/core";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const url =
  "https://firebasestorage.googleapis.com/v0/b/tomato-30cb2.appspot.com/o/offer-page.jpg?alt=media&token=e2bf449c-e7a8-4118-9f14-63ed21c2ab24";
const tutorialSteps = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath: url,
  },
  {
    label: "Bird",
    imgPath: url,
  },
  {
    label: "Bali, Indonesia",
    imgPath: url,
  },
  {
    label: "NeONBRAND Digital Marketing, Las Vegas, United States",
    imgPath: url,
  },
  {
    label: "Goč, Serbia",
    imgPath: url,
  },
];

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

function SwipeableTextMobileStepper() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Container>
      <div className={classes.root}>
        <AutoPlaySwipeableViews
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {tutorialSteps.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <img
                  style={{ borderRadius: 8 }}
                  className={classes.img}
                  src={step.imgPath}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          variant="dots"
          activeStep={activeStep}
          nextButton={
            <IconButton
              size="medium"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
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

export default SwipeableTextMobileStepper;
