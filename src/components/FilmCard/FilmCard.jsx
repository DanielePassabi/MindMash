import React from 'react';
import missingWallpaper from './missing_wallpaper.jpg';

export default function FilmCard({ film }) {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        backgroundColor: '#f9f9f9',
        padding: '0.5rem',
        marginBottom: '0rem',
        borderRadius: '0px',
        maxWidth: '170px',
        fontSize: '0.8rem', // Make the overall font smaller
      }}
    >
      {/* Poster */}
      <img
        src={film.poster_url || missingWallpaper}
        alt={`Poster of ${film.title}`}
        style={{
            width: '100%',
            height: 'auto',
            borderRadius: '0px',
            border: '1px solid #ccc',
        }}
        />

      {/* Title */}
      {film.url ? (
      // Show title as a link
      <h3 style={{ fontSize: '1rem', margin: '0.25rem 0' }}>
          <a href={film.url} target="_blank" rel="noopener noreferrer">
          {film.title}
          </a>
      </h3>
      ) : (
      // Show title as plain text (no link)
      <h3 style={{ fontSize: '1rem', margin: '0.25rem 0' }}>
          {film.title}
      </h3>
      )}

      {/* Release date */}
      <p style={{ margin: 0 }}>
        <strong>Uscita:</strong> {film.release_date}
      </p>

      {/* Genres */}
      {film.genres && (
        <p style={{ margin: 0 }}>
          <strong>Genere:</strong> {film.genres.join(', ')}
        </p>
      )}

      {/* Runtime */}
      {film.runtime && (
        <p style={{ margin: 0 }}>
          <strong>Durata:</strong> {film.runtime}
        </p>
      )}

      <hr style={{ margin: '0.25rem 0' }} />

      {/* Watch date */}
      <p style={{ margin: 0 }}>
        <strong>Guardato:</strong> {film.watch_date}
      </p>

      {/* Notes */}
      {film.notes && film.notes.trim() !== '' && (
        <p style={{ margin: 0 }}>
          <strong>Note:</strong> {film.notes}
        </p>
      )}
    </div>
  );
}