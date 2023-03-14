import './App.css';
import Grid from '@mui/material/Unstable_Grid2';
import Pokemon from './components/Pokemon';
import { useEffect, useState } from 'react';
import Evolution from './components/Evolution';
import Details from './components/Details';
import Stats from './components/Stats';
import { usePalette } from "color-thief-react";
import Menu from './components/Menu';

function App() {
  const [index ,setIndex] = useState(1)
  const [dataPokemon ,setDataPokemon] = useState()
  const [dataEvolution ,setDataEvolution] = useState()
  const [nextEvolution ,setNextEvolution] = useState([])
  const [indexEvolution ,setIndexEvolution] = useState(1)

  const getApiPokemon = async () => {
    const request = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
    const data = await request.json()
    setDataPokemon(data)
  }
  const getApiEvolution = async () => {
    // let evolutionIndex = Math.ceil(index/3)
    const request = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${indexEvolution}/`)
    const data = await request.json()
    setDataEvolution(data)
    const firstName = dataEvolution?.chain.species.name;
    const evolutionName = dataEvolution?.chain.evolves_to[0]?.species.name;
    const lastEvolutionName = dataEvolution?.chain.evolves_to[0].evolves_to[0]?.species.name;
    if(evolutionName && lastEvolutionName){
      setNextEvolution([ evolutionName ,lastEvolutionName])
      // nextEvolution.push(firstName, evolutionName, lastEvolutionName);
      const lastElement = nextEvolution[nextEvolution.length - 2]
      console.log(nextEvolution)
      if(lastElement === dataPokemon.name) {
        console.log("3 evolution")
        setIndexEvolution(indexEvolution + 1)
      }
    }
    else if(evolutionName && !lastEvolutionName){
      setNextEvolution([evolutionName])
      const beforeLastElement = nextEvolution[nextEvolution.length - 1]
      console.log(beforeLastElement)
      if(beforeLastElement === dataPokemon.name) {
        console.log("2 evolution")
        setIndexEvolution(indexEvolution + 1)
      }
    }
  }

  // Thief color library
  const { data } = usePalette(dataPokemon &&
    dataPokemon?.sprites?.other["official-artwork"]?.front_default, 2, "hex", { crossOrigin: "cross-origin", quality: 10})
  
  useEffect(() => {
    getApiPokemon()
    getApiEvolution()
    
   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[index])

  const mystyle = {
    background: `linear-gradient(${data && data[0]}, ${data && data[1]})`,
  };

  return (
    <div className="App">
      <Menu setIndex={setIndex} index={index} dataPokemon={dataPokemon} />
      <Grid className="mainBlock" dataPokemon={dataPokemon} style={mystyle} container spacing={1}>
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
          <Evolution dataPokemon={dataPokemon} index={index} dataEvolution={dataEvolution}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
