import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import Pointed from './Pointed';
import Attendees from './Attendees';
import {classmates} from './classmates'

const useStyles = makeStyles(theme => ({
  root: {
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
}));

export default function App() {
  const classes = useStyles();
  const [pointedIndex, setPointedIndex] = React.useState(0);
  //if using list won't re-render,should use str
  const [attendees, setAttendees] = React.useState(JSON.stringify(classmates));
  const [stop, setStop] = React.useState(true);

  React.useEffect(() => {
    const unSort = JSON.parse(attendees);
    unSort.sort((a, b) => a.time - b.time)
    setAttendees(JSON.stringify(unSort))
    return
  }, [attendees, setAttendees])

  return (
    <Container maxWidth="sm">
      <Box my={12} className={classes.root}>
        <Typography className={classes.title} variant="h4" component="h1" gutterBottom>
          抽抽抽
        </Typography>
        <Pointed attendeesStr={attendees} setAttendeesStr={attendees => setAttendees(attendees)} pointed={JSON.parse(attendees)[pointedIndex].name} stop={stop} setStop={boolean => setStop(boolean)} />
        <Attendees attendeesStr={attendees} setAttendeesStr={attendees => setAttendees(attendees)} isStop={stop} setIsStop={(boolean) => setStop(boolean)} pointedIndex={pointedIndex} setPointedIndex={index => setPointedIndex(index)} />
      </Box>
    </Container>
  );
}
