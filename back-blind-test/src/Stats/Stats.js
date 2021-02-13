/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "./statsEffects";

export const Stats = () => {
  const playerName = useSelector((state) => state.user.player.name);
  const stats = useSelector((state) => state.stats);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStats());
  }, []);
  let body = undefined;
  if (stats.isLoading) {
    body = (
      <img
        src="/assets/spinner_black.svg"
        alt="Loading animation"
        style={{ height: "50px" }}
      />
    );
  } else if (stats.error) {
    body = <p>{stats.error}</p>;
  } else {
    body = (
      <div>
        <p>Nombre de joueurs : {stats.nbPlayers}</p>
        <p>Nombre de parties jouées : {stats.nbGames}</p>
        <p>Nombre de questions : {stats.nbQuestions}</p>
      </div>
    );
  }
  return (
    <div>
      <div>Bienvenue {playerName} !</div>
      {body}
    </div>
  );
};
