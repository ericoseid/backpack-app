export default class GridData {
  constructor(position, rows, columns) {
    this.position = position;
    this.state = this.buildState(rows, columns);
  }

  buildState(rows, columns) {
    let gridState = [];

    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < columns; j++) {
        row.push(0);
      }

      gridState.push(row);
    }

    return gridState;
  }
}
