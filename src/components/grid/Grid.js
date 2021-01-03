import GridRow from "./GridRow";

function Grid(props) {
  return (
    <div>
      {props.gridData.state.map((row, i) => (
        <GridRow
          upperLeftPosition={props.gridData.position}
          rowState={row}
          row={i}
        />
      ))}
    </div>
  );
}

export default Grid;
