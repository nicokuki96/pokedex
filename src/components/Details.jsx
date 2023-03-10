import React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import uuid from "react-uuid";
import Grid from "@mui/material/Grid";

const Details = (props) => {
  const { dataPokemon } = props;
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
            <Typography variant="body2" color="text.secondary">
              {dataPokemon &&
                dataPokemon.moves.slice(0, 10).map((item) => (
                  <span key={uuid()} className="details">
                    {item.move.name}
                  </span>
                ))}
            </Typography>
          </div>
        </CardContent>
      </Grid>
    </Grid>
  );
};

export default Details;
