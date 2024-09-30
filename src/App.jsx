import './App.css';
import Counter from './components/Counter/Counter';
import GenreSelector from './components/GenreSelector/GenreSelector';
import Search from './components/Search/Search';

function App() {  

const handlerSearch = (param) =>
{
  alert(param);
}

const GenreHandler = (param) => 
{ 
  alert(param);
}
const genres = ['ALL', "DOCUMENTARY", "COMEDY", "HORROR", "CRIME"];

  return (
    <div className="App">
      <header className="App-header">
      <Counter initialValue={13}></Counter>
      <Search initialQuery="What do you want?" onSearch={handlerSearch}></Search>
      <GenreSelector genres={genres} selectedGenre={genres[0]} onSelect={GenreHandler}></GenreSelector>
      </header>
    </div>
  );
}

export default App;
