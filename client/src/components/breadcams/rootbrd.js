import React from "react";
import { Link } from "react-router-dom";
import { Typography, Breadcrumbs } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const style = {
  customLink: {
    textDecoration: "none",
    color: "black"
  },
  customBreadcam: {
    borderBottom: "1px solid lightgray",
    padding: "10px 2px 11px 28px",
    marginLeft: "-30px"
  }
};
const Rootbread = ({ currentTab }) => {
  return (
    <Breadcrumbs
      style={style.customBreadcam}
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      <Link style={style.customLink} to="/">
        eMart
      </Link>
      <Link style={style.customLink} to="/dashboard">
        Admin
      </Link>
      <Typography color="textPrimary">{currentTab}</Typography>
    </Breadcrumbs>
  );
};

export default Rootbread;
