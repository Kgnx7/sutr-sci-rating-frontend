import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { resetError as resetUsersError } from "../../app/usersSlice";
import { resetError as resetAuthError } from "../../app/authSlice";

export default function SimpleSnackbar() {
  const [snackbar, setSnackbar] = useState(false);
  const dispatch = useDispatch();

  const authError = useSelector((state) => state.auth.error);
  const usersError = useSelector((state) => state.users.error);

  useEffect(() => {
    if (snackbar) {
      return;
    }

    if (authError) {
      setSnackbar(authError?.response?.data?.message || "Что-то пошло не так");
      return;
    }

    if (usersError) {
      setSnackbar(usersError?.response?.data?.message || "Что-то пошло не так");
      return;
    }
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(resetUsersError());
    dispatch(resetAuthError());

    setSnackbar(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackbar}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
