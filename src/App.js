import { useState } from 'react';
import axios from 'axios';
import './App.css';

function Form(props) {
	const { action } = props;
	const [title, setTitle] = useState('');
	const handleChange = (e) => {
		setTitle(e.target.value);
	}
	const handleClick = () => {
		// console.log(title);
		action(title);
		setTitle('');
	}
	return (
		<div className='form-container'>
			<label htmlFor="title">Title</label>
			<input type='text' id='title' value={title} onChange={handleChange}></input>
			<input type="button" value="search" onClick={handleClick}></input>
		</div>
	)
}

function Card(props) {
	const { key, details } = props;
	return (
		<div className='card'>
			<img src={details.Poster}></img>
			<h2>{details.Title}</h2>
			<p>{details.Year}</p>
		</div>
	)
}

function Result(props) {
	const { results } = props;
	if(results){
		return (
		<div className='result-container'>
			{
				results.map((result, id) => <Card key={id} details={result}></Card>)
			}
		</div>
	)}
}

function App() {
	const [searchResult, setSearchResult] = useState();
	const getMovies = (title) => {
		let api_key = '12f7113b'
		let url = `http://www.omdbapi.com/?apikey=${api_key}&s=${title}`;
		console.log(' Запрос по title', title);
		axios.get(url).then(function (response) {
			console.log(response);
			setSearchResult(response.data.Search);
		}).catch(function (error) {
			console.log(error);
		});
	}
	return (
		<div className="App">
			<header>
				<h1>CinemA AdvisoR</h1>
			</header>
			<main>
				<Form action={getMovies} />
				<Result results={searchResult} />
			</main>
		</div>
	);
}

export default App;
