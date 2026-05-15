import './PokemonCard.css';

const TYPE_COLORS = {
  normal:   { bg: '#6B7280', glow: 'rgba(107,114,128,0.4)' },
  fire:     { bg: '#F97316', glow: 'rgba(249,115,22,0.4)'  },
  water:    { bg: '#3B82F6', glow: 'rgba(59,130,246,0.4)'  },
  electric: { bg: '#EAB308', glow: 'rgba(234,179,8,0.4)'   },
  grass:    { bg: '#22C55E', glow: 'rgba(34,197,94,0.4)'   },
  ice:      { bg: '#67E8F9', glow: 'rgba(103,232,249,0.4)' },
  fighting: { bg: '#EF4444', glow: 'rgba(239,68,68,0.4)'   },
  poison:   { bg: '#A855F7', glow: 'rgba(168,85,247,0.4)'  },
  ground:   { bg: '#D97706', glow: 'rgba(217,119,6,0.4)'   },
  flying:   { bg: '#818CF8', glow: 'rgba(129,140,248,0.4)' },
  psychic:  { bg: '#EC4899', glow: 'rgba(236,72,153,0.4)'  },
  bug:      { bg: '#84CC16', glow: 'rgba(132,204,22,0.4)'  },
  rock:     { bg: '#A8A29E', glow: 'rgba(168,162,158,0.4)' },
  ghost:    { bg: '#7C3AED', glow: 'rgba(124,58,237,0.4)'  },
  dragon:   { bg: '#4F46E5', glow: 'rgba(79,70,229,0.4)'   },
  dark:     { bg: '#374151', glow: 'rgba(55,65,81,0.4)'    },
  steel:    { bg: '#94A3B8', glow: 'rgba(148,163,184,0.4)' },
  fairy:    { bg: '#F472B6', glow: 'rgba(244,114,182,0.4)' },
};

function SkeletonCard() {
  return (
    <div className="pcard pcard--loading" aria-busy="true" aria-label="Loading Pokémon data">
      <div className="pcard__header">
        <div className="skeleton skeleton--id" />
        <div className="skeleton skeleton--name" />
      </div>
      <div className="pcard__sprite-area">
        <div className="skeleton skeleton--sprite" />
      </div>
      <div className="pcard__types">
        <div className="skeleton skeleton--badge" />
        <div className="skeleton skeleton--badge" />
      </div>
      <div className="pcard__abilities">
        <div className="skeleton skeleton--label" />
        <div className="skeleton skeleton--ability" />
        <div className="skeleton skeleton--ability short" />
      </div>
    </div>
  );
}

function ErrorCard() {
  return (
    <div className="pcard pcard--error" role="alert">
      <div className="error-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      </div>
      <p className="error-title">TARGET NOT FOUND</p>
      <p className="error-sub">Invalid Pokémon name or ID. Check your input and try again.</p>
    </div>
  );
}

function PokemonCard({ pokemon, status }) {
  if (status === 'idle') return null;
  if (status === 'loading') return <SkeletonCard />;
  if (status === 'error') return <ErrorCard />;

  const primaryType = pokemon.types[0]?.type.name ?? 'normal';
  const typeStyle = TYPE_COLORS[primaryType] ?? TYPE_COLORS.normal;

  return (
    <article
      className="pcard pcard--success"
      style={{ '--type-glow': typeStyle.glow, '--type-color': typeStyle.bg }}
    >
      <div className="pcard__corner pcard__corner--tl" aria-hidden="true" />
      <div className="pcard__corner pcard__corner--tr" aria-hidden="true" />

      <div className="pcard__header">
        <span className="pcard__id">#{String(pokemon.id).padStart(3, '0')}</span>
        <h2 className="pcard__name">{pokemon.name.toUpperCase()}</h2>
      </div>

      <div className="pcard__sprite-area">
        <div className="pcard__sprite-ring" aria-hidden="true" />
        <img
          className="pcard__sprite"
          src={pokemon.sprites.front_default}
          alt={`${pokemon.name} front sprite`}
          loading="lazy"
          width="96"
          height="96"
        />
      </div>

      <div className="pcard__types" role="list" aria-label="Types">
        {pokemon.types.map((t) => {
          const ts = TYPE_COLORS[t.type.name] ?? TYPE_COLORS.normal;
          return (
            <span
              key={t.type.name}
              className="type-badge"
              role="listitem"
              style={{ '--badge-bg': ts.bg, '--badge-glow': ts.glow }}
            >
              {t.type.name.toUpperCase()}
            </span>
          );
        })}
      </div>

      <div className="pcard__abilities">
        <h3 className="pcard__section-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
          ABILITIES
        </h3>
        <ul className="abilities-list">
          {pokemon.abilities.map((a) => (
            <li key={a.ability.name} className="ability-item">
              <span className="ability-dot" aria-hidden="true" />
              <span className="ability-name">
                {a.ability.name.replace(/-/g, ' ').toUpperCase()}
              </span>
              {a.is_hidden && (
                <span className="hidden-badge" title="Hidden ability">HIDDEN</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default PokemonCard;
