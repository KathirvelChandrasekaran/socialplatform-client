import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";


import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
}));
const Screams = ({ scream }) => {
  const classes = useStyles();
  dayjs.extend(relativeTime)
  return (
    <Card className={classes.card} key={scream.screamId}>
      <CardMedia
        image={scream.userImage}
        className={classes.image}
        title="Profile Image"
      ></CardMedia>
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${scream.userHandle}`}
          color="primary"
        >
          {scream.userHandle}
        </Typography>
        <Typography variant="body2" color="secondary">
          {dayjs(scream.createdAt).fromNow()}
        </Typography>
        <Typography variant="body1" color="secondary">
          {scream.body}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Screams;
