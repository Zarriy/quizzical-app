import Options from "./questionOptions";
import { useEffect } from "react";

function Question(props) {
  return (
    <div className="question">
      <h2>{props.question}</h2>
      <Options
        value={props.options}
        selected={props.selected}
        selectedValue={props.selectedValue}
        id={props.id}
        hold={props.holdValue}
        check={props.check}
        correct={props.correct_answer}
      />
    </div>
  );
}

export default Question;
