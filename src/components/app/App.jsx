import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Login from '../login';
import AuthSocial from '../authSocial';
import Register from '../register';
import CardMedia from '@material-ui/core/CardMedia';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
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
    width: '50%',
    height: '100%'
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
  },
  height: {
    height: '100%'
  }
});

const App = () => {
  const { card, fragment, arrow, deg180, deg0, media, cardContent, content, height } = useStyles();
  const [showAuth, setShowAuth] = useState(false);
  const [display, setDisplay] = useState('block');
  const [opacity, setOpacity] = useState(1);
  const [displayElem, setDisplayElem] = useState('none');
  const [opacityElem, setOpacityElem] = useState(0);
  const myRef = React.createRef();
  const myRefElem = React.createRef();

  const changeForm = () => {
    setShowAuth(!showAuth);
    if (display == 'block') {
      setOpacity(0);
      myRef.current.addEventListener('transitionend', () => {
        setDisplay('none');
        setDisplayElem('block');
        setOpacityElem(0);
        setTimeout(() => {
          setOpacityElem(1);
        }, 0);
      }, { once: true });
    }
    else if (display == 'none') {
      setOpacityElem(0);
      myRefElem.current.addEventListener('transitionend', () => {
        setDisplayElem('none');
        setDisplay('block');
        setOpacity(0);
        setTimeout(() => {
          setOpacity(1);
        }, 0);
      }, { once: true });
    }
  };

  return (
    <Grid container justify="center" alignItems="center" className={height}>
      <Card className={card} variant="outlined">
        <CardContent className={cardContent}>
          <Grid container direction="row-reverse" className={height} justify="space-between">
            <div className={fragment}>
              <Grid container direction="column" className={content} justify="space-between">
                <Grid container direction="row" justify="flex-end">
                  <IconButton onClick={changeForm} size="small">
                    <ArrowForwardIcon className={arrow + ' ' + (showAuth ? deg180 : deg0)}></ArrowForwardIcon>
                  </IconButton>
                </Grid>
                <Grid container direction="row" justify="space-between" style={{ flexGrow: 1 }}>
                  <div
                    style={{
                      transition: 'all .5s linear',
                      display: display,
                      opacity: opacity,
                      width: '100%'
                    }}
                    ref={myRef}
                  >
                    <Login></Login>
                  </div>
                  <div
                    style={{
                      transition: 'all .5s linear',
                      display: displayElem,
                      opacity: opacityElem,
                    }}
                    ref={myRefElem}
                  >
                    <Register></Register>
                  </div>
                </Grid>
                <AuthSocial />
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
