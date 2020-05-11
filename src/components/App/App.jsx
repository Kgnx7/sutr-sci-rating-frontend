import React from "react";
import Routes from "../Routes";
import Backdrop from "../Backdrop";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: '100vh',
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Routes />
      <Backdrop />
    </div>
  );
}

export default App;
