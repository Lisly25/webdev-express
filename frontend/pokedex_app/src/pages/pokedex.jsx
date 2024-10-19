import { useState, useEffect, useRef } from "react";
import logo from '../../img/logo.png';
import './pokedex.css';

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [morePokemon, setMorePokemon] = useState(true);
  const [matchingList, setMatchingList] = useState([]);
  const [offsetForSearching, setOffsetForSearching] = useState(0);

  const limit = 50; // Number of Pokémon per page
  const abortControllerRef = useRef(null); // Ref to store the current AbortController

  console.log("rendering Pokedex...");

  // Function to fetch Pokemon list (non-search)
  const fetchPokemonList = async (offsetValue = 0, shouldShuffle = false) => {
    console.log("fetchPokemonList() called");
    setLoading(true);
    console.log("offset:", offsetValue, "shouldShuffle:", shouldShuffle);
    try {
      const response = await fetch(`/api/pokemon?limit=${limit + 1}&offset=${offsetValue}&shuffle=${shouldShuffle}`);
      const newPokemonList = await response.json();
      console.log("newPokemonList:", newPokemonList)
      if (newPokemonList.length > limit) {
        setPokemonList(prevList => [...prevList, ...newPokemonList.slice(0, limit)]);
      } else {
        setMorePokemon(false);
        setPokemonList((prevList) => [...prevList, ...newPokemonList]);
      }
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to search for Pokemon
  const searchPokemon = async (query, offsetValue = 0) => {
    console.log("searchPokemon() called");

    // Cancel the previous fetch request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create a new AbortController instance
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setLoading(true);
    console.log("offsetForSearching:", offsetValue);
    try {
      const response = await fetch(`/api/pokemon/search/${query}?limit=${limit + 1}&offset=${offsetValue}`, {
        signal: abortController.signal, // Pass the signal to the fetch request
      });

      if (response.ok) {
        const newMatchingList = await response.json();
        console.log("searchTerm:", query, "| newMatchingLis:", newMatchingList)
        if (newMatchingList.length > limit) {
          setMatchingList(prevList => [...prevList, ...newMatchingList.slice(0, limit)]);
        } else {
          setMorePokemon(false);
          setMatchingList(prevList => [...prevList, ...newMatchingList]);
        }
      } else {
        setMatchingList([]);
        setMorePokemon(false);
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error("Error searching Pokémon:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateList = (userInput) => {
    console.log("updateList() called, userInput:", userInput);

    setSearchTerm(userInput);
    setOffset(0);
    setOffsetForSearching(0);
    setMorePokemon(true);
    setPokemonList([]);
    setMatchingList([]);
    if (userInput === "") {
      fetchPokemonList(0, false);
    } else {
      searchPokemon(userInput, 0);
    }
  };

  const shuffle = async () => {
    setSearchTerm("");
    setOffset(0);
    setPokemonList([]);
    setMorePokemon(true);
    fetchPokemonList(0, true); // Request a reshuffle
  };

  const loadMorePokemon = () => {
    console.log("loadMorePokemon");
    if (searchTerm === "") {
      setOffset((prevOffset) => prevOffset + limit);
      fetchPokemonList(offset + limit);
    } else {
      setOffsetForSearching((prevOffset) => prevOffset + limit);
      searchPokemon(searchTerm, offsetForSearching + limit)
    }
  };

  // useEffect to call fetchPokemonList initially
  useEffect(() => {
    fetchPokemonList(0, false); // Fetch the initial Pokémon list
  }, []);

  return (
    <div>
      <header>
        <img alt="react logo" className="logo" src={logo} />
      </header>
      <main>
        <div className="search-container">
          <input
            className="search-box"
            type="text"
            placeholder="Search..."
            value={searchTerm} // Set input value to the search term
            onChange={(e) => updateList(e.target.value)}
          />
        </div>
        {/* Add a Shuffle Button */}
        <button
          onClick={shuffle}
          disabled={loading}
          className={`block mx-auto my-12 px-6 py-3 font-semibold text-white rounded-lg shadow-lg transition-all
            ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'}`}
        >
          {loading ? "Loading..." : "Shuffle"}
        </button>
        {/* List of Pokémon when not searching */}
        {!searchTerm && (
          <ul className="pokemon-list">
            {pokemonList.map((pokemon) => (
              <li key={pokemon.name} className="pokemon-item">
                <a href={`/pokemon/${pokemon.name}`}>
                  <img 
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="pokemon-image"
                  />
                  <p>{pokemon.name}</p>
                </a>
              </li>
            ))}
        </ul>
        )}
        {/* Matching Pokémon list when searching */}
        {searchTerm && (
          <>
            {matchingList && matchingList.length > 0 ? (
              <ul className="pokemon-list">
                {matchingList.map((pokemon) => (
                  <li key={pokemon.name} className="pokemon-item">
                    <a href={`/pokemon/${pokemon.name}`}>
                      <img 
                        src={pokemon.image}
                        alt={pokemon.name}
                        className="pokemon-image"
                      />
                    {pokemon.name}</a>
                  </li>
                ))}
              </ul>
            ) : (
              <p align='center'>No Pokémon matched your search</p>
            )}
          </>
        )}
        {/* Load more button (placed before the list for testing purpose)*/}
        {morePokemon && (
          <button
            onClick={loadMorePokemon}
            disabled={loading}
            className={`block mx-auto my-12 px-6 py-3 font-semibold text-white rounded-lg shadow-lg transition-all
              ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'}`}
          >
            {loading ? "Loading..." : "Load More Pokémon"}
          </button>
        )}
      </main>
    </div>
  );
};

export default Pokedex;