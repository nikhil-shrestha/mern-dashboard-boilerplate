import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Dialog,
  Grid,
  Button,
  TextField,
  Typography,
  MenuItem
} from '@material-ui/core';

const currencies = [
  {
    value: 'USD',
    label: '$'
  },
  {
    value: 'EUR',
    label: '€'
  },
  {
    value: 'BTC',
    label: '฿'
  },
  {
    value: 'JPY',
    label: '¥'
  }
];

const schema = {
  firstName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  lastName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  },
  policy: {
    presence: { allowEmpty: false, message: 'is required' },
    checked: true
  }
};

const useStyles = makeStyles(theme => ({
  form: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    flexBasis: 500,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  submitButton: {
    margin: theme.spacing(2, 0)
  }
}));

const AddUserModal = props => {
  const { history, modalClose, open } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSignUp = event => {
    event.preventDefault();
    history.push('/');
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;
  return (
    <Dialog
      open={open}
      onClose={modalClose}
      aria-labelledby="form-dialog-title">
      <form className={classes.form} onSubmit={handleSignUp}>
        <Typography className={classes.title} variant="h2">
          Add new user
        </Typography>
        <Grid container spacing={4}>
          <Grid item lg={6} md={6} xl={8} xs={12}>
            <TextField
              className={classes.textField}
              error={hasError('firstName')}
              fullWidth
              helperText={
                hasError('firstName') ? formState.errors.firstName[0] : null
              }
              label="First name"
              name="firstName"
              onChange={handleChange}
              type="text"
              value={formState.values.firstName || ''}
              variant="outlined"
            />
          </Grid>
          <Grid item lg={6} md={6} xl={8} xs={12}>
            <TextField
              className={classes.textField}
              error={hasError('lastName')}
              fullWidth
              helperText={
                hasError('lastName') ? formState.errors.lastName[0] : null
              }
              label="Last name"
              name="lastName"
              onChange={handleChange}
              type="text"
              value={formState.values.lastName || ''}
              variant="outlined"
            />
          </Grid>
        </Grid>

        <TextField
          className={classes.textField}
          error={hasError('email')}
          fullWidth
          helperText={hasError('email') ? formState.errors.email[0] : null}
          label="Email address"
          name="email"
          onChange={handleChange}
          type="text"
          value={formState.values.email || ''}
          variant="outlined"
        />
        <Grid container spacing={4}>
          <Grid item lg={6} md={6} xl={8} xs={12}>
            <TextField
              className={classes.textField}
              error={hasError('department')}
              name="department"
              fullWidth
              helperText={
                hasError('department') ? formState.errors.department[0] : null
              }
              select
              label="Department"
              value={formState.values.department || ''}
              onChange={handleChange}
              variant="outlined">
              {currencies.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item lg={6} md={6} xl={8} xs={12}>
            <TextField
              className={classes.textField}
              error={hasError('designation')}
              name="designation"
              fullWidth
              helperText={
                hasError('designation') ? formState.errors.designation[0] : null
              }
              select
              label="Designation"
              value={formState.values.designation || ''}
              onChange={handleChange}
              variant="outlined">
              {currencies.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <TextField
          className={classes.textField}
          error={hasError('password')}
          fullWidth
          helperText={
            hasError('password') ? formState.errors.password[0] : null
          }
          label="Password"
          name="password"
          onChange={handleChange}
          type="password"
          value={formState.values.password || ''}
          variant="outlined"
        />
        <Button
          className={classes.submitButton}
          color="primary"
          disabled={!formState.isValid}
          fullWidth
          size="large"
          type="submit"
          variant="contained">
          Submit
        </Button>
      </form>
    </Dialog>
  );
};

export default AddUserModal;
