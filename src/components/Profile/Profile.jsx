import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";

import Header from "../Header";

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    paddingTop: 100,
    textAlign: "center",
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: "0 auto",
  },
  text: {
    marginTop: theme.spacing(3),
  },
}));

export default function Profile() {
  const user = useSelector((state) => state.auth.user);

  const classes = useStyles();
  return (
    <>
      <Header />
      <Container className={classes.profileContainer}>
        <Typography variant="h2" gutterBottom>
          Профиль
        </Typography>
        {user && (
          <>
            <Avatar src="/broken-image.jpg" className={classes.avatar} />
            <Typography className={classes.text}>{`Почта: ${user.email}`}</Typography>
          </>
        )}
      </Container>
    </>
  );
}
