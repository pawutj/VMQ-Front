import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

export default function SoundSlider({ value, handleChange }) {
  const classes = useStyles();

  return (
    <div style={{ width: 300 }}>
      <Slider
        value={value}
        onChange={handleChange}
        aria-labelledby="continuous-slider"
      />
    </div>
  );
}
