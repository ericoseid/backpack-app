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

    let centerPoint = document.defaultView.window.screen.width / 2;
    let widthFromCenter = 40;

    let backpackWidth = 10;
    let backpackHeight = 10;

    this.backpackLeft = centerPoint + widthFromCenter;
    this.groundLeft = centerPoint - widthFromCenter - backpackWidth * 50;

    let items = this.buildItemState().sort(ItemData.ITEM_COMPARATOR);

    let groundGrid = new GridData(
      new Position(50, this.groundLeft),
      backpackWidth,
      backpackHeight,
      GridData.GROUND_TYPE
    );

    GridUtil.fitItems(groundGrid, items);

    let backpackGrid = new GridData(
      new Position(50, this.backpackLeft),
      backpackWidth,
      backpackHeight,
      GridData.BACKPACK_TYPE
    );

    this.state = {
      itemState: items,
      groundGrid: groundGrid,
      backpackGrid: backpackGrid,
    };
  }

  buildItemState() {
    return [
      new ItemData(ShapeDefinition.LINE),
      new ItemData(ShapeDefinition.SQUARE),
      new ItemData(ShapeDefinition.L),
    ];
  }

  getGridState() {
    return this.state.backpackGrid.state;
  }

  setGridState(gridState) {
    let backpackGrid = this.state.backpackGrid;

    backpackGrid.state = gridState;

    this.setState({
      backpackGrid: backpackGrid,
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.itemState.map((item) => (
          <Item
            restPosition={item.position}
            shapeDefinition={item.shapeDefinition}
            backpackPosition={new Position(50, this.backpackLeft)}
            getGridState={this.getGridState}
            setGridState={this.setGridState}
          />
        ))}
        <Grid gridData={this.state.groundGrid} />
        <Grid gridData={this.state.backpackGrid} />
      </div>
    );
  }
}

export default App;
