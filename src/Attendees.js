import React, { useCallback } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles';
import { useSpring } from 'react-spring';

let date = new Date('2019/07/28').getTime();

const useStyles = makeStyles(theme => ({
  root: {
  },
  paper: {
    padding: theme.spacing(1)
  },
  absent: {
    color: 'grey'
  },
  pointed: {
    backgroundColor: "red",
    color: 'black'
  }
}));

export default function Attendees({ attendeesStr, setAttendeesStr, isStop, setIsStop, pointedIndex, setPointedIndex }) {
  const [aniNumber, setAniNumber] = React.useState(pointedIndex);
  const attendees = JSON.parse(attendeesStr);
  const classes = useStyles();

  const [props, set, stop] = useSpring(() => ({
    from: { number: 0 },
    onFrame: ({ number }) => {
      setAniNumber(number);
    },
    onRest: (() => {
      setIsStop(true)
    })
  }));

  React.useEffect(() => {
    if (!isStop) {
      const number = Math.random() * 27 + 27 + aniNumber;
      set({ number, config: { mass: 1, tension: 200, friction: 200 } })
    } else {
      stop()
    }
  }, [isStop]);

  React.useEffect(() => {
    const index = Math.floor(aniNumber % attendees.length);
    setPointedIndex(index)
  }, [isStop, aniNumber])

  //event handlers
  const onClick = useCallback((index) => {
    const newData = attendees;
    newData[index].time = new Date().getTime();
    newData[index].hovered = false;
    setAttendeesStr(JSON.stringify(newData));
  }, [attendees, setAttendeesStr])
  const onMouseEnter = React.useCallback((index) => {
    if (isStop) {
      const newData = attendees;
      newData[index].hovered = true;
      setAttendeesStr(JSON.stringify(newData))
    }
  }, [setAttendeesStr])
  const onMouseLeave = React.useCallback((index) => {
    if (isStop) {
      const newData = attendees;
      newData[index].hovered = false;
      setAttendeesStr(JSON.stringify(newData))
    }
  }, [attendeesStr])

  return <Grid container spacing={2} className={classes.root}>
    {attendees.map(({ name, time, hovered }, index) => (
      <Grid item key={`${name}${time}`}>
        <Paper
          className={`${classes.paper} ${date === time ? classes.absent : ''} ${Math.floor(aniNumber % attendees.length) === index ? classes.pointed : ''}`}
          elevation={hovered ? 5 : 1}
          onMouseEnter={onMouseEnter.bind(this, index)}
          onMouseLeave={onMouseLeave.bind(this, index)}
        onClick={new Date('2019/07/28').getTime() === time ? onClick.bind(this,index) : null}>
          <Typography variant="h6" component="h3">
          {name}
        </Typography>
        <Typography component="p">
          {date === time ? '尚未到達' : moment(time).format('HH:mm:ss')}
        </Typography>
        </Paper>
      </Grid>
))}
  </Grid>
}
