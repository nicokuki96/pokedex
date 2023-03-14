import React from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const Evolution = (props) => {
  const { dataEvolution, dataPokemon } = props;
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataEvolution]);

  const selectedPoke = () => {
    if (firstName === dataPokemon?.name) {
      return 1;
    }
    if (evolutionName === dataPokemon?.name) {
      return 2;
    }
    if (lastEvolutionName === dataPokemon?.name) {
      return 3;
    }
  };

  return (
    <div className="evChainBlock">
      <Typography gutterBottom mb={2} variant="h6" component="div">
        Evolution Chain
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Stepper
          className="selected"
          activeStep={selectedPoke()}
          alternativeLabel
        >
          <Step>
            <StepLabel>
              <ImageListItem>
                <img
                  src={firstImage}
                  alt={firstName}
                  loading="lazy"
                  className="imgEvolution"
                />
                <ImageListItemBar title={firstName} position="below" />
              </ImageListItem>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              <ImageListItem>
                <img
                  src={evolutionPic}
                  alt={evolutionName}
                  loading="lazy"
                  className="imgEvolution"
                />
                <ImageListItemBar title={evolutionName} position="below" />
              </ImageListItem>
            </StepLabel>
          </Step>
          {/* si lo pongo con && tira un warning */}
          <Step className={!lastEvolutionName ? "hideBlock" : ""}>
            <StepLabel>
              <ImageListItem>
                <img
                  src={lastEvolutionPic}
                  alt={lastEvolutionPic}
                  loading="lazy"
                  className="imgEvolution"
                />
                <ImageListItemBar title={lastEvolutionName} position="below" />
              </ImageListItem>
            </StepLabel>
          </Step>
        </Stepper>
      </Box>
    </div>
  );
};

export default Evolution;
