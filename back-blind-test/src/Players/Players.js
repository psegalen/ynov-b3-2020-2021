import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayers } from "./playersEffects";
import { Link, useParams } from "react-router-dom";

import "./Players.css";
import { PlayerDetails } from "./PlayerDetails";

export const Players = () => {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.players.data);
  const isLoading = useSelector((state) => state.players.isLoading);
  const { playerId } = useParams();
  const selectedPlayer = players.find((p) => p.id === playerId);
  useEffect(() => {
    if (players.length === 0) {
      dispatch(fetchPlayers());
    }
  }, [dispatch]);
  return (
    <div className="players-root">
      {isLoading ? (
        <img
          src="/assets/spinner_black.svg"
          alt="Loading animation"
          style={{ height: "50px" }}
        />
      ) : (
        <>
          <h2>Joueurs</h2>
          <div className="players-container">
            <div className="players-list">
              {players.map((player) => (
                <Link to={`/players/${player.id}`} key={player.id}>
                  <div className="player-card">
                    <div
                      style={{
                        backgroundImage: `url(${player.avatar}`,
                      }}
                      className="player-avatar"
                    />
                    <span className="player-name">{player.name}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="player-details">
              {selectedPlayer ? (
                <PlayerDetails data={selectedPlayer} />
              ) : (
                "Sélectionnez un joueur..."
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
