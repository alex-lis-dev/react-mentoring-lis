import React from "react";
import "./App.css";
import Counter from "./components/Counter/Counter";
import GenreSelector from "./components/GenreSelector/GenreSelector";
import Search from "./components/Search/Search";

function App() {
  const handleSearch = (param) => {
    alert(param);
  }

  const handleGenre = (param) => { 
    alert(param);
  }
  const genres = ["ALL", "DOCUMENTARY", "COMEDY", "HORROR", "CRIME"];

  return (
    <div className="App">
      <header className="App-header">
        <Counter initialValue={13}></Counter>
        <Search
          initialQuery="What do you want?"
          onSearch={handleSearch}
        ></Search>
        <GenreSelector
          genres={genres}
          selectedGenre={genres[0]}
          onSelect={handleGenre}
        ></GenreSelector>
      </header>
    </div>
  );
}

export default App;
