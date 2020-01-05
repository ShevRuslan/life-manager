import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Login from '../login'
import "./App.css";

//TODO:Убрать стили
class App extends Component {
  render() {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{height: '100%'}}
      >
        <Login/>
      </Grid>
    );
  }
}

export default App;
