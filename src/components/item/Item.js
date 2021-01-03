import React from "react";
import ItemBlock from "./ItemBlock";
import Position from "../../data/common/Position";

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.selectedBlock = null;
    this.previousMousePosition = null;
    this.fittedCell = null;
    this.highlightedCell = null;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.moveItem = this.moveItem.bind(this);
    this.getFittedPostion = this.getFittedPostion.bind(this);
    this.highlightCells = this.highlightCells.bind(this);
    this.unHighlightCells = this.unHighlightCells.bind(this);
    this.checkFit = this.checkFit.bind(this);
    this.getUpperLeftGridCell = this.getUpperLeftGridCell.bind(this);

    this.state = {
      currentPostion: this.props.restPosition,
    };
  }

  onMouseDown(block, e) {
    this.selectedBlock = block;

    if (this.fittedCell) {
      this.props.setGridState(this.fittedCell, this.props.shapeDefinition, 0);

      this.fittedCell = null;
    }

    this.previousMousePosition = new Position(e.clientY, e.clientX);
  }

  onMouseUp(e) {
    this.unHighlightCells();

    this.setState({
      currentPostion: this.getFittedPostion(e),
    });

    this.selectedBlock = null;
  }

  onMouseMove(e) {
    this.moveItem(e);
  }

  onMouseLeave(e) {
    this.moveItem(e);
  }

  moveItem(e) {
    if (this.selectedBlock != null) {
      let moveX = e.clientX - this.previousMousePosition.left;
      let moveY = e.clientY - this.previousMousePosition.top;

      this.setState({
        currentPostion: new Position(
          this.state.currentPostion.top + moveY,
          this.state.currentPostion.left + moveX
        ),
      });

      this.previousMousePosition = new Position(e.clientY, e.clientX);

      this.highlightCells(e);
    }
  }

  highlightCells(e) {
    this.unHighlightCells();

    let upperLeftCell = this.getUpperLeftGridCell(e);

    if (upperLeftCell && this.checkFit(upperLeftCell)) {
      this.highlightedCell = upperLeftCell;

      this.props.setGridState(upperLeftCell, this.props.shapeDefinition, 1);
    }
  }

  unHighlightCells() {
    if (this.highlightedCell) {
      this.props.setGridState(
        this.highlightedCell,
        this.props.shapeDefinition,
        0
      );

      this.highlightedCell = null;
    }
  }

  getFittedPostion(e) {
    let upperLeftCell = this.getUpperLeftGridCell(e);

    if (!upperLeftCell || !this.checkFit(upperLeftCell)) {
      return this.props.restPosition;
    }

    this.fittedCell = upperLeftCell;

    this.props.setGridState(upperLeftCell, this.props.shapeDefinition, 2);

    return new Position(
      50 + upperLeftCell[0] * 50,
      100 + 8 * 50 + upperLeftCell[1] * 50
    );
  }

  checkFit(upperLeftCell) {
    let gridState = this.props.getGridState();

    for (let position of this.props.shapeDefinition.definition) {
      let cell = [
        upperLeftCell[0] + position[0],
        upperLeftCell[1] + position[1],
      ];

      if (
        cell[0] < 0 ||
        cell[0] >= 10 ||
        cell[1] < 0 ||
        cell[1] >= 10 ||
        gridState[cell[0]][cell[1]] === 2
      ) {
        return false;
      }
    }

    return true;
  }

  getUpperLeftGridCell(e) {
    let itemBlockPosition = this.props.shapeDefinition.definition[
      this.selectedBlock
    ];

    let hoveredElements = document.elementsFromPoint(e.clientX, e.clientY);

    let gridBlock = hoveredElements.find((e) => e.className === "GridBlock");

    if (gridBlock) {
      return [
        gridBlock.dataset.row - itemBlockPosition[0],
        gridBlock.dataset.column - itemBlockPosition[1],
      ];
    }

    return null;
  }

  render() {
    return (
      <div>
        {this.props.shapeDefinition.definition.map((position, i) => (
          <div
            style={{
              position: "absolute",
              zIndex: this.selectedBlock !== null ? 2 : 1,
              top: `${this.state.currentPostion.top + position[0] * 50}px`,
              left: `${this.state.currentPostion.left + position[1] * 50}px`,
            }}
            onMouseDown={(e) => this.onMouseDown(i, e)}
            onMouseUp={this.onMouseUp}
            onMouseMove={this.onMouseMove}
            onMouseLeave={this.onMouseLeave}
          >
            <ItemBlock />
          </div>
        ))}
      </div>
    );
  }
}

export default Item;
