import {
  CircularProgress,
  Card,
  Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import "./Profile.css";

export const Profile = () => {
  const player = useSelector((state) => state.user.player);
  return (
    <div className="page-root">
      <Card className="profile-root">
        {player ? (
          <div className="profile-container">
            <div
              style={{ backgroundImage: `url("${player.avatar}")` }}
              className="profile-avatar"
            />
            <Typography variant="h3" className="profile-name">
              {player.name}{" "}
            </Typography>
            <Typography variant="h5" className="profile-name">
              Vous avez joué {player.nb_played_games} parties
            </Typography>
          </div>
        ) : (
          <CircularProgress color="primary" />
        )}
      </Card>
    </div>
  );
};
