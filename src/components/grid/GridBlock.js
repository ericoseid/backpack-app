import "./GridBlock.css";

function GridBlock(props) {
  return (
    <div
      className="GridBlock"
      style={{
        top: `${props.upperLeftPosition.top + props.row * 50}px`,
        left: `${props.upperLeftPosition.left + props.column * 50}px`,
        backgroundColor: props.cellState === 1 ? "orange" : "#282c34",
      }}
      data-row={props.row}
      data-column={props.column}
      data-type={props.type}
    ></div>
  );
}

export default GridBlock;
