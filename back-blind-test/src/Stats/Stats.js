/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StatDisplay } from "../components/StatDisplay";
import { fetchStats } from "./statsEffects";
import "./Stats.css";

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
      <div className="stats-displays">
        <StatDisplay
          number={stats.nbPlayers}
          title="Joueurs"
          color="green"
        />
        <StatDisplay
          number={stats.nbGames}
          title="Parties jouées"
          color="blue"
        />
        <StatDisplay
          number={stats.nbQuestions}
          title="Questions"
          color="red"
        />
      </div>
    );
  }
  return (
    <div className="stats-root">
      <h3 className="stats-title">Bienvenue {playerName} !</h3>
      {body}
    </div>
  );
};
