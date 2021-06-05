import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  container: {
    position: "relative",
  },
  bottom: {
    color: "#95dea8",
  },
  top: {
    color: "#aa02f2",
    animationDuration: "700ms",
    position: "absolute",
    left: 0,
  },
  circle: {
    strokeLinecap: "round",
  },
});

const Loader = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <CircularProgress
          variant="determinate"
          className={classes.bottom}
          size={60}
          thickness={4}
          value={100}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          className={classes.top}
          classes={{
            circle: classes.circle,
          }}
          size={60}
          thickness={4}
          value={10}
        />
      </div>
    </div>
  );
};

export default Loader;