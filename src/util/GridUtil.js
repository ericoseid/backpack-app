import Position from "../data/common/Position";

let GridUtil = {
  fitItems: (grid, items) => {
    var curItem = 0;
    let gridState = grid.state;

    for (let r = 0; r < gridState.length; r++) {
      for (let c = 0; c < gridState[0].length; c++) {
        let item = items[curItem];

        if (
          GridUtil.checkFit(
            gridState,
            item.itemDefinition.shapeDefinition,
            r,
            c
          )
        ) {
          GridUtil.fitShape(
            gridState,
            item.itemDefinition.shapeDefinition,
            r,
            c
          );

          item.position = new Position(
            grid.position.top + r * 50,
            grid.position.left + c * 50
          );

          curItem += 1;

          if (curItem >= items.length) {
            return;
          }
        }
      }
    }

    console.log(items);
  },

  checkFit: (gridState, shape, row, column) => {
    for (let position of shape.blockPositions) {
      let curRow = row + position.down;
      let curColumn = column + position.right;

      if (
        curRow < 0 ||
        curRow >= gridState.length ||
        curColumn < 0 ||
        curColumn >= gridState[0].length ||
        gridState[curRow][curColumn] === 2
      ) {
        return false;
      }
    }

    return true;
  },

  fitShape: (gridState, shape, row, column) => {
    return GridUtil.setValuesForShape(gridState, shape, row, column, 2);
  },

  highlightShape: (gridState, shape, row, column) => {
    return GridUtil.setValuesForShape(gridState, shape, row, column, 1);
  },

  resetShapeValues: (gridState, shape, row, column) => {
    return GridUtil.setValuesForShape(gridState, shape, row, column, 0);
  },

  setValuesForShape: (gridState, shape, row, column, value) => {
    for (let position of shape.blockPositions) {
      gridState[row + position.down][column + position.right] = value;
    }

    return gridState;
  },
};

export default GridUtil;
