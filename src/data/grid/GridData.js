export default class GridData {
  constructor(position, rows, columns, type) {
    this.position = position;
    this.state = this.buildState(rows, columns);
    this.type = type;
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

  static GROUND_TYPE = "ground";
  static BACKPACK_TYPE = "backpack";
}
