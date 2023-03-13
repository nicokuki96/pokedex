import { React, useState } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import uuid from "react-uuid";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import AdjustIcon from "@mui/icons-material/Adjust";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import BoltIcon from "@mui/icons-material/Bolt";
import AppsIcon from "@mui/icons-material/Apps";

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
      <Typography ml={2} gutterBottom variant="h6" mt={2} component="div">
        {`Move: ${deatailMove && deatailMove.name}`}
      </Typography>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AdjustIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Accuracy"
            secondary={deatailMove && deatailMove.accuracy}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AppsIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="PP"
            secondary={deatailMove && deatailMove.pp}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PriorityHighIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Priority"
            secondary={deatailMove && deatailMove.priority}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <BoltIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Power"
            secondary={deatailMove && deatailMove.power}
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Grid className="detailsBlock" container>
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

      <CardContent className="cardDetailC">
        <div className="secondDetailC">
          <Typography gutterBottom variant="h6" component="div">
            Moves
          </Typography>
          {dataPokemon &&
            dataPokemon.moves.slice(0, 7).map((item) => (
              <div
                onClick={() => moveDetail(item.move.name)}
                className="secondMoves"
                key={uuid()}
              >
                <Button
                  size="small"
                  variant="contained"
                  className="detailsMoves"
                  onClick={toggleDrawer("right", true)}
                >
                  {item.move.name}
                </Button>
              </div>
            ))}
          <Drawer
            anchor={"right"}
            open={stateSideBar["right"]}
            onClose={toggleDrawer("right", false)}
          >
            {list("right")}
          </Drawer>
        </div>
      </CardContent>
    </Grid>
  );
};

export default Details;
