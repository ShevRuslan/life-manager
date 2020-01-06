import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Login from '../login';
import Register from '../register';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';
import './App.css';

const useStyles = makeStyles({
  card: {
    minWidth: 800,
    textAlign: 'center',
    padding: 0,
    height: 450
  },
  cardContent: {
    padding: '0 !important',
    height: '100%'
  },
  fragment: {
    width: '50%'
  },
  arrow: {
    transition: 'transform .2s ease-in-out'
  },
  deg180: {
    transform: 'rotate(180deg)'
  },
  deg0: {
    transform: 'rotate(0deg)'
  },
  media: {
    height: '100%'
  },
  content: {
    padding: 15,
    height: '100%'
  }
});

const App = () => {
  const { card, fragment, arrow, deg180, deg0, media, cardContent, content } = useStyles();
  const [showAuth, setShowAuth] = useState(true);
  const changeForm = () => {
    setShowAuth(!showAuth);
  };
  let form = showAuth ? <Login /> : <Register />;
  return (
    <Grid container justify="center" alignItems="center" style={{ height: '100%' }}>
      <Card className={card}>
        <CardContent className={cardContent}>
          <Grid container direction="row" style={{ height: '100%' }} justify="space-between">
            <div className={fragment}>
              <Grid container direction="column" className={content} justify="space-between">
                <Grid container direction="row" justify="flex-end">
                  <IconButton onClick={changeForm} size="small">
                    <ArrowForwardIcon fontSize="medium" className={arrow + ' ' + (showAuth ? deg0 : deg180)}></ArrowForwardIcon>
                  </IconButton>
                </Grid>
                <Grid container direction="row" justify="space-between" style={{ flexGrow: 1 }}  >
                  {form}
                </Grid>
              </Grid>
            </div>
            <div className={fragment}>
              <CardMedia
                className={media}
                image="http://wp.widewallpapers.ru/2k/nature/mountains/1920x1080/mountains-1920x1080-006.jpg"
                title="Mountain"
              />
            </div>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default App;
