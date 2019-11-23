import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginadmin } from "../actions/authActions";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Chip
} from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";

import Header from "./header";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handlechange = e => {
    this.setState({ email: e.target.value });
  };
  handlechangep = e => {
    this.setState({ password: e.target.value });
  };
  formSubmit = () => {
    const newUser = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginadmin(newUser);
  };
  handleDelete = () => {
    this.setState({ errors: {} });
  };

  render() {
    const style = {
      root: {
        flexGrow: 1,
        paddingTop: 200
      },
      paper: {
        padding: 20,
        margin: "auto",
        maxWidth: 500
      },
      textField: {
        marginLeft: 10,
        marginRight: 10,
        width: 200
      },
      button: {
        marginTop: 10,
        float: "right"
      },

      customalart: {
        marginLeft: "auto",
        marginRight: "auto",
        position: "absolute",
        left: 0,
        right: 0,
        width: 250,
        marginTop: 140
      },

      hide: {
        display: "none"
      }
    };
    return (
      <div>
        <Header />
        <Chip
          style={this.state.errors.invalid ? style.customalart : style.hide}
          icon={<FaceIcon />}
          label={this.state.errors.invalid}
          color="secondary"
          onDelete={this.handleDelete}
        />
        <div className="root" style={style.root}>
          <Paper className="paper" style={style.paper}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={1}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      Admin Login Form
                    </Typography>

                    <form noValidate autoComplete="off">
                      <TextField
                        error={this.state.errors.emailError ? true : false}
                        fullWidth
                        label="Email"
                        className="textField"
                        style={style.textField}
                        margin="normal"
                        type="email"
                        helperText={this.state.errors.emailError}
                        onChange={this.handlechange}
                        defaultValue={this.state.email}
                      />
                      <TextField
                        error={this.state.errors.passwordError ? true : false}
                        fullWidth
                        label="Password"
                        className="textField"
                        style={style.textField}
                        margin="normal"
                        type="password"
                        helperText={this.state.errors.passwordError}
                        onChange={this.handlechangep}
                        defaultValue={this.state.password}
                      />
                      <Button
                        onClick={this.formSubmit}
                        variant="contained"
                        color="primary"
                        className="button"
                        style={style.button}
                      >
                        Login
                      </Button>
                    </form>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginadmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default withRouter(
  connect(
    mapStateToProps,
    { loginadmin }
  )(Login)
);
