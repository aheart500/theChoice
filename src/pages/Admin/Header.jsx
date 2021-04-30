import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link, useHistory } from "react-router-dom";
import minilogo from "../../images/mini-logo.png";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import UserContext from "../../Contexts/User/UserContext";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const { Logout } = useContext(UserContext);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <img src={minilogo} width="70px" alt="logo" />
          </Link>

          <Typography variant="h6" className={classes.title} onClick={() => history.goBack()}>
            Admin Panel
          </Typography>
          <IconButton edge="end" title="logout" color="inherit" onClick={() => Logout()}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
