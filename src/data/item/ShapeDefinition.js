import ShapeBlockDefinition from "./ShapeBlockDefinition";

class ShapeDefinition {
  constructor(blockPositions) {
    this.blockPositions = blockPositions;

    let heightAccum = 1;
    let widthAccum = 1;

    this.blockPositions.forEach((position) => {
      if (position.down >= heightAccum) heightAccum = position.down + 1;

      if (position.right >= widthAccum) widthAccum = position.right + 1;
    });

    this.height = heightAccum;
    this.width = widthAccum;
  }

  static LINE = new ShapeDefinition([
    new ShapeBlockDefinition(0, 0),
    new ShapeBlockDefinition(1, 0),
    new ShapeBlockDefinition(2, 0),
  ]);
  static TWO_LINE = new ShapeDefinition([
    new ShapeBlockDefinition(0, 0),
    new ShapeBlockDefinition(1, 0),
  ]);
  static FLAT_TWO_LINE = new ShapeDefinition([
    new ShapeBlockDefinition(0, 0),
    new ShapeBlockDefinition(0, 1),
  ]);
  static SQUARE = new ShapeDefinition([
    new ShapeBlockDefinition(0, 0),
    new ShapeBlockDefinition(0, 1),
    new ShapeBlockDefinition(1, 0),
    new ShapeBlockDefinition(1, 1),
  ]);
  static L = new ShapeDefinition([
    new ShapeBlockDefinition(0, 0),
    new ShapeBlockDefinition(1, 0),
    new ShapeBlockDefinition(2, 0),
    new ShapeBlockDefinition(2, 1),
  ]);
}

export default ShapeDefinition;
