import './App.css';
import Grid from '@mui/material/Unstable_Grid2';
import Pokemon from './components/Pokemon';
import { useEffect, useState } from 'react';
import Evolution from './components/Evolution';
import Details from './components/Details';
import Stats from './components/Stats';
import { usePalette } from "color-thief-react";

function App() {
  const [index ,setIndex] = useState(1)
  const [dataPokemon ,setDataPokemon] = useState()
  const [dataEvolution ,setDataEvolution] = useState()
  const [evoI, setEvoI] = useState();

  const getApiPokemon = async () => {
    const request = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
    const data = await request.json()
    setDataPokemon(data)
  }
  const getApiEvolution = async () => {
    let evo = Math.ceil(index/3)
    const request = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${evo}/`)
    const data = await request.json()
    setDataEvolution(data)
  }

  // Thief color library
  const { data } = usePalette(dataPokemon &&
    dataPokemon?.sprites?.other["official-artwork"]?.front_default, 2, "hex", { crossOrigin: "cross-origin", quality: 10})
  
  useEffect(() => {
    getApiPokemon()
    getApiEvolution()
  },[index])

  const mystyle = {
    background: `linear-gradient(${data && data[0]}, ${data && data[1]})`,
  };

  return (
    <div className="App">
      <Grid className="mainBlock" style={mystyle} container spacing={1}>
        <Grid xs={12} md={4}>
            <Pokemon data={data} index={index} setIndex={setIndex} dataPokemon={dataPokemon}/>
        </Grid>
        <Grid xs={12} md={8}>
          <Stats dataPokemon={dataPokemon}/>
        </Grid>
        <Grid xs={12} md={6}>
          <Details dataPokemon={dataPokemon}/>
        </Grid>
        <Grid xs={12} md={6}>
          <Evolution setEvoI={setEvoI} evoI={evoI} index={index} setIndex={setIndex} dataEvolution={dataEvolution}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
