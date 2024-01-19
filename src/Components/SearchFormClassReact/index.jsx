
import { Component } from 'react';
import axios from 'axios';
// import debounce from 'lodash/debounce';

class SearchFormClassReact extends Component {

	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		searchTerm: '',
	// 		searchResults: [],
	// 	};
	// 	this.handleSearch = debounce(this.handleSearch.bind(this), 300);
	// 	this.handleChange = this.handleChange.bind(this);
	// }

	// async handleSearch(value) {
	// 	if (value) {
	// 		try {
	// 			const response = await axios.get(`https://swapi.dev/api/people/?search=${value}`);
	// 			this.setState({ searchResults: response.data.results });
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	} else {
	// 		this.setState({ searchResults: [] });
	// 	}
	// }

	// handleChange(event) {
	// 	const { value } = event.target;
	// 	this.setState({ searchTerm: value });
	// 	this.handleSearch(value.toLowerCase());
	// }


	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
			searchResults: []
		};
		this.delayDebounceFn = null;
	}

	handleSearchChange = (event) => {
		this.setState({ searchTerm: event.target.value }, () => {
			if (this.state.searchTerm) {
				this.searchCharacters();
			} else {
				this.setState({ searchResults: [] });
			}
		});
	};

	searchCharacters = () => {
		clearTimeout(this.delayDebounceFn);
		this.delayDebounceFn = setTimeout(async () => {
			try {
				const response = await axios.get(
					`https://swapi.dev/api/people/?search=${this.state.searchTerm}`
				);
				const filteredResults = response.data.results.filter(
					(character) =>
						character.name.toLowerCase().startsWith(this.state.searchTerm.toLowerCase().charAt(0))
				);
				if (filteredResults.length > 0) {
					this.setState({ searchResults: filteredResults });
				} else {
					this.setState({ searchResults: [] });
				}
			} catch (error) {
				console.error('Ошибка получения данных: ', error);
				this.setState({ searchResults: [] });
			}
		}, 100);
	};
	render() {
		const { searchTerm, searchResults } = this.state;

		return (
			<div>
				<div className="search">
					<div className="search__container">
						<div className="search__block">
							<div className="search__input">
								<input type="text" placeholder="Enter name" value={searchTerm} onChange={this.handleSearchChange} />
							</div>
							{searchResults.length > 0 ? (
								<div className="search__item">
									<div className="search__item-block revers">
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
								<p>Не найдено</p>
							)}

						</div>
					</div>
				</div>
			</div >
		)
	}

}

export default SearchFormClassReact
