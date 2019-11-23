import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IconImage from "../assets/img/catmain.svg";

const styles = theme => ({
  toolbar: theme.mixins.toolbar
});
class pageheader extends Component {
  state = {
    open: false
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid
          item
          xs={12}
          style={{
            width: "100%",
            height: "450px",
            backgroundImage: this.props.color
          }}
        >
          <div className={classes.toolbar} />
          <div className="pageheader-conatiner">
            <div className="page-details">
              <h3>{this.props.pagetitle}</h3>
              <h4>{this.props.pagetext}</h4>
              <div onClick={this.props.handleClickOpen} className="pagebtn">
                {this.props.buttontext}
              </div>
            </div>
            <div className="page-image">
              <img src={IconImage} alt="Category Icon" />
            </div>
          </div>
        </Grid>
        <div className="table-header">
          <h3>Categories List</h3>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(pageheader);
