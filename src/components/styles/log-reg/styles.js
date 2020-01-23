import { makeStyles } from "@material-ui/core/styles";
import { green } from '@material-ui/core/colors';

export default makeStyles({
  form: {
    width: "100%"
  },
  input: {
    width: '100%',
    marginTop: '15px !important'
  },
  typography: {
    marginBottom: 15,
  },
  adjacentElement: {
    width: '49%'
  },
  grid: {
    height:'100%'
  },
  wrapperLink: {
    width: '100%',
    textAlign: 'left' 
  },
  link: {
    color: '#000',
    fontSize: 12,
  },
  register: {
    width: '100%'
  },
  wrapper: {
    width: '100%',
    marginTop: '15px',
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  buttomSubmit: {
    width: '100%'
  },

});