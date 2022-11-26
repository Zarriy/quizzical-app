import { useEffect } from "react";
import { useState } from "react";

import "./App.css";
import HomePage from "./home";
import Question from "./questions";

function App() {
  const [game, setGame] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [check, setCheck] = useState(false);
  const [message, setMessage] = useState("");
  const [reset, setReset] = useState(false);

  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=4&category=9&difficulty=easy&type=multiple"
    )
      .then((res) => res.json())
      .then((data) => {
        const store = data.results;
        const set = store.map((data, i) => {
          return {
            ...data,
            id: i,
            options: shuffle([...data.incorrect_answers, data.correct_answer]),
            selected: false,
          };
        });
        setQuestions(set);
      });
  }, [reset]);

  const holdValue = (e, id) => {
    setQuestions((prevDat) =>
      prevDat.map((data) => {
        return data.id === id
          ? {
              ...data,
              selected: !data.selected,
              selectedValue: e.target.innerText,
            }
          : data;
      })
    );
  };

  const manageGame = () => {
    setGame(true);
  };

  const checkAnswers = () => {
    // check if all are elements are selected.
    const allselected = questions.every((question) => question.selected);
    if (allselected) {
      setCheck(true);
      const filtered = questions.filter(
        (question) => question.correct_answer === question.selectedValue
      );
      setMessage(`Your Scored ${filtered.length}/4 correct answers`);
    } else {
      setMessage(
        "You have unchecked questions. Please select them before proceeding."
      );
    }
  };
  const resetGame = () => {
    setReset((prev) => !prev);
    setCheck(false);
    setMessage("");
  };

  return (
    <div className="app-div">
      {!game && <HomePage game={manageGame} />}
      {game &&
        questions.map((question) => (
          <Question
            {...question}
            key={question.id}
            holdValue={holdValue}
            check={check}
          />
        ))}
      {game && !check && (
        <button className="checkBtn" onClick={checkAnswers}>
          Check answer
        </button>
      )}
      {game && check && (
        <button className="checkBtn" onClick={resetGame}>
          Reset Game
        </button>
      )}
      {<h3 className="message">{message}</h3>}
    </div>
  );
}

function shuffle(array) {
  const newArray = [...array];
  const length = newArray.length;

  for (let start = 0; start < length; start++) {
    const randomPosition = Math.floor(
      (newArray.length - start) * Math.random()
    );
    const randomItem = newArray.splice(randomPosition, 1);

    newArray.push(...randomItem);
  }

  return newArray;
}

export default App;
