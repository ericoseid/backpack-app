import React from "react";
import ItemBlock from "./ItemBlock";
import Position from "../../data/common/Position";
import GridUtil from "../../util/GridUtil";
import GridData from "../../data/grid/GridData";
import sword from "../../assets/sword.png";

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
      this.props.backpackPosition.left + upperLeftCell[1] * 50
    );
  }

  getUpperLeftGridCell(e) {
    let itemBlockPosition = this.props.shapeDefinition.definition[
      this.selectedBlock
    ];

    let hoveredElements = document.elementsFromPoint(e.clientX, e.clientY);

    let gridBlock = hoveredElements.find(
      (e) =>
        e.className === "GridBlock" && e.dataset.type == GridData.BACKPACK_TYPE
    );

    if (gridBlock) {
      return [
        gridBlock.dataset.row - itemBlockPosition.down,
        gridBlock.dataset.column - itemBlockPosition.right,
      ];
    }

    return null;
  }

  render() {
    return (
      <div
        style={{
          position: "absolute",
          top: `${this.state.currentPostion.top}px`,
          left: `${this.state.currentPostion.left}px`,
          zIndex: 1,
        }}
      >
        <img src={sword} alt="" height="150px" width="50px" />
        {this.props.shapeDefinition.definition.map((position, i) => (
          <div
            style={{
              position: "absolute",
              zIndex: this.selectedBlock !== null ? 3 : 2,
              top: `${position.down * 50}px`,
              left: `${position.right * 50}px`,
            }}
            onMouseDown={(e) => this.onMouseDown(i, e)}
            onMouseUp={this.onMouseUp}
            onMouseMove={this.onMouseMove}
            onMouseLeave={this.onMouseLeave}
          >
            <ItemBlock definition={position} />
          </div>
        ))}
      </div>
    );
  }
}

export default Item;
