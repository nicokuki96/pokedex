import React from "react";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const Pokemon = (props) => {
  const { dataPokemon, setIndex, index, data } = props;
  return (
    <div className="pokemonBlock">
      <p className="pokemonTitle">{dataPokemon && dataPokemon.name}</p>
      <img
        className="imgMain"
        src={
          dataPokemon &&
          `${dataPokemon.sprites.other["official-artwork"].front_default}`
        }
        alt={dataPokemon && dataPokemon.name}
        loading="lazy"
      />
      <div className="arrowsBlock">
        <Button
          onClick={index > 1 && (() => setIndex(index - 1))}
          size="small"
          variant="contained"
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </Button>
        <div className="indexBlock">{index}</div>
        <Button
          onClick={() => setIndex(index + 1)}
          size="small"
          variant="contained"
        >
          <ArrowForwardIosIcon fontSize="small" />
        </Button>
      </div>
    </div>
  );
};

export default Pokemon;
