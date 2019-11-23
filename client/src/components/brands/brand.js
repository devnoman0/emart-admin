import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../spinner";
import { getAllBrands, addBrand } from "../../actions/brandaction";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import TextField from "@material-ui/core/TextField";
import Brandtable from "./table";
import Pageheader from "../pageheader";
import CircularProgress from "@material-ui/core/CircularProgress";

class Brand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      open: false,
      name: "",
      metatitle: "",
      metadescription: "",
      errors: {}
    };
    this.formsubmit = this.formsubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.workImageBtn = this.workImageBtn.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    this.props.getAllBrands();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.errors.errors && !nextProps.brand.addBrandBtnLoading) {
      this.setState({
        file: "",
        name: "",
        metatitle: "",
        metadescription: ""
      });
      this.handleClose();
    }
    if (nextProps.errors.errors) {
      this.setState({ errors: nextProps.errors.errors });
    }
  }

  componentDidUpdate() {}

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  onChange = e => {
    this.setState({ file: e.target.files[0] });
  };
  formsubmit(ev) {
    ev.preventDefault();
    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("iconimage", this.state.file);
    formData.append("metaTitle", this.state.metatitle);
    formData.append("description", this.state.metadescription);
    this.props.addBrand(formData);
  }

  handleformfiled = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  workImageBtn = () => {
    const imageField = document.getElementById("imageinput");
    imageField.click();
  };

  render() {
    const { brands } = this.props.brand;
    return (
      <div>
        {this.props.brand.brandsLoading === true || brands === null ? (
          <Spinner />
        ) : (
          <div>
            <Pageheader
              color="linear-gradient(to right, rgb(239, 108, 0), rgb(251, 140, 0))"
              pagetitle="Brands"
              pagetext="Store and retrieve user-generated files like images, audio, and video without server-side code"
              buttontext="Add  Brands"
              handleClickOpen={this.handleClickOpen}
            />
            <Dialog
              maxWidth="sm"
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle
                id="alert-dialog-title"
                style={{ background: "#1a73e8", color: "white" }}
              >
                {"Fill the form to add a brand"}
              </DialogTitle>
              <DialogContent>
                <form
                  noValidate
                  autoComplete="off"
                  onSubmit={this.formsubmit}
                  style={{ padding: "24px 35px 10px 30px" }}
                >
                  <TextField
                    error={this.state.errors.nameError ? true : false}
                    label="Brand Name"
                    name="name"
                    fullWidth
                    style={{ marginBottom: 20 }}
                    id="outlined-margin-dense"
                    defaultValue={this.state.name}
                    helperText={this.state.errors.nameError}
                    onChange={this.handleformfiled}
                    className="textField"
                    margin="dense"
                    variant="outlined"
                  />
                  <input
                    type="file"
                    onChange={this.onChange}
                    id="imageinput"
                    hidden="hidden"
                  />

                  {this.state.errors.iconimageError ? (
                    <Typography style={{ color: "red", marginBottom: 10 }}>
                      {this.state.errors.iconimageError}
                    </Typography>
                  ) : (
                    <Typography style={{ marginBottom: 10 }}>
                      Upload Brand Icon
                    </Typography>
                  )}

                  <Button
                    variant="contained"
                    color="primary"
                    className="button"
                    startIcon={<CloudUploadIcon />}
                    style={{ marginBottom: 20 }}
                    onClick={this.workImageBtn}
                  >
                    Choose File
                  </Button>

                  <TextField
                    error={this.state.errors.metaTitleError ? true : false}
                    fullWidth
                    id="outlined-margin-dense"
                    label="Meta Title"
                    helperText={this.state.errors.metaTitleError}
                    name="metatitle"
                    multiline
                    rows="3"
                    defaultValue={this.state.metatitle}
                    onChange={this.handleformfiled}
                    className="textField"
                    style={{ marginBottom: 20 }}
                    margin="dense"
                    variant="outlined"
                  />
                  <TextField
                    error={this.state.errors.descriptionError ? true : false}
                    fullWidth
                    id="outlined-margin-dense"
                    label="Meta Description"
                    helperText={this.state.errors.descriptionError}
                    name="metadescription"
                    multiline
                    rows="4"
                    defaultValue={this.state.metadescription}
                    onChange={this.handleformfiled}
                    className="textField"
                    style={{ marginBottom: 20 }}
                    margin="dense"
                    variant="outlined"
                  />

                  <Button
                    onClick={this.formsubmit}
                    variant="contained"
                    color="secondary"
                    className="button"
                    style={{
                      float: "right",
                      marginLeft: 10,
                      position: "relative"
                    }}
                    disabled={this.props.brand.addBrandBtnLoading}
                  >
                    Add Brand
                    {this.props.brand.addBrandBtnLoading && (
                      <CircularProgress
                        size={25}
                        color="secondary"
                        style={{ position: "absolute", left: "50%" }}
                      />
                    )}
                  </Button>
                  <Button
                    onClick={this.handleClose}
                    variant="contained"
                    color="primary"
                    className="button"
                    style={{ float: "right", marginLeft: 10 }}
                  >
                    Cancel
                  </Button>
                </form>
              </DialogContent>
              <DialogActions></DialogActions>
            </Dialog>
            <Brandtable tabledata={brands} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  brand: state.brand
});

export default withRouter(
  connect(mapStateToProps, { getAllBrands, addBrand })(Brand)
);
