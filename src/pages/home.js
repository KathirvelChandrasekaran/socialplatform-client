import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import Screams from "../components/screams";

import { GetScreamContext } from "../context/getScreams";

const Home = () => {
  const [screams] = useContext(GetScreamContext);
  const recentScreamMarkup = screams ? (
    screams.map((scream) => (
      <Screams scream={scream} key={scream.screamId}></Screams>
    ))
  ) : (
    <p>Loading...</p>
  );
  return (
    <div>
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentScreamMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile</p>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
