import { useEffect } from "react";
import { useState } from "react";

import "./App.css";
import HomePage from "./home";
import Question from "./questions";

function App() {
  const [game, setGame] = useState(true);
  const [questions, setQuestions] = useState([]);

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
  }, []);

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

  return (
    <div className="app-div">
      {!game && <HomePage />}
      {questions.map((question) => (
        <Question {...question} key={question.id} holdValue={holdValue} />
      ))}
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
