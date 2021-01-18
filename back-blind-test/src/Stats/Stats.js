import { useSelector } from "react-redux";

export const Stats = () => {
  const playerName = useSelector((state) => state.user.player.name);
  return (
    <div>
      <div>Bienvenue {playerName} !</div>
      {/* TODO: add the stats dashboard */}
    </div>
  );
};
