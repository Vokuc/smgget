import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import {
	Button,
	useColorMode,
	useColorModeValue,
	Input,
	Box,
	Flex,
} from "@chakra-ui/react";
import Image from "next/image";

const API_URL = "https://www.omdbapi.com/";

export default function SearchResults() {
	const [movies, setMovies] = useState([]);
	const [error, setError] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	// Color mode
	const { colorMode, toggleColorMode } = useColorMode();

	const txt = useColorModeValue("black", "white");

	async function fetchData(searchTerm) {
		try {
			const response = await fetch(
				`${API_URL}?apikey=2ab6220a&s=${searchTerm}`
			);
			const data = await response.json();
			setMovies(data.Search);
		} catch (error) {
			setError(error);
		}
	}
	useEffect(() => {
		fetchData();
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(searchTerm);
		fetchData(searchTerm);
	};
	/* 
	if (error) {
		return <p>There was an error loading the movies</p>;
	}
 */
	return (
		<div className="w-5/5">
			<Head>
				<title>Get Movies App</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Box
				background="whiteAlpha.100"
				/* w={1440} */
				h={140}
				left="0px"
				top="0px"
				className="flex"
			>
				<Box
					/* position="absolute" */
					border="1px"
					borderStyle="solid"
					borderColor="white"
					w="193px"
					h="60px"
					left="77px"
					top="40px"
				>
					<Box m={4} p={2} w="156px" h={32.94} left="96px" top={54}>
						MyTestApp
					</Box>
				</Box>
			</Box>
			<Box
				className={`${styles.background}`}
				/* position="absolute" */ /* w={1440}  */ h={550}
				left="0px"
				top="138px"
			>
				<Box
					position="absolute"
					w="490px"
					h="282px"
					left="77px"
					top="247px"
					fontFamily="DM Sans"
					fontStyle="normal"
					fontWeight="700"
					fontSize="72px"
					lineHeight="94px"
					letterSpacing="-0.05em"
				>
					Watch something incredible
				</Box>
			</Box>
			<Button className="mb-4 mt-4" m={4} onClick={toggleColorMode}>
				Toggle {colorMode === "light" ? "Dark" : "Light"}
			</Button>
			<form onSubmit={handleSubmit} m={2}>
				<Input
					/* w={680} */
					h={54}
					className="w-3/4"
					type="text"
					value={searchTerm}
					onChange={(event) => setSearchTerm(event.target.value)}
					m={2}
					variant="filled"
				/>
				<Button m={2} type="submit">
					Search
				</Button>
			</form>
			<Flex
				w="90%"
				wrap="wrap"
				h={300}
				left="67px"
				top="888px"
				className="mt-8 mb-4"
			>
				{movies?.map((movie) => (
					<Box
						_hover={{ w: 32 }}
						w={24}
						boxShadow="dark-lg"
						m={2}
						key={movie.imdbID}
						className={`w-4/5 m-2`}
					>
						<Box>
							<img src={`${movie.Poster}`} />
						</Box>
						{movie.Title}
					</Box>
				))}
			</Flex>
		</div>
	);
}
