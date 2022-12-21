import axios from "axios";
import { APIKEY } from "../config";
import { useState, useEffect } from "react";

/* In the functional component, create a search function that makes a 
GET request to the omdb API with the search term as a query parameter: */

export default function Movies() {
	const [searchTerm, setSearchTerm] = useState("");
	const [movies, setMovies] = useState([]);

	const searchMovies = (searchTerm) => {
		axios
			.get(`http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchTerm}`)
			.then((response) => {
				setMovies(response);
			})
			.catch((error) => {
				console.error(error);
			});
	};
	useEffect(() => {
		searchMovies(searchTerm);
	}, []);

	return (
		<div>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					searchMovies(searchTerm);
				}}
			>
				<input
					type="text"
					value={searchTerm}
					onChange={(event) => setSearchTerm(event.target.value)}
				/>
				<button type="submit">Search</button>
			</form>

			<div>{movies}</div>
		</div>
	);
}
