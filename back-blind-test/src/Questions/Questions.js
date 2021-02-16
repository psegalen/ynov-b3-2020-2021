import { useState } from "react";
import songs from "./deezerSongs.json";
import "./Questions.css";

export const Questions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("prodigy");
  const [deezerSongs, setDeezerSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  const searchOnDeezer = () => {
    setIsLoading(true);
    // TODO: search for a song on Deezer API instead of getting mocked data
    setDeezerSongs(songs.data);
    setIsLoading(false);
  };
  const selectSong = (song) => setSelectedSong(song);
  const createQuestion = () => {
    // TODO
    /*
    Request URL : https://europe-west1-ynov-b3-21.cloudfunctions.net/questions
    Method : POST
    Request body :
    {
        "answers": [
            "Gris",
            "Blanc",
            "Bleu",
            "Noir"
        ],
        "audio_url": "https://cdns-preview-e.dzcdn.net/stream/c-e77d23e0c8ed7567a507a6d1b6a9ca1b-9.mp3",
        "good_answer": "Gris",
        "question": "Quelle était la couleur du cheval Blanc d'Henry IV ?",
        "type": "text"
    }
    */
  };
  return (
    <div className="questions-root">
      {isLoading ? (
        <img
          src="/assets/spinner_black.svg"
          alt="Loading animation"
          style={{ height: "50px" }}
        />
      ) : (
        <>
          <h2>Question</h2>
          {selectedSong ? (
            <div className="question-wizard-step2">
              <div>Titre : {selectedSong.title}</div>
              <div>Artiste : {selectedSong.artist.name}</div>
              <div>
                Type de question :{" "}
                <select>
                  <option value="title">Title</option>
                  <option value="artist">Artist</option>
                </select>
              </div>
              <div>Mauvaises réponses :</div>
              <div>
                <input />
              </div>
              <div>
                <input />
              </div>
              <div>
                <input />
              </div>
              <button>Créer la question</button>
            </div>
          ) : (
            <div className="question-wizard-step1">
              <div className="question-details">
                <div>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button onClick={searchOnDeezer}>
                    Chercher une chanson
                  </button>
                </div>
                {deezerSongs.length > 0
                  ? deezerSongs.map((s) => (
                      <a onClick={() => selectSong(s)} href="#">
                        {s.title}
                      </a>
                    ))
                  : undefined}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
