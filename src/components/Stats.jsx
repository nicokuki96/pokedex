import React from "react";
import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import uuid from "react-uuid";
import Box from "@mui/material/Box";
import ProgressBar from "@ramonak/react-progress-bar";

const Stats = (props) => {
  const { dataPokemon } = props;

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
            <ListItem className="statsName" key={uuid()}>
              <ListItemText primary={item.stat.name} />
              <Box className="progressStats" sx={{ width: "80%" }}>
                <ProgressBar
                  completed={item.base_stat.toString()}
                  maxCompleted={150}
                  customLabel={" "}
                  height={"10px"}
                  bgColor={"#1976D2"}
                  baseBgColor={"#7E7D7A"}
                />
              </Box>
              <Box className="numberStat" sx={{ minWidth: 35 }}>
                <Typography
                  align="center"
                  ml={2}
                  variant="h7"
                  color="text.primary"
                >
                  {item.base_stat}
                </Typography>
              </Box>
            </ListItem>
          ))}
      </List>
    </Grid>
  );
};

export default Stats;
