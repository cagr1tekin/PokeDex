import './SearchBar.css';

function SearchBar({ query, onQueryChange, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) onSearch(trimmed);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <label className="search-label" htmlFor="pokemon-search">
        ENTER POKÉMON NAME OR ID
      </label>
      <div className="search-row">
        <div className="search-input-wrapper">
          <svg
            className="search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            id="pokemon-search"
            className="search-input"
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="pikachu / 25 / charizard..."
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <button className="search-button" type="submit" aria-label="Search Pokémon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          SCAN
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
