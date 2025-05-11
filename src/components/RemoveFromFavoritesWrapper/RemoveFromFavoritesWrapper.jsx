import React from 'react';
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";

const RemoveFromFavoritesWrapper = ({ movieId, onRemove }) => {
  const handleClick = () => {
    onRemove(movieId);
  };

  return (
    <a onClick={handleClick} style={{ cursor: 'pointer' }}>
      <FavoriteButton movieId={movieId} initialIsFavorite={true} />
    </a>
  );
};

export default RemoveFromFavoritesWrapper;
