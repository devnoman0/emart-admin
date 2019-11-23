import React, { Component } from "react";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
// import { DropzoneArea } from "material-ui-dropzone";
import MultiBreadcam from "../breadcams/mndbread";

class Addbrand extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    files: []
  };

  handleSubmit = () => {
    return {};
  };
  handleChange(files) {
    this.setState({
      files: files
    });
  }
  render() {
    const style = {
      button: {
        marginTop: 10,
        marginLeft: 10,
        float: "left"
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
        <MultiBreadcam url="/brands" rootTab="Brands" currentTab="Add" />

        <Grid
          container
          spacing={1}
          style={{
            width: 650,
            padding: 20
          }}
        >
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={1}>
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant="h6"
                  style={{
                    padding: 0,
                    margin: "0px 0px 20px 0px",
                    fontSize: "1.25rem",
                    wordSpacing: 0.04,
                    fontWeight: 550,
                    lineHeight: "28px"
                  }}
                >
                  Enter the following fields to add a new brand and carefull
                  this brand will appear on the home page.
                </Typography>

                <form noValidate autoComplete="off">
                  <TextField
                    label="Brand Name"
                    fullWidth
                    style={{ marginBottom: 20 }}
                    id="outlined-margin-dense"
                    defaultValue=""
                    className="textField"
                    margin="dense"
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    id="outlined-margin-dense"
                    label="Meta Title"
                    multiline
                    rows="3"
                    defaultValue=""
                    className="textField"
                    style={{ marginBottom: 20 }}
                    margin="dense"
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    id="outlined-margin-dense"
                    label="Meta Description"
                    multiline
                    rows="4"
                    defaultValue=""
                    className="textField"
                    style={{ marginBottom: 20 }}
                    margin="dense"
                    variant="outlined"
                  />
                  {/* <DropzoneArea
                    onChange={this.handleChange.bind(this)}
                    style={{ marginTop: 10, height: 100 }}
                  /> */}
                  <Button
                    onClick={this.formSubmit}
                    variant="contained"
                    color="secondary"
                    className="button"
                    style={style.button}
                  >
                    Reset Form
                  </Button>
                  <Button
                    onClick={this.formSubmit}
                    variant="contained"
                    color="primary"
                    className="button"
                    style={style.button}
                  >
                    Add Brand
                  </Button>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
Addbrand.propTypes = {};
export default connect(
  null,
  {}
)(Addbrand);
