import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Login from "../login";
import Register from "../register";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    minWidth: 600,
    textAlign: "center",
    paddingBottom: 12
  }
});

const App = () => {
  const { card } = useStyles();

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ height: "100%" }}
    >
      <Card className={card}>
        <CardContent>
          <Grid
            container
            direction="row"
            justify="space-between"
            style={{ height: "100%" }}
          >
            <Login />
            <Register />
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default App;
