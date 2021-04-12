import {
  Button,
  Card,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Home.css";

export const Home = () => {
  const player = useSelector((state) => state.user.player);
  const history = useHistory();
  return (
    <div className="page-root">
      <Card className="home-root">
        {player ? (
          <div className="home-container">
            <Typography variant="h3">
              Bonjour {player.name} !
            </Typography>
            <Typography variant="h5" className="home-nbgames">
              Voulez-vous jouer votre {player.nb_played_games + 1}e
              partie ?
            </Typography>
            <Button
              variant="contained"
              onClick={() => history.push("/play")}
              className="play-button"
              color="primary"
            >
              Oui !
            </Button>
          </div>
        ) : (
          <CircularProgress color="primary" />
        )}
      </Card>
    </div>
  );
};
