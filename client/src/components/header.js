import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { logoutadmin } from "../actions/authActions";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography
} from "@material-ui/core";

import {
  AcUnit,
  BrandingWatermark,
  AmpStories,
  ExpandLess,
  ExpandMore,
  AccountTree,
  ExitToApp
} from "@material-ui/icons";

const drawerWidth = 270;
const styles = theme => ({
  title: {
    flexGrow: 1
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  customLink: {
    textDecoration: "none",
    color: "black"
  },
  nested: {
    paddingLeft: theme.spacing(5)
  }
});

class Header extends React.Component {
  state = {
    mobileOpen: false,
    products: false
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  handleDrawerTogglec = () => {
    this.setState({ mobileOpen: false });
  };

  productshandleClick = () => {
    this.setState({ products: !this.state.products });
  };
  handleLogout = () => {
    this.props.logoutadmin();
    this.props.history.push("/login");
  };

  render() {
    const { classes } = this.props;
    const drwerContent = (
      <div>
        <h2 style={{ padding: "0px 10px" }}>Admin Panel | 1.0 </h2>

        <Divider />
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          className={classes.root}
        >
          <ListItem button onClick={this.productshandleClick}>
            <ListItemIcon>
              <AmpStories />
            </ListItemIcon>
            <ListItemText primary="Products" />
            {this.state.products ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.products} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/brands" className={classes.customLink}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <BrandingWatermark />
                  </ListItemIcon>
                  <ListItemText primary="Brand" />
                </ListItem>
              </Link>
              <Link to="/categories" className={classes.customLink}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <AcUnit />
                  </ListItemIcon>
                  <ListItemText primary="Category" />
                </ListItem>
              </Link>
              <Link to="/sub-categories" className={classes.customLink}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <AccountTree />
                  </ListItemIcon>
                  <ListItemText primary="Sub Category" />
                </ListItem>
              </Link>
            </List>
          </Collapse>
        </List>
      </div>
    );

    const navcontent = (
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drwerContent}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drwerContent}
          </Drawer>
        </Hidden>
      </nav>
    );
    return (
      <div>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography
              className="title"
              variant="h6"
              style={{ flex: 1 }}
              noWrap
            >
              eMart
            </Typography>

            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={this.handleLogout}
              color="inherit"
            >
              <ExitToApp />
            </IconButton>
          </Toolbar>
        </AppBar>
        <CssBaseline />
        {this.props.auth.isAuthenticated === true ? navcontent : ""}
      </div>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default withRouter(
  connect(mapStateToProps, { logoutadmin })(withStyles(styles)(Header))
);
