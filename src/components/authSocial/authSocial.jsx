import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import useStyles from './styles';

const AuthSocial = () => {
  const { social, github, youtube, facebook, linkedid, socialIcon } = useStyles();
  return (
    <div className="auth-social">
      <Grid container direction="row" justify="flex-start">
        <IconButton className={`${social} ${github}`}>
          <GitHubIcon fontSize="small" className={socialIcon}></GitHubIcon>
        </IconButton>
        <IconButton className={`${social} ${facebook}`}>
          <FacebookIcon fontSize="small" className={socialIcon}></FacebookIcon>
        </IconButton>
        <IconButton className={`${social} ${youtube}`}>
          <YouTubeIcon fontSize="small" className={socialIcon}></YouTubeIcon>
        </IconButton>
        <IconButton className={`${social} ${linkedid}`}>
          <LinkedInIcon fontSize="small" className={socialIcon}></LinkedInIcon>
        </IconButton>
      </Grid>
    </div>
  );
};

export default AuthSocial;
