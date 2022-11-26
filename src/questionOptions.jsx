import uniqid from "uniqid";

function Options(props) {
  return (
    <div className="options">
      {props.value.map((val) => (
        <div
          key={uniqid()}
          onClick={(e) => props.hold(e, props.id)}
          style={
            props.selectedValue === val
              ? { backgroundColor: "#d6dbf5", border: "2px solid #d6dbf5" }
              : {}
          }
        >
          {console.log(props.selectedValue === val)}
          {val}
        </div>
      ))}
    </div>
  );
}
export default Options;
