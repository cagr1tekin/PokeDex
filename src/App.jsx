import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import PokemonCard from './components/PokemonCard';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!searchTerm) return;

    setStatus('loading');
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => {
        setPokemon(data);
        setStatus('success');
      })
      .catch(() => {
        setPokemon(null);
        setStatus('error');
      });
  }, [searchTerm]);

  return (
    <div className="app">
      <div className="crt-overlay" aria-hidden="true" />

      <header className="app-header">
        <div className="header-badge">KANTO RESEARCH LAB</div>
        <h1 className="app-title" aria-label="PokéDex">
          <span className="title-glitch" data-text="POKÉDEX">POKÉDEX</span>
        </h1>
        <p className="app-subtitle">// SEARCH TERMINAL v1.0 //</p>
      </header>

      <main className="app-main">
        <SearchBar query={query} onQueryChange={setQuery} onSearch={setSearchTerm} />
        <PokemonCard pokemon={pokemon} status={status} />
      </main>

      <footer className="app-footer">
        <span>DATA SOURCE: PokéAPI &nbsp;|&nbsp; SYSTEM ONLINE</span>
      </footer>
    </div>
  );
}

export default App;
