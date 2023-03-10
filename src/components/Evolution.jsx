import React from "react";
import Grid from "@mui/material/Grid";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";

const Evolution = (props) => {
  const { dataEvolution, index, setEvoI, evoI } = props;
  const [firstDetails, setFirstDetails] = useState();
  const [evoDetails, setEvoDetails] = useState();
  const [evoDetailsLast, setEvoDetailsLast] = useState();

  const firstName = dataEvolution?.chain.species.name;
  const firstImage =
    firstDetails?.sprites.other["official-artwork"].front_default;

  const evolutionName = dataEvolution?.chain.evolves_to[0]?.species.name;
  const evolutionPic =
    evoDetails?.sprites.other["official-artwork"].front_default;

  const lastEvolutionName =
    dataEvolution?.chain.evolves_to[0].evolves_to[0]?.species.name;

  const lastEvolutionPic =
    evoDetailsLast?.sprites.other["official-artwork"].front_default;

  const getApiImageEvolution = async (name) => {
    const request = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await request.json();
    return data;
  };

  const checkEvoIndex = () => {
    const evolutionUrl = dataEvolution?.chain?.evolves_to[0]?.species?.url;
    const regex = /\/([^/]+)\/?$/;
    const secondE = regex.exec(evolutionUrl);
    console.log(index);
    if (dataEvolution && !lastEvolutionName && index === Number(secondE[1])) {
      setEvoI(Math.floor(index / 2));
      console.log("entra " + index, evoI);
    }
  };

  useEffect(() => {
    if (firstName) {
      getApiImageEvolution(firstName)
        .then((data) => {
          setFirstDetails(data);
        })
        .catch((err) => {
          console.log("getAPI", err);
        });
    }
    if (evolutionName) {
      getApiImageEvolution(evolutionName)
        .then((data) => {
          setEvoDetails(data);
          checkEvoIndex();
        })
        .catch((err) => {
          console.log("getAPI", err);
        });
    }

    if (lastEvolutionName) {
      getApiImageEvolution(lastEvolutionName)
        .then((data) => {
          setEvoDetailsLast(data);
        })
        .catch((err) => {
          console.log("getLast", err);
        });
    }
  }, [dataEvolution]);

  return (
    <div className="evChainBlock">
      <Typography gutterBottom mb={2} variant="h6" component="div">
        Evolution Chain
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={lastEvolutionName ? 4 : 6}>
          <ImageListItem>
            <img
              src={firstImage}
              alt={firstName}
              loading="lazy"
              className="imgEvolution"
            />
            <ImageListItemBar title={firstName} position="below" />
          </ImageListItem>
        </Grid>
        <Grid item xs={lastEvolutionName ? 4 : 6}>
          <ImageListItem key={"item.img"}>
            <img
              src={evolutionPic}
              alt={evolutionName}
              loading="lazy"
              className="imgEvolution"
            />
            <ImageListItemBar title={evolutionName} position="below" />
          </ImageListItem>
        </Grid>

        {lastEvolutionName && (
          <Grid item xs={4}>
            <ImageListItem key={"item.img"}>
              <img
                src={lastEvolutionPic}
                alt={lastEvolutionPic}
                loading="lazy"
                className="imgEvolution"
              />
              <ImageListItemBar title={lastEvolutionName} position="below" />
            </ImageListItem>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Evolution;
