import "./App.css";
import React from "react";
import Position from "./data/common/Position";
import ItemData from "./data/item/ItemData";
import Item from "./components/item/Item";
import ShapeDefinition from "./data/item/ShapeDefinition";
import Grid from "./components/grid/Grid";
import GridData from "./data/grid/GridData";
import GridUtil from "./util/GridUtil";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.getGridState = this.getGridState.bind(this);
    this.setGridState = this.setGridState.bind(this);

    let items = this.buildItemState();
    let groundGrid = new GridData(new Position(50, 50), 8, 8);

    GridUtil.fitItems(groundGrid, items);

    let backpackGrid = new GridData(new Position(50, 100 + 8 * 50), 10, 10);

    this.state = {
      itemState: items,
      gridState: backpackGrid.state,
      gridPosition: backpackGrid.position,
    };
  }

  buildItemState() {
    return [
      new ItemData(ShapeDefinition.LINE),
      new ItemData(ShapeDefinition.SQUARE),
      new ItemData(ShapeDefinition.L),
    ];
  }

  buildGridState() {
    let gridState = [];

    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let j = 0; j < 10; j++) {
        row.push(0);
      }

      gridState.push(row);
    }

    return gridState;
  }

  getGridState() {
    return this.state.gridState;
  }

  setGridState(upperLeftCell, shapeDefinition, value) {
    let gridState = this.getGridState();

    for (let position of shapeDefinition.definition) {
      let row = upperLeftCell[0] + position[0];
      let column = upperLeftCell[1] + position[1];

      gridState[row][column] = value;
    }

    this.setState({
      gridState: gridState,
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.itemState.map((item) => (
          <Item
            restPosition={item.position}
            shapeDefinition={item.shapeDefinition}
            getGridState={this.getGridState}
            setGridState={this.setGridState}
          />
        ))}
        <Grid
          upperLeftPosition={this.state.gridPosition}
          gridState={this.state.gridState}
        />
      </div>
    );
  }
}

export default App;
