import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayers } from "./playersEffects";

export const Players = () => {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.players.data);
  const isLoading = useSelector((state) => state.players.isLoading);
  useEffect(() => {
    dispatch(fetchPlayers());
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
        <div>
          Joueurs :
          <ul>
            {players.map((player) => (
              <li>{player.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
