import React from "react";
import { useState } from "react";

const RegistrationForm = (props) => {

	const [username, setUsername] = useState('');
	const [user, setUser] = useState([]);
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('')


	const handleUsername = (event) => {
		setUsername(event.target.value)
	}

	const loginAttempt = (event) => {
		event.preventDefault()
		console.log(`Registration attempt: ${username}, ${password}, ${email}`)
	}

	const handlePassword = (event) => {
		setPassword(event.target.value)
	}

	const handleEmail = (event) => {
		setEmail(event.target.value)
	}

	return (
		
		<section className="border-t-4 border-indigo-700">
			<header className="pt-4 font-pokemon w-full text-center font-bold text-blue-700 text-2xl">Don't have an account yet?<br/>Register here</header>
			<form onSubmit={loginAttempt}>
				<div>
					<label className="block mb-2 text-indigo-500" for="email">Email address:</label>
					<input className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" value={email}  onChange={handleEmail}/>
				</div>
				<div>
					<label className="block mb-2 text-indigo-500" for="username">Username:</label>
					<input className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" value={username} onChange={handleUsername}/>
				</div>
				<div>
					<label className="block mb-2 text-indigo-500" for="password">Password:</label>
					<input className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" value={password} onChange={handlePassword}/>
				</div>
			<button className="font-pokemon w-full text-2xl bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded" type="submit">Register</button>
			</form>
		</section>
	)
}

export default RegistrationForm;