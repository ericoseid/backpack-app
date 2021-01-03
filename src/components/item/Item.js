import React from "react";
import ItemBlock from "./ItemBlock";
import Position from "../../data/common/Position";
import GridUtil from "../../util/GridUtil";

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
    this.getUpperLeftGridCell = this.getUpperLeftGridCell.bind(this);

    this.state = {
      currentPostion: this.props.restPosition,
    };
  }

  onMouseDown(block, e) {
    this.selectedBlock = block;

    if (this.fittedCell) {
      this.props.setGridState(
        GridUtil.resetShapeValues(
          this.props.getGridState(),
          this.props.shapeDefinition,
          this.fittedCell[0],
          this.fittedCell[1]
        )
      );

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

    if (
      upperLeftCell &&
      GridUtil.checkFit(
        this.props.getGridState(),
        this.props.shapeDefinition,
        upperLeftCell[0],
        upperLeftCell[1]
      )
    ) {
      this.highlightedCell = upperLeftCell;

      this.props.setGridState(
        GridUtil.highlightShape(
          this.props.getGridState(),
          this.props.shapeDefinition,
          upperLeftCell[0],
          upperLeftCell[1]
        )
      );
    }
  }

  unHighlightCells() {
    if (this.highlightedCell) {
      this.props.setGridState(
        GridUtil.resetShapeValues(
          this.props.getGridState(),
          this.props.shapeDefinition,
          this.highlightedCell[0],
          this.highlightedCell[1]
        )
      );

      this.highlightedCell = null;
    }
  }

  getFittedPostion(e) {
    let upperLeftCell = this.getUpperLeftGridCell(e);

    if (
      !upperLeftCell ||
      !GridUtil.checkFit(
        this.props.getGridState(),
        this.props.shapeDefinition,
        upperLeftCell[0],
        upperLeftCell[1]
      )
    ) {
      return this.props.restPosition;
    }

    this.fittedCell = upperLeftCell;

    this.props.setGridState(
      GridUtil.fitShape(
        this.props.getGridState(),
        this.props.shapeDefinition,
        upperLeftCell[0],
        upperLeftCell[1]
      )
    );

    return new Position(
      50 + upperLeftCell[0] * 50,
      100 + 8 * 50 + upperLeftCell[1] * 50
    );
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
