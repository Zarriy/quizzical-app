import uniqid from "uniqid";

function Options(props) {
  return (
    <div className="options">
      {props.value.map((val) => (
        <div
          key={uniqid()}
          onClick={(e) => props.hold(e, props.id)}
          style={
            !props.check
              ? props.selectedValue === val
                ? { backgroundColor: "#d6dbf5", border: "2px solid #d6dbf5" }
                : {}
              : props.selectedValue === props.correct
              ? props.selectedValue === val
                ? { backgroundColor: "#94D7A2", border: "2px solid #94D7A2" }
                : { color: "#4D5B9E", border: "2px solid #4D5B9E" }
              : props.selectedValue !== props.correct
              ? props.selectedValue === val
                ? {
                    backgroundColor: "#F8BCBC",
                    border: "2px solid #F8BCBC",
                    color: "#293264",
                  }
                : props.correct === val
                ? { backgroundColor: "#94D7A2", border: "2px solid #94D7A2" }
                : { color: "#4D5B9E", border: "2px solid #4D5B9E" }
              : {}
          }
        >
          {val}
        </div>
      ))}
    </div>
  );
}
export default Options;
