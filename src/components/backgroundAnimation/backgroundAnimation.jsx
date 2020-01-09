import React from 'react';
import Particles from 'react-particles-js';
import { makeStyles } from '@material-ui/core/styles';
import particlesConfig from './particlesjs-config.json';

const useStyles = makeStyles({
  wrapper: {
    height: '100%',
    width: '100%'
  }
});

const BackgroundAnimation = () => {
  const { wrapper } = useStyles();
  return (
    <Particles
      className={wrapper}
      width="100%"
      height="100%"
      params={particlesConfig}
    />
  );
};

export default BackgroundAnimation;
