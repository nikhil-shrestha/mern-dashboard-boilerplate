import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import { Grid, Button } from '@material-ui/core';

import { SearchInput } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  gridButton: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const UsersToolbar = props => {
  const { className, modalOpen, ...rest } = props;

  const classes = useStyles();

  return (
    <Grid {...rest} className={classnames(classes.root, className)}>
      <Grid container spacing={4}>
        <Grid item lg={4} md={6} xl={4} xs={12}>
          <SearchInput
            className={classes.searchInput}
            placeholder="Search user"
          />
        </Grid>
        <Grid item lg={8} md={6} xl={8} xs={12} className={classes.gridButton}>
          <span className={classes.spacer} />
          <Button color="primary" variant="contained" onClick={modalOpen}>
            Add user
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string,
  modalOpen: PropTypes.func
};

export default UsersToolbar;
