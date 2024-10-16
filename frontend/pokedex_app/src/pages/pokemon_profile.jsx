import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const PokemonProfile = () => {
	const { name } = useParams(); // Get the Pokémon name from the URL
	const [pokemonInfo, setPokemonInfo] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
	const fetchPokemonInfo = async () => {
		try {
		const response = await fetch(`/api/pokemon/${name}`);
		if (!response.ok) {
			throw new Error('Pokémon not found');
		}
		const data = await response.json();
		setPokemonInfo(data);
		} catch (err) {
		setError(err.message);
		} finally {
		setLoading(false);
		}
	};

	fetchPokemonInfo();
	}, [name]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	return (
		<div className="pokemon-details">
		<h1 className="font-pokemon text-zinc-700 text-6xl py-5 flex justify-evenly">{pokemonInfo.name }</h1>
		{/* Display the Pokémon's image */}
		<img
			src={pokemonInfo.sprites.other.dream_world.front_default}
			alt={`${pokemonInfo.name} sprite`}
			style={{ width: '150px', height: '150px' }} // Adjust size as needed
		/>
		<p>Height: {pokemonInfo.height}</p>
		<p>Weight: {pokemonInfo.weight}</p>
		<p> Type: {pokemonInfo.types[0].type.name}
		{pokemonInfo.types[1]?.type.name && `, ${pokemonInfo.types[1].type.name}`}</p>
		<h2>Stats</h2>
		{pokemonInfo.stats.map((stats, index) => (
			<div key={index}>
				<p>
					{stats.stat.name}: {stats.base_stat}
				</p>
			</div>
		))}
		{/* Add more fields as needed */}
	</div>
	);
};

export default PokemonProfile;