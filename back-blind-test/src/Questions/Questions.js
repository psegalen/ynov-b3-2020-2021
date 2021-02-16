import { useState } from "react";
import apiHelper from "../apiHelper";
import "./Questions.css";

const SongDisplay = ({ s, player }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  const playSong = (song) => {
    console.log(audio, isPlaying);
    if (audio !== null) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    } else {
      const newAudio = new Audio(song.preview);
      newAudio.addEventListener("play", (_) => {
        setIsPlaying(true);
      });
      newAudio.addEventListener("pause", (_) => {
        setIsPlaying(false);
      });
      newAudio.play();
      setAudio(newAudio);
      setIsPlaying(true);
    }
  };
  return (
    <div className="question-details">
      <img
        src={s.album.cover_small}
        className="question-album"
        alt="Album cover"
      />
      <div className="question-song-info">
        Titre: <strong>{s.title}</strong>
        <br />
        Artiste : <strong>{s.artist.name}</strong>
      </div>
      {player ? (
        <button onClick={() => playSong(s)}>
          {isPlaying ? "Pause" : "Play"}
        </button>
      ) : undefined}
    </div>
  );
};

export const Questions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [deezerSongs, setDeezerSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [type, setType] = useState("title");

  const searchOnDeezer = () => {
    setIsLoading(true);
    fetch(
      `https://cors-anywhere.herokuapp.com/http://api.deezer.com/search?q=${search}`
    )
      .then((result) => result.json())
      .then((data) => {
        setDeezerSongs(data.data);
        setIsLoading(false);
      });
  };
  const selectSong = (song) => {
    setSelectedSong(song);
    setAnswers([song.title, "", "", ""]);
  };
  const selectType = (type) => {
    setType(type);
    const firstAnswer =
      type === "title"
        ? selectedSong.title
        : selectedSong.artist.name;
    setAnswers([firstAnswer, "", "", ""]);
  };
  const createQuestion = () => {
    const question = {
      answers,
      audio_url: selectedSong.preview,
      good_answer: answers[0],
      question:
        type === "title"
          ? "Quel est le titre de cette chanson ?"
          : "Quel est l'artiste qui interprète cette chanson ?",
      type: "text",
    };
    setIsLoading(true);
    apiHelper.createQuestion(question).then((result) => {
      if (result.status === "ok") {
        setDeezerSongs([]);
        setSearch("");
        setType("title");
        setSelectedSong(null);
        setIsLoading(false);
      }
    });
  };
  return (
    <div className="questions-root">
      <h2>Question</h2>
      {isLoading ? (
        <img
          src="/assets/spinner_black.svg"
          alt="Loading animation"
          style={{ height: "50px" }}
        />
      ) : selectedSong ? (
        <div className="question-wizard-step2">
          <SongDisplay s={selectedSong} player />
          <div>
            Type de question
            <select
              onChange={(e) => selectType(e.target.value)}
              value={type}
            >
              <option value="title">Title</option>
              <option value="artist">Artist</option>
            </select>
          </div>
          <div>Réponses :</div>
          <div>
            <input value={answers[0]} disabled />
          </div>
          <div>
            <input
              value={answers[1]}
              onChange={(e) =>
                setAnswers([
                  ...answers.slice(0, 1),
                  e.target.value,
                  ...answers.slice(2),
                ])
              }
            />
          </div>
          <div>
            <input
              value={answers[2]}
              onChange={(e) =>
                setAnswers([
                  ...answers.slice(0, 2),
                  e.target.value,
                  ...answers.slice(3),
                ])
              }
            />
          </div>
          <div>
            <input
              value={answers[3]}
              onChange={(e) =>
                setAnswers([...answers.slice(0, 3), e.target.value])
              }
            />
          </div>
          <button onClick={() => setSelectedSong(null)}>
            Retour
          </button>
          <button onClick={createQuestion}>Créer la question</button>
        </div>
      ) : (
        <div className="question-wizard-step1">
          <div className="question-search">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={searchOnDeezer}
              disabled={search.length === 0}
            >
              Chercher une chanson
            </button>
          </div>
          {deezerSongs.length > 0
            ? deezerSongs.map((s) => (
                <a
                  onClick={() => selectSong(s)}
                  href="javascript:void(0)"
                >
                  <SongDisplay s={s} />
                </a>
              ))
            : undefined}
        </div>
      )}
    </div>
  );
};
