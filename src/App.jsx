
// Components
import SearchForm from './Components/SearchForm'
import SearchFormClassReact from './Components/SearchFormClassReact'


// Style

import './Global-style.scss'
import './reset.css'

function App() {

	return (
		<>
			<div className="main">
				<SearchForm />
				<SearchFormClassReact />
			</div>
		</>
	)
}

export default App
