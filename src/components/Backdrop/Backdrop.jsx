import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function _Backdrop() {
  const classes = useStyles();
  const isLoadingAuth = useSelector((state) => state.auth.isLoading);
  const isLoadingUsers = useSelector((state) => state.users.isLoading);
  const isLoadingPositions = useSelector((state) => state.positions.isLoading);
  const isLoadingDepartments = useSelector(
    (state) => state.departments.isLoading
  );
  const isLoadingFaculties = useSelector((state) => state.faculties.isLoading);
  const isLoadingStaffs = useSelector((state) => state.staffs.isLoading);

  return (
    <Backdrop
      className={classes.backdrop}
      open={
        isLoadingAuth ||
        isLoadingUsers ||
        isLoadingPositions ||
        isLoadingDepartments ||
        isLoadingFaculties ||
        isLoadingStaffs
      }
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
