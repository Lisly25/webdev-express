import React from "react";

const UserDislikedPokemon = ({dislikedPokemon}) => {

	console.log("Disliked pokemon array >>>", dislikedPokemon)

	if (dislikedPokemon.length == 0)
	{
		return (
			<section className="justify-center items-center grid columns-3">
			<p className="px-4 text-white text-center pb-3 pt-3 font-bold opacity-80 rounded-lg border-double text-2xl font-mono border-pink-950 border-4 bg-slate-800">
				No disliked pokemon yet
			</p>
			</section>
		)
	}

	return (
		<section className="justify-center items-center grid columns-3">
		<ul className="grid grid-cols-10 px-4 text-center pb-3 pt-3 list-inside font-bold opacity-80 rounded-lg border-double text-2xl font-mono border-pink-950 border-4 bg-slate-800">
			{
				dislikedPokemon.map((pokemon) => {	
					return (<li className="p-3 items-center text-white" key={pokemon}><a href={`/pokemon/${pokemon}`}>{pokemon}</a></li>)
				}
			)}
		</ul>
		</section>
	)
}

export default UserDislikedPokemon;