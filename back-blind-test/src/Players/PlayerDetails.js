import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./PlayerDetails.css";
import { givePlayerRights } from "./playersEffects";

export const PlayerDetails = ({ data }) => {
  const adminId = useSelector((state) => state.user.uid);
  const [isAdmin, setIsAdmin] = useState(data.backOffice);
  const dispatch = useDispatch();
  const changeRights = (newValue) => {
    setIsAdmin(newValue);
    dispatch(givePlayerRights(data.id, newValue));
  };
  useEffect(() => {
    setIsAdmin(data.backOffice);
  }, [data.backOffice]);
  return (
    <div style={{ flex: 1 }}>
      <div className="player-header">
        <div
          style={{
            backgroundImage: `url(${data.avatar}`,
          }}
          className="player-avatar"
        />
        <h3 className="player-name">{data.name}</h3>
        <input
          type="checkbox"
          checked={isAdmin}
          onChange={(e) => changeRights(e.target.checked)}
          disabled={data.id === adminId}
        />
        Admin
      </div>
      {data.games.length > 0 ? (
        <div className="player-games">
          Parties jouées :
          <ul>
            {data.games.map((g) => (
              <li key={`${g.play_date}`}>
                {g.nb_questions} questions, date :{" "}
                {new Date(g.play_date).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      ) : undefined}
    </div>
  );
};
