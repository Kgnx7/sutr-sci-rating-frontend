import React from "react";
import Routes from "../Routes";
import Backdrop from "../Backdrop";
import { SnackbarProvider } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import Notifier from "../Notifier";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <SnackbarProvider>
      <div className={classes.root}>
        <Routes />
        <Backdrop />
        <Notifier />
      </div>
    </SnackbarProvider>
  );
}

export default App;
