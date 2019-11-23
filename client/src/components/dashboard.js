import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "./spinner";
import Breadcam from "./breadcams/rootbrd";
class Dashboard extends Component {
  render() {
    return (
      <div>
        <Breadcam currentTab="Dashboard" />
        {this.props.auth.stateLoading === true ? (
          <Spinner />
        ) : (
          <h2>Dashboard</h2>
        )}
      </div>
    );
  }
}
Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(Dashboard);
