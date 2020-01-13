import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Toolbar,
  Badge,
  Hidden,
  IconButton,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import TodayIcon from '@material-ui/icons/Today';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  title: {
    color: '#fff',
    flexGrow: 1,
    paddingLeft: '4rem'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  const [notifications] = useState([]);

  return (
    <AppBar {...rest} className={classnames(classes.root, className)}>
      <Toolbar>
        <RouterLink to="/">
          <Typography variant="h3" className={classes.title}>
            Admin
          </Typography>
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <TodayIcon />
            <Typography variant="h5" style={{ color: 'white' }}>
              {moment().format('YYYY-MM-DD')}
            </Typography>
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
