import React from "react";
import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import uuid from "react-uuid";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

const Stats = (props) => {
  const { dataPokemon } = props;

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "90%", mr: 3 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body1" color="text.primary">{`${Math.round(
            props.value
          )}`}</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Grid item xs={12} md={6}>
      <List className="statsBlock">
        <Typography
          sx={{ mt: 1, mb: 2 }}
          align="center"
          variant="h6"
          component="div"
        >
          Stats
        </Typography>
        {dataPokemon &&
          dataPokemon.stats.map((item) => (
            <ListItem key={uuid()}>
              <ListItemText primary={item.stat.name} />
              <Box sx={{ width: "80%" }}>
                <LinearProgressWithLabel
                  className="statLine"
                  value={item.base_stat}
                />
              </Box>
            </ListItem>
          ))}
      </List>
    </Grid>
  );
};

export default Stats;
