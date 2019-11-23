import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  IconButton
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

const styles = theme => ({
  root: {
    width: "85%",
    margin: "auto",
    marginTop: 20,
    border: "1px solid #d2d0d0"
  },
  tableWrapper: {
    maxHeight: 700,
    overflow: "auto"
  },
  title: {
    flexGrow: 1
  }
});

class Brandtable extends Component {
  state = {
    page: 0,
    rowsPerPage: 10
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: +event.target.value });
    this.setState({ page: 0 });
  };

  render() {
    const { classes } = this.props;

    const columns = [
      { id: "_id", label: "Id", minWidth: 170 },
      { id: "logoUrl", label: "Icon", minWidth: 100 },
      {
        id: "name",
        label: "Name",
        minWidth: 170,
        align: "right",
        format: value => value.toLocaleString()
      },
      {
        id: "Actions",
        label: "actions",
        minWidth: 170,
        align: "right",
        format: value => value.toLocaleString()
      }
    ];
    return (
      <Paper className={classes.root}>
        {/* <div style={{ display: "flex" }}>
          <Typography variant="h6" className={classes.title}>
            All Brand List
          </Typography>
          <Tooltip title="Add New Brand">
            <Link to="/brands/add">
              <IconButton aria-label="Add New Brand">
                <Add />
              </IconButton>
            </Link>
          </Tooltip>
        </div> */}
        <div className={classes.tableWrapper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      fontSize: 14,
                      textTransform: "capitalize"
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.tabledata
                .slice(
                  this.state.page * this.state.rowsPerPage,
                  this.state.page * this.state.rowsPerPage +
                    this.state.rowsPerPage
                )
                .map(row => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row._id}
                      style={{ fontSize: 16, textTransform: "capitalize" }}
                    >
                      <TableCell>{row._id}</TableCell>
                      <TableCell>{row.logoUrl}</TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">
                        <IconButton>
                          <Edit />
                        </IconButton>
                        <IconButton>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={this.props.tabledata.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          backIconButtonProps={{
            "aria-label": "previous page"
          }}
          nextIconButtonProps={{
            "aria-label": "next page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

export default connect(null, {})(withStyles(styles)(Brandtable));
