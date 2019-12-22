import React, { useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 4),
  },
  pointed: {
    textAlign: 'center',
    width: '100%'
  },
  btn: {
    margin: theme.spacing(1)
  }
}));

export default function Pointed({ pointed, stop, setStop }) {
  const classes = useStyles();

  //onClick function using useCallback
  const onClick = useCallback(() => {
    if (stop) {
      setStop(false)
    }
  }, [setStop, stop])

  return (
    <Grid container className={classes.root} direction='column' alignItems="center">
      <Grid item className={classes.pointed}>
        <Typography color="textPrimary" component="h1" variant="h3">
          {pointed}
        </Typography>
        {!stop ? <LinearProgress /> : null}
      </Grid>
      <Grid>
        <Button className={classes.btn} variant="contained" color="primary" disabled={stop ? false : true} onClick={() => onClick()}>{'開始'}</Button>
      </Grid>
    </Grid>
  );
}