import React, { Component } from "react";
import { Route, Switch } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Header from "./header";
import Dashboard from "./dashboard";
import Brand from "./brands/brand";
import Addbrand from "./brands/addbrand";
import Category from "./Category/category";
import SubCategory from "./Category/subcategory";

const styles = theme => ({
  root: {
    display: "flex",
    flexGrow: 1
  },
  content: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1, 2)
  },
  toolbar: theme.mixins.toolbar
});
class BroylerPlate extends Component {
  handleClick = event => {
    event.preventDefault();
    alert("You clicked a breadcrumb.");
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Header />
        <main className={classes.content}>
          <Switch>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/brands">
              <Brand />
            </Route>
            <Route exact path="/brands/add">
              <Addbrand />
            </Route>
            <Route exact path="/categories">
              <Category />
            </Route>
            <Route exact path="/sub-categories">
              <SubCategory />
            </Route>
          </Switch>
        </main>
      </div>
    );
  }
}

BroylerPlate.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, {})(withStyles(styles)(BroylerPlate));
