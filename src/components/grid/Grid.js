import GridRow from "./GridRow";

function Grid(props) {
  return (
    <div>
      {props.gridState.map((row, i) => (
        <GridRow
          upperLeftPosition={props.upperLeftPosition}
          rowState={row}
          row={i}
        />
      ))}
    </div>
  );
}

export default Grid;
