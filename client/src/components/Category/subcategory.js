import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllSubCategory } from "../../actions/categoryAction";
import SubCategorytable from "./subtable";
import Pageheader from "../pageheader";
import Spinner from "../spinner";

class SubCategory extends Component {
  componentDidMount() {
    this.props.getAllSubCategory();
  }

  render() {
    const { subcategories } = this.props.categories;
    return (
      <div>
        {this.props.categories.categoriesLoading === true ||
        subcategories === null ? (
          <Spinner />
        ) : (
          <div>
            <Pageheader
              color="linear-gradient(to right, rgb(0, 151, 167), rgb(0, 172, 193))"
              pagetitle="Sub Categories"
              pagetext="Store and retrieve user-generated files like images, audio, and video without server-side code"
              buttontext="Add Sub Category"
            />
            <SubCategorytable tabledata={subcategories} />
          </div>
        )}
      </div>
    );
  }
}
SubCategory.propTypes = {
  getAllSubCategory: PropTypes.func.isRequired,
  categories: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  categories: state.categories
});

export default connect(mapStateToProps, { getAllSubCategory })(SubCategory);
