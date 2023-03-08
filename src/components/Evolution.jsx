import React from "react";
import Grid from "@mui/material/Grid";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";

const Evolution = (props) => {
  const { dataEvolution, dataPokemon } = props;
  const evolution = dataEvolution?.chain.evolves_to[0].species.name;
  //   const lastEvolution = dataEvolution?.chain.evolves_to[0].evolves_to[0].species.name;
  const current = dataEvolution?.chain.species.name;
  const currImage = `${dataPokemon?.sprites.other["official-artwork"].front_default}`;
  if (!currImage) return;
  if (!evolution) return;
  //   if (!lastEvolution) return;
  if (!current) return;
  return (
    <div className="evChainBlock">
      <Typography gutterBottom variant="h6" component="div">
        Evolution Chain
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <ImageListItem>
            <img
              src={currImage}
              srcSet={currImage}
              alt={current}
              loading="lazy"
              className="imgEvolution"
            />
            <ImageListItemBar
              title={current}
              subtitle={<span>Code: {"item.author"}</span>}
              position="below"
            />
          </ImageListItem>
        </Grid>
        <Grid item xs={4}>
          <ImageListItem key={"item.img"}>
            <img
              src={currImage}
              srcSet={currImage}
              alt={evolution}
              loading="lazy"
              className="imgEvolution"
            />
            <ImageListItemBar
              title={evolution}
              subtitle={<span>Code: {"item.author"}</span>}
              position="below"
            />
          </ImageListItem>
        </Grid>
        <Grid item xs={4}>
          <ImageListItem key={"item.img"}>
            <img
              src={currImage}
              srcSet={currImage}
              alt={"lastEvolution"}
              loading="lazy"
              className="imgEvolution"
            />
            <ImageListItemBar
              title={"lastEvolution"}
              subtitle={<span>Code: {"item.author"}</span>}
              position="below"
            />
          </ImageListItem>
        </Grid>
      </Grid>
    </div>
  );
};

export default Evolution;
