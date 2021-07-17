import React, { useState, useEffect } from "react";
import PokemonCard from "../Pokemon/PokemonCard";

const Home = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState([
    "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  ]);

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();
    setLoadMore(data.next);

    function createPokemonObject(result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();

        setAllPokemons((allPokemons) => [...allPokemons, data]);

        await allPokemons.sort((a, b) => a.id - b.id);
      });
    }
    createPokemonObject(data.results);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <>
      <div className="app-container">
        <h1>Pokémon Evolution</h1>
        <div className="pokemon-container">
          <div className="all-container">
            {allPokemons.map((pokemon, index) => (
              <PokemonCard
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.sprites.other.dream_world.front_default}
                type={pokemon.types[0].type.name}
                key={index}
              />
            ))}
          </div>
          <button className="load-more" onClick={getAllPokemons}>
            Load More
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;