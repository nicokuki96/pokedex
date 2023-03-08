import './App.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Pokemon from './components/Pokemon';
import { useEffect, useState } from 'react';
import Evolution from './components/Evolution';
import Details from './components/Details';
import Stats from './components/Stats';
import { useColor, usePalette  } from "color-thief-react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function App() {
  const [index ,setIndex] = useState(1)
  const [dataPokemon ,setDataPokemon] = useState()
  const [dataEvolution ,setDataEvolution] = useState()

  const getApiPokemon = async () => {
    const request = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
    const data = await request.json()
    setDataPokemon(data)
  }

  const getApiEvolution = async () => {
    const request = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${index}/`)
    const data = await request.json()
    setDataEvolution(data)
    console.log(data)
  }

  // Thief color library
  const { data } = usePalette(dataPokemon &&
    `${dataPokemon?.sprites?.other["official-artwork"]?.front_default}`, 2, "hex", { crossOrigin: "cross-origin", quality: 10})
  
  useEffect(() => {
    getApiPokemon()
    getApiEvolution()
    console.log(mystyle)
  },[index])

  const mystyle = {
    background: `linear-gradient(${data && data[0]}, ${data && data[1]})`,
  };

  return (
    <div className="App">
     <Box className="mainBlock" sx={{ flexGrow: 1 }}>
      <Grid style={mystyle} container spacing={1}>
        <Grid xs={12} md={4}>
            <Pokemon data={data} index={index} setIndex={setIndex} dataPokemon={dataPokemon}/>
        </Grid>
        <Grid xs={12} md={8}>
          <Stats dataPokemon={dataPokemon}/>
        </Grid>
        <Grid xs={12} md={6}>
          <Details Item={Item} dataPokemon={dataPokemon}/>
        </Grid>
        <Grid xs={12} md={6}>
          <Evolution dataPokemon={dataPokemon} dataEvolution={dataEvolution}/>
        </Grid>
      </Grid>
      
    </Box>
    </div>
  );
}

export default App;
