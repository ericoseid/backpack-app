import GridBlock from "./GridBlock";

function GridRow(props) {
  return props.rowState.map((value, i) => (
    <GridBlock
      upperLeftPosition={props.upperLeftPosition}
      cellState={value}
      row={props.row}
      column={i}
    />
  ));
}

export default GridRow;
