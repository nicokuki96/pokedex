import { React, useState } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import uuid from "react-uuid";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

const Details = (props) => {
  const { dataPokemon } = props;
  const [deatailMove, setDetailMove] = useState();

  const moveDetail = async (move) => {
    const request = await fetch(`https://pokeapi.co/api/v2/move/${move}`);
    const data = await request.json();
    setDetailMove(data);
    console.log(data);
  };

  const [stateSideBar, setStateSideBar] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setStateSideBar({ ...stateSideBar, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography gutterBottom variant="h6" mt={2} component="div">
        {`Move: ${deatailMove && deatailMove.name}`}
      </Typography>
    </Box>
  );

  return (
    <Grid className="detailsBlock" container>
      <Grid>
        <CardContent>
          <div className="firstDetailC">
            <Typography gutterBottom variant="h6" component="div">
              Details
            </Typography>
            <Typography gutterBottom variant="body2" mt={2} component="div">
              {`Base experience: ${dataPokemon && dataPokemon.base_experience}`}
            </Typography>
            <Typography gutterBottom variant="body2" mt={1} component="div">
              {`Weight: ${dataPokemon && dataPokemon.weight}`}
            </Typography>
            <Typography gutterBottom variant="body2" mt={1} component="div">
              Types
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {dataPokemon &&
                dataPokemon.types.map((item) => (
                  <span key={uuid()} className="details">
                    {item.type.name}
                  </span>
                ))}
            </Typography>
          </div>
        </CardContent>
      </Grid>
      <Grid>
        <CardContent>
          <div className="secondDetailC">
            <Typography gutterBottom variant="h6" component="div">
              Moves
            </Typography>
            {dataPokemon &&
              dataPokemon.moves.slice(0, 10).map((item) => (
                <div className="secondMoves" key={uuid()}>
                  <Button
                    className="details"
                    onClick={
                      (() => moveDetail(item.move.name),
                      toggleDrawer("right", true))
                    }
                  >
                    {item.move.name}
                  </Button>
                  <Drawer
                    anchor={"right"}
                    open={stateSideBar["right"]}
                    onClose={toggleDrawer("right", false)}
                  >
                    {list("right")}
                  </Drawer>
                </div>
              ))}
          </div>
        </CardContent>
      </Grid>
    </Grid>
  );
};

export default Details;
