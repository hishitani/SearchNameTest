
import { useState, useEffect } from 'react';
import axios from 'axios';


// Style
import './SearchForm.scss'

export default function SearchForm() {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (searchTerm) {
				searchCharacters();
			} else {
				setSearchResults([]);
			}
		}, 500);

		const searchCharacters = async () => {
			try {
				const response = await axios.get(`https://swapi.dev/api/people/?search=${searchTerm}`);
				const filteredResults = response.data.results.filter(
					(character) =>
						character.name.toLowerCase().startsWith(searchTerm.toLowerCase().charAt(0))
				);
				setSearchResults(filteredResults);
			} catch (error) {
				console.error('Ошибка получения данных: ', error);
				setSearchResults([]);
			}
		};

		return () => clearTimeout(delayDebounceFn);
	}, [searchTerm]);

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	return (
		<>
			<div className="search">
				<div className="search__container">
					<div className="search__block">
						<div className="search__input">
							<input type="text" placeholder="Enter name" value={searchTerm} onChange={handleSearchChange} />
						</div>
						{searchResults.length > 0 ? (
							<div className="search__item">
								<div className="seach__item-block">
									<ul className='search__item-list list'>
										{searchResults.map((character, index) => (
											<li className='list__item' key={index}>
												<div className='list__item-option'>Имя: {character.name}</div>
												<div className='list__item-option'>Рост: {character.height}</div>
												<div className='list__item-option'>Вес: {character.mass}</div>
												<div className='list__item-option'>Возраст: {character.birth_year}</div>
											</li>
										))}
									</ul>
								</div>
							</div>
						) : searchTerm && searchResults.length === 0 && (
							<p className='search__error'>Не найдено</p>
						)}
					</div>
				</div>
			</div>
		</>
	)
}